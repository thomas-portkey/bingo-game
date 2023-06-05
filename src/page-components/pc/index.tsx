import React, { useCallback, useState } from 'react';
import { SignIn, did, Unlock, SignInInterface } from '@portkey/did-ui-react';

import useBingo, { StepStatus, KEY_NAME } from '@/hooks/useBingo';
import { DEFAULT_COUNTRY_CODE_CONFIG } from '@/constants/global';
import Loading from '@/page-components/Loading';
import { CHAIN_ID } from '@/constants/network';
import LoginAndUnlock from './components/LoginAndUnlock';
import Bingo from './components/Bingo';
import Play from './components/Play';
import Header from './components/Header';
import MenuPop from './components/MenuPop';
import useAccount from '@/hooks/useAccount';

import styles from '@/styles/pc.module.css';

const PCBingoGame = () => {
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [showMenuPop, setShowMenuPop] = useState<boolean>(false);
  const [showUnlock, setShowUnlock] = useState<boolean>(false);
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false);

  const { setSignRef, setShowLogin } = useAccount();

  const {
    onBet,
    onBingo,
    onPlay,
    unLock,
    login,
    logOut,
    lock,
    step,
    balanceValue,
    setBalanceInputValue,
    anotherBalanceValue,
    getBalance,
    isWin,
    difference,
    dice1,
    dice2,
    dice3,
    hasFinishBet,
    initContract,
    loading,
    time,
    getQrInfo,
    accountAddress,
    loadingExtraDataMode,
    caAddress,
    fee,
    totalReturn,
  } = useBingo();

  const renderScene = () => {
    switch (step) {
      case StepStatus.INIT:
      case StepStatus.LOCK:
      case StepStatus.LOGIN:
        return (
          <LoginAndUnlock
            step={step}
            showUnlockModal={() => {
              setShowUnlock(true);
            }}
            showLoginModal={() => {
              setShowLogin(true);
            }}></LoginAndUnlock>
        );
      case StepStatus.CUTDOWN:
      case StepStatus.RANDOM:
      case StepStatus.PLAY:
        return (
          <Play
            step={step}
            time={time}
            balanceValue={balanceValue}
            setBalanceInputValue={setBalanceInputValue}
            onPlay={onPlay}></Play>
        );
      case StepStatus.BINGO:
        return (
          <Bingo
            isWin={isWin}
            difference={difference}
            dice1={dice1}
            dice2={dice2}
            dice3={dice3}
            hasFinishBet={hasFinishBet}
            onBet={onBet}
            onBingo={onBingo}
            fee={fee}
            totalReturn={totalReturn}></Bingo>
        );
      default:
        break;
    }
  };

  const onError = useCallback((err) => {
    console.error('onError==', err);
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.bodyWrapper}>
        {renderScene()}
        <MenuPop
          showMenuPop={showMenuPop}
          setShowMenuPop={setShowMenuPop}
          balanceValue={balanceValue}
          anotherBalanceValue={anotherBalanceValue}
          accountAddress={accountAddress}
          caAddress={caAddress}
          QrCodeInfo={getQrInfo()}
        />

        <SignIn
          ref={(ref: SignInInterface) => {
            setSignRef(ref);
          }}
          sandboxId="portkey-ui-sandbox"
          defaultChainId={CHAIN_ID}
          phoneCountry={DEFAULT_COUNTRY_CODE_CONFIG}
          uiType="Modal"
          isShowScan={false}
          onFinish={async (wallet) => {
            console.log('SignIn onFinish==', wallet);
            await login(wallet);
            setShowLogin(false);
            initContract();
          }}
          onError={onError}
          onCancel={() => {
            setShowLogin(false);
          }}
        />
        <Unlock
          open={showUnlock}
          value={passwordValue}
          isWrongPassword={invalidNumber}
          onChange={(passwordVal) => {
            setPasswordValue(passwordVal);
          }}
          onCancel={() => {
            setShowUnlock(false);
          }}
          onUnlock={async () => {
            const localWallet = await did.load(passwordValue, KEY_NAME);
            if (!localWallet.didWallet.accountInfo.loginAccount) {
              setInvalidNumber(true);
              return;
            }
            console.log('Unlock onFinish==', localWallet);
            await unLock(localWallet);
            setInvalidNumber(false);
            setPasswordValue('');
            setShowUnlock(false);
          }}
        />
        {![StepStatus.INIT, StepStatus.LOCK, StepStatus.LOGIN, StepStatus.END].includes(step) && (
          <Header
            accountAddress={accountAddress}
            balanceValue={balanceValue}
            lock={lock}
            logOut={logOut}
            getBalance={getBalance}
            setShowMenuPop={setShowMenuPop}
            QrCodeInfo={getQrInfo()}
          />
        )}
      </div>
      <Loading loading={loading} extraDataMode={loadingExtraDataMode} />
    </div>
  );
};
export default PCBingoGame;
