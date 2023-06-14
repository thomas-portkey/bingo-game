import { useEffect, useRef, useState } from 'react';
import { DIDWalletInfo, did } from '@portkey/did-ui-react';
import { ChainInfo } from '@portkey/services';
import { ContractBasic } from '@portkey/contracts';
import { message } from 'antd';
import AElf from 'aelf-sdk';

import { transaction } from '../utils/common';
import { useDelay } from './useDelay';
import { CHAIN_ID, MAIN_CHAIN_ID } from '../constants/network';

import useIntervalAsync from './useIntervalTool';
import { INITIAL_INPUT_VALUE, MAX_BET_VALUE, MIN_BET_VALUE } from '../constants/global';
import { ExtraDataMode } from '../page-components/Loading';
import { ContractService } from '@/services/ContractService';
import { useCaHolderBingoInfoQuery } from '@/services/graphql/hooks/caHolderBingoInfo';
import { decodeAmount } from '../utils/common';
import BigNumber from 'bignumber.js';

export enum StepStatus {
  INIT,
  LOCK,
  LOGIN,
  PLAY,
  RANDOM,
  CUTDOWN,
  BINGO,
  END,
}

export enum ButtonType {
  BLUE,
  ORIANGE,
}

export enum BetType {
  SMALL,
  BIG,
}

export const KEY_NAME = 'BINGO_GAME';
export const COUNT = 15;

const contractService = new ContractService();

