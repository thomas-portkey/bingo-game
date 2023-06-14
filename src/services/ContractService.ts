import { DIDWalletInfo, did } from '@portkey/did-ui-react';
import { ChainInfo } from '@portkey/services';
import { getContractBasic, ContractBasic } from '@portkey/contracts';
import AElf from 'aelf-sdk';
import { bingoAddress, isTestNet } from '@/constants/network';
import { shrinkSendQrData } from '@/utils/common';
import { BetType } from '@/hooks/useBingo';
import { ChainId } from '@portkey/types';
import BigNumber from 'bignumber.js';
const { sha256 } = AElf.utils;

/**
 * Methods to interact with the Bingo Contract.
 */
export class ContractService {
  async login(wallet: DIDWalletInfo, chainId: ChainId) {
    const caInfo = await did.didWallet.getHolderInfoByContract({
      caHash: wallet.caInfo.caHash,
      chainId,
    });
    wallet.caInfo = {
      caAddress: caInfo.caAddress,
      caHash: caInfo.caHash,
    };

    return wallet;
  }

  async getCaContract(chainInfo: ChainInfo, wallet: DIDWalletInfo) {
    return await getContractBasic({
      contractAddress: chainInfo?.caContractAddress,
      account: wallet.walletInfo.wallet,
      rpcUrl: chainInfo?.endPoint,
    });
  }

  async getTokenContractAddress(aelf: any, chainInfo: ChainInfo, wallet: DIDWalletInfo) {
    const chainStatus = await aelf.chain.getChainStatus();
    const zeroC = await getContractBasic({
      contractAddress: chainStatus.GenesisContractAddress,
      account: wallet.walletInfo.wallet,
      rpcUrl: chainInfo?.endPoint,
    });
    return (await zeroC.callViewMethod('GetContractAddressByName', sha256('AElf.ContractNames.Token'))).data;
  }

  async getMultiTokenContract(chainInfo: ChainInfo, wallet: DIDWalletInfo) {
    return await getContractBasic({
      contractAddress: chainInfo.defaultToken.address,
      account: wallet.walletInfo.wallet,
      rpcUrl: chainInfo?.endPoint,
    });
  }

  async getAllowance(multiTokenContract: ContractBasic, wallet: DIDWalletInfo) {
    const result = await multiTokenContract.callViewMethod('GetAllowance', {
      symbol: 'ELF',
      owner: wallet.caInfo.caAddress,
      spender: bingoAddress,
    });

    const { allowance } = result?.data || {};

    return allowance;
  }

  async approve(caContract: ContractBasic, wallet: DIDWalletInfo, multiTokenContract: ContractBasic) {
    return await caContract.callSendMethod('ManagerForwardCall', wallet.walletInfo.wallet.address, {
      caHash: wallet.caInfo.caHash,
      contractAddress: multiTokenContract.address,
      methodName: 'Approve',
      args: {
        symbol: 'ELF',
        spender: bingoAddress,
        amount: '100000000000000000000',
      },
    });
  }

  async register(caContract: ContractBasic, wallet: DIDWalletInfo) {
    return await caContract.callSendMethod('ManagerForwardCall', wallet.walletInfo.wallet.address, {
      caHash: wallet.caInfo.caHash,
      contractAddress: bingoAddress,
      methodName: 'Register',
      args: null,
    });
  }

  async getBalance(multiTokenContract: ContractBasic, wallet: DIDWalletInfo) {
    const result = await multiTokenContract.callViewMethod('GetBalance', {
      symbol: 'ELF',
      owner: wallet.caInfo.caAddress,
    });

    const balance = new BigNumber(result?.data?.balance).dividedBy(10 ** 8);
    return balance;
  }

  async getBalanceByChain(chainId: ChainId, multiTokenContract: ContractBasic, wallet: DIDWalletInfo) {
    const caInfo = await did.didWallet.getHolderInfoByContract({
      caHash: wallet.caInfo.caHash,
      chainId,
    });

    const result = await multiTokenContract.callViewMethod('GetBalance', {
      symbol: 'ELF',
      owner: caInfo.caAddress,
    });

    const balance = new BigNumber(result?.data?.balance).dividedBy(10 ** 8);
    return balance;
  }

  async play(caContract: ContractBasic, wallet: DIDWalletInfo, value: number, betResult: BetType) {
    return await caContract.callSendMethod('ManagerForwardCall', wallet.walletInfo.wallet.address, {
      caHash: wallet.caInfo.caHash,
      contractAddress: bingoAddress,
      methodName: 'Play',
      args: {
        amount: value * 10 ** 8,
        type: betResult,
      },
    });
  }

  async bingo(caContract: ContractBasic, wallet: DIDWalletInfo, txId: string) {
    return await caContract.callSendMethod('ManagerForwardCall', wallet.walletInfo.wallet.address, {
      caHash: wallet.caInfo.caHash,
      contractAddress: bingoAddress,
      methodName: 'Bingo',
      args: txId,
    });
  }

  async getBingoContract(chainInfo: ChainInfo, wallet: DIDWalletInfo) {
    return await getContractBasic({
      contractAddress: bingoAddress,
      account: wallet.walletInfo.wallet,
      rpcUrl: chainInfo.endPoint,
    });
  }

  async getBoutInformation(bingoContract: ContractBasic, caAddress: string, txId: string) {
    return await bingoContract.callViewMethod('GetBoutInformation', {
      address: caAddress,
      playId: txId,
    });
  }

  getQrInfo(accountAddress: string, chainInfo: ChainInfo, tokenContractAddress: string) {
    const info = shrinkSendQrData({
      type: 'send',
      netWorkType: isTestNet ? 'TESTNET' : 'MAIN',
      chainType: 'aelf',
      toInfo: {
        address: accountAddress,
        name: '',
      },
      assetInfo: {
        symbol: 'ELF',
        chainId: chainInfo.chainId,
        tokenContractAddress,
        decimals: '8',
      },
      address: accountAddress,
    });
    return info;
  }

  async quit(caContract: ContractBasic, wallet: DIDWalletInfo) {
    await caContract.callSendMethod('ManagerForwardCall', wallet.walletInfo.wallet.address, {
      caHash: wallet.caInfo.caHash,
      contractAddress: bingoAddress,
      methodName: 'Quit',
      args: {},
    });
  }

  async removeManagerInfo(caContract: ContractBasic, wallet: DIDWalletInfo, caAddress: string) {
    await caContract.callSendMethod('RemoveManagerInfo', caAddress, {
      caHash: wallet.caInfo.caHash,
      managerInfo: {
        address: caAddress,
        extraData: new Date().getTime(),
      },
    });
  }
}