const useBingo = () => {
  const [step, setStep] = useState<StepStatus>(StepStatus.INIT);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [enablePlay, setEnablePlay] = useState<boolean>(false);

  const [balanceValue, setBalanceValue] = useState<string>('0');
  const [anotherBalanceValue, setAnotherBalanceValue] = useState<string>('0');
  const [fee, setFee] = useState<BigNumber>();
  const [totalReturn, setTotalReturn] = useState<BigNumber>();

  const [difference, setDifference] = useState<number>(0);
  const [result, setResult] = useState<number>(Infinity);
  const [dice1, setDice1] = useState<number>(0);
  const [dice2, setDice2] = useState<number>(0);
  const [dice3, setDice3] = useState<number>(0);
  const [hasFinishBet, setHasFinishBet] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [caAddress, setCaAddress] = useState<string>('');
  const [time, setTime] = useState(COUNT);
  const [loadingExtraDataMode, setLoadingExtraDataMode] = useState<ExtraDataMode>(ExtraDataMode.NONE);
  const isMainChain = useRef<boolean>(false);

  const walletRef = useRef<
    DIDWalletInfo & {
      registered?: boolean;
      approved?: boolean;
    }
  >();

  const chainInfoRef = useRef<ChainInfo>();
  const mainChainInfoRef = useRef<ChainInfo>();
  const chainsInfoRef = useRef<ChainInfo[]>([]);

  const caContractRef = useRef<ContractBasic>();
  const mainChainCaContractRef = useRef<ContractBasic>();
  const multiTokenContractRef = useRef<ContractBasic>();
  const anotherMultiTokenContractRef = useRef<ContractBasic>();

  const aelfRef = useRef<any>();
  const txIdRef = useRef<string>('');
  const tokenContractAddressRef = useRef<string>('');
  const balanceInputValueRef = useRef<string>(INITIAL_INPUT_VALUE);
  const requestTimeRef = useRef<number>(0);
  const ToastRef = useRef<{ error: (mes: string) => void }>(null);
  const intervalRunRef = useRef<() => Promise<void>>();

  const accountAddress = `ELF_${caAddress}_${chainInfoRef.current?.chainId}`;

  /**
   *  logic function
   */
  const delay = useDelay();

  const init = async () => {
    const chainsInfo = await did.services.getChainsInfo();
    chainsInfoRef.current = chainsInfo;
    const chainInfo = chainsInfo.find((chain) => chain.chainId === CHAIN_ID);
    const mainChainInfo = chainsInfo.find((chain) => chain.chainId === MAIN_CHAIN_ID);
    if (!chainInfo) {
      showError('chain is not running');
      return;
    }
    chainInfoRef.current = chainInfo;
    mainChainInfoRef.current = mainChainInfo;
    const aelf = new AElf(new AElf.providers.HttpProvider(chainInfo.endPoint));
    aelfRef.current = aelf;
    if (!aelf.isConnected()) {
      showError('Blockchain Node is not running.');
      return;
    }
  };

  const login = async (wallet) => {
    setLoading(true);
    if (wallet.chainId !== CHAIN_ID) {
      wallet = await contractService.login(wallet, CHAIN_ID);
    }
    setWallet(wallet);
    did.save(wallet.pin, KEY_NAME);
    isMainChain.current = wallet.chainId !== CHAIN_ID;
    resumeInterval();
    return true;
  };

  const getBalance = async () => {
    getCurrentChainBalance();
  };

  const getCurrentChainBalance = async () => {
    const multiTokenContract = multiTokenContractRef.current;
    const wallet = walletRef.current;
    if (!multiTokenContract || !wallet) return 0;

    requestTimeRef.current = Date.now();
    const balance = await contractService.getBalance(multiTokenContract, wallet);
    const differenceValue = new BigNumber(balance).minus(new BigNumber(balanceValue));
    setBalanceValue(balance.toString());
    return differenceValue;
  };

  const getMainChainBalance = async () => {
    const multiTokenContract = anotherMultiTokenContractRef.current;
    const wallet = walletRef.current;
    if (!multiTokenContract || !wallet) return 0;
    const balance = await contractService.getBalanceByChain(MAIN_CHAIN_ID, multiTokenContract, wallet);
    setAnotherBalanceValue(balance.toString());
  };

  const approve = async () => {
    const wallet = walletRef.current;
    const caContract = caContractRef.current;
    const multiTokenContract = multiTokenContractRef.current;
    if (!caContract || !wallet || !multiTokenContract) return;

    try {
      const allowance = await contractService.getAllowance(multiTokenContract, wallet);
      if (allowance < 100) {
        const approve = await contractService.approve(caContract, wallet, multiTokenContract);

        if (!approve.error) {
          walletRef.current = {
            ...wallet,
            approved: true,
          };
          return true;
        }
        await delay();
        getBalance();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getQrInfo = () => {
    if (!chainInfoRef.current || !tokenContractAddressRef.current) return;

    return contractService.getQrInfo(accountAddress, chainInfoRef.current, tokenContractAddressRef.current);
  };

  const registerLoop = async () => {
    let registerResult = undefined;
    const beginTime = Date.now();
    do {
      registerResult = await register();
      !registerResult && (await delay());
    } while (!registerResult);
    getBalance();

    try {
      transaction?.setMeasurement(
        'Synchronizing on-chain account information ',
        (Date.now() - beginTime) / 1000,
        'second',
      );
    } catch (error) {
      console.log('Synchronizing error:', error);
    }
  };

  const register = async () => {
    const caContract = caContractRef.current;
    const wallet = walletRef.current;
    if (!wallet || !caContract) return false;
    const registerResult = await contractService.register(caContract, wallet);

    if (!registerResult.error || registerResult.error.message?.includes('already registered')) {
      walletRef.current = {
        ...wallet,
        registered: true,
      };
      return true;
    }
    return false;
  };

  const cutDown = async () => {
    await new Promise<void>((resolve) => {
      let count = COUNT;
      setTime(count);
      const timer = setInterval(() => {
        setTime(--count);
        if (count <= 0) {
          clearInterval(timer);
          resolve();
        }
      }, 1000);
    });
  };

  const flush = useIntervalAsync(async () => {
    const multiTokenContract = multiTokenContractRef.current;
    const wallet = walletRef.current;
    if (!multiTokenContract || !wallet) return;
    if (Date.now() - requestTimeRef.current < 5000) {
      return;
    }
    const balance = await contractService.getBalance(multiTokenContract, wallet);
    setBalanceValue(balance.toString());

    getMainChainBalance();
  }, 5000);

  const unLock = async (localWallet) => {
    let caInfo = localWallet.didWallet.caInfo[CHAIN_ID];
    let caHash = caInfo?.caHash;
    if (!caInfo) {
      const key = Object.keys(localWallet.didWallet.caInfo)[0];
      caHash = localWallet.didWallet.caInfo[key].caHash;
      caInfo = await did.didWallet.getHolderInfoByContract({
        caHash: caHash,
        chainId: CHAIN_ID,
      });
    }
    isMainChain.current = !caInfo;
    const wallet = {
      caInfo,
      pin: '',
      chainId: CHAIN_ID,
      walletInfo: localWallet.didWallet.managementAccount,
    };
    setWallet(wallet);
    initContract();
    resumeInterval();
  };

  const initContract = async () => {
    const chainInfo = chainInfoRef.current;
    const anotherChainInfo = mainChainInfoRef.current;
    const wallet = walletRef.current;
    const aelf = aelfRef.current;

    if (!aelfRef.current || !chainInfo || !wallet || !anotherChainInfo) return;
    setLoading(true);
    setLoadingExtraDataMode(isMainChain.current ? ExtraDataMode.INIT_MAIN_CHAIN : ExtraDataMode.NONE);
    try {
      caContractRef.current = await contractService.getCaContract(chainInfo, wallet);
      mainChainCaContractRef.current = await contractService.getCaContract(anotherChainInfo, wallet);

      tokenContractAddressRef.current = await contractService.getTokenContractAddress(aelf, chainInfo, wallet);

      multiTokenContractRef.current = await contractService.getMultiTokenContract(chainInfo, wallet);
      anotherMultiTokenContractRef.current = await contractService.getMultiTokenContract(anotherChainInfo, wallet);

      await delay();
      await registerLoop();
      await approve();
      setStep(StepStatus.PLAY);
    } catch (error) {
      console.error('initContract: error', error);
    }

    setLoading(false);
    setLoadingExtraDataMode(ExtraDataMode.NONE);
    setCaAddress(wallet.caInfo.caAddress);
  };

  const setBalanceInputValue = (value: string) => {
    balanceInputValueRef.current = value;
  };

  const setWallet = (wallet) => {
    walletRef.current = wallet;
  };

  const showError = (message: string) => {
    ToastRef.current?.error(message);
  };

  const onPlay = async (betResult: BetType) => {
    const caContract = caContractRef.current;
    const wallet = walletRef.current;
    if (!caContract || !wallet) return;

    const value = Number(balanceInputValueRef.current);

    if (value <= 0) {
      showError('Insufficient funds');
      return;
    }

    if (value < MIN_BET_VALUE) {
      showError(`A minimum bet of ${MIN_BET_VALUE} ELF!`);
      return;
    }

    if (value > Number(balanceValue)) {
      showError('Insufficient funds');
      return;
    }
    if (value > MAX_BET_VALUE) {
      showError(`Please enter a number less than ${MAX_BET_VALUE} ELF!`);
      return;
    }

    setLoading(true);
    try {
      if (!wallet.approved) await approve();
      const playResult = await contractService.play(caContract, wallet, value, betResult);

      if (playResult.error || playResult.data.Error) {
        setLoading(false);
        showError('Insufficient funds for transaction fee'); // will always be the case since the value is less than the balance

        return;
      }
      txIdRef.current = playResult.data?.TransactionId || '';
      setLoading(false);

      setStep(StepStatus.CUTDOWN);
      await cutDown();
      setStep(StepStatus.BINGO);
      setTime(COUNT);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { refetch } = useCaHolderBingoInfoQuery({
    variables: {
      dto: { skipCount: 0, maxResultCount: 1, caAddresses: [caAddress], playId: txIdRef.current },
    },
    skip: true,
  });

  const onBingo = async () => {
    const caContract = caContractRef.current;
    const wallet = walletRef.current;
    const txId = txIdRef.current;
    if (!caContract || !wallet || !txId) return;

    setLoading(true);

    const beginTime = Date.now();
    try {
      await contractService.bingo(caContract, wallet, txId);
      const bingoContract = await contractService.getBingoContract(chainInfoRef.current, wallet);

      try {
        const rewardResult = await contractService.getBoutInformation(bingoContract, caAddress, txId);
        const { award, amount, isComplete, dices } = rewardResult.data;

        if (!isComplete) {
          setLoading(false);
          showError('Draw failed, please click bingo again');
          try {
            transaction?.setMeasurement('Draw failed time ', (Date.now() - beginTime) / 1000, 'second');
          } catch (error) {
            console.log('transaction error', error);
          }
          return;
        }

        if (!!amount && !!award) {
          const totalReturn: BigNumber = decodeAmount(new BigNumber(amount).plus(new BigNumber(award)));
          setTotalReturn(totalReturn);
        }

        const [dice1, dice2, dice3] = dices.dices; // will only have dices when isComplete === true

        try {
          transaction?.setMeasurement('bingo success time ', (Date.now() - beginTime) / 1000, 'second');
        } catch (error) {
          console.log('transaction error', error);
        }

        await delay(5000);
        const { data } = await refetch();
        const tx = data?.caHolderBingoInfo?.data?.[0];

        setFee(undefined);
        if (tx) {
          const playAmount: number = tx?.playTransactionFee?.[0]?.amount;
          const bingoAmount: number = tx?.bingoTransactionFee?.[0]?.amount;
          if (typeof playAmount === 'number' && typeof bingoAmount === 'number') {
            setFee(decodeAmount(new BigNumber(playAmount).plus(new BigNumber(bingoAmount))));
          }
        }

        const isWin = Number(award) > 0;

        getBalance();
        setHasFinishBet(true);
        setIsWin(isWin);
        setDice1(dice1);
        setDice2(dice2);
        setDice3(dice3);
        setDifference(Number(award) / 10 ** 8);
      } catch (error) {
        console.error(error);
        showError(error.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const onBet = () => {
    setHasFinishBet(false);
    setResult(Infinity);
    setDice1(0);
    setDice2(0);
    setDice3(0);
    setStep(StepStatus.PLAY);
  };

  const logOut = async () => {
    const caContract = caContractRef.current;
    const wallet = walletRef.current;
    const mainChainCaContract = mainChainCaContractRef.current;
    if (!caContract || !wallet || !mainChainCaContract) return;
    setLoading(true);
    await contractService.quit(caContract, wallet);
    await contractService.removeManagerInfo(isMainChain.current ? mainChainCaContract : caContract, wallet, caAddress);
    setLoading(false);
    window.localStorage.removeItem(KEY_NAME);
    setStep(StepStatus.LOGIN);
    pauseInterval();
  };

  const lock = async () => {
    setStep(StepStatus.LOCK);
    setWallet(undefined);
    pauseInterval();
    did.reset();
  };

  useEffect(() => {
    setLoading(true);
    init();
    if (typeof window !== undefined && window.localStorage.getItem(KEY_NAME)) {
      setEnablePlay(true);
      setStep(StepStatus.LOCK);
    } else {
      setEnablePlay(true);
      setStep(StepStatus.LOGIN);
    }
    if (!ToastRef.current) {
      ToastRef.current = message;
    }
    setLoading(false);
  }, []);

  const pauseInterval = () => {
    intervalRunRef.current = flush();
  };

  const resumeInterval = () => {
    const resume = intervalRunRef.current;
    if (resume) resume();
  };

  return {
    onBet,
    onBingo,
    onPlay,
    unLock,
    login,
    logOut,
    lock,
    setBalanceInputValue,
    setCaAddress,
    caAddress,
    balanceValue,
    setBalanceValue,
    anotherBalanceValue,
    setAnotherBalanceValue,
    setWallet,
    balanceInputValue: balanceInputValueRef.current,
    step,
    setStep,
    getBalance,
    initContract,
    setLoading,
    loading,
    isLogin,
    setIsLogin,
    showQrCode,
    isWin,
    enablePlay,
    setShowQrCode,
    getQrInfo,
    difference,
    result,
    hasFinishBet,
    time,
    accountAddress,
    chainId: chainInfoRef.current?.chainId,
    tokenContractAddress: tokenContractAddressRef.current,
    loadingExtraDataMode,
    dice1,
    dice2,
    dice3,
    fee,
    totalReturn,
  };
};
export default useBingo;
