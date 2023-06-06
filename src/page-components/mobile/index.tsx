import React, { useState, useCallback } from 'react';
import { SignIn, did, Unlock, SignInInterface } from '@portkey/did-ui-react';

import useBingo, { StepStatus, KEY_NAME } from '@/hooks/useBingo';
import { DEFAULT_COUNTRY_CODE_CONFIG } from '@/constants/global';
import Loading from '@/page-components/Loading';
import { CHAIN_ID } from '@/constants/network';

import LoginAndUnlock from './components/LoginAndUnlock';
import Play from './components/Play';
import Bingo from './components/Bingo';
import MenuPop from './components/MenuPop';

import styles from '@/styles/mobile.module.css';
import Header from './components/Header';
import useAccount from '@/hooks/useAccount';

const MBingoGame = () => {
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [showUnlock, setShowUnlock] = useState<boolean>(false);
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    isWin,
    getQrInfo,
    difference,
    dice1,
    dice2,
    dice3,
    hasFinishBet,
    initContract,
    loading,
    time,
    accountAddress,
    loadingExtraDataMode,
    caAddress,
    fee,
    totalReturn,
  } = useBingo();

  const showModal = () => {
    setIsModalOpen(true);
  };

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
      case StepStatus.PLAY:
      case StepStatus.RANDOM:
      case StepStatus.CUTDOWN:
        return (
          <Play
            step={step}
            time={time}
            setBalanceInputValue={setBalanceInputValue}
            balanceValue={balanceValue}
            onPlay={onPlay}
            showModal={showModal}
            accountAddress={accountAddress}></Play>
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
      <Loading isMobileMode loading={loading} extraDataMode={loadingExtraDataMode} />
      {![StepStatus.INIT, StepStatus.LOCK, StepStatus.LOGIN, StepStatus.END].includes(step) && (
        <Header
          accountAddress={accountAddress}
          balanceValue={balanceValue}
          showModal={() => {
            setIsModalOpen(true);
          }}
        />
      )}
      {renderScene()}
      <SignIn
        ref={(ref: SignInInterface) => {
          setSignRef(ref);
        }}
        uiType="Modal"
        phoneCountry={DEFAULT_COUNTRY_CODE_CONFIG}
        sandboxId="portkey-ui-sandbox"
        defaultChainId={CHAIN_ID}
        isShowScan={false}
        onFinish={async (wallet) => {
          await login(wallet);
          setShowLogin(false);
          initContract();
        }}
        onError={onError}
        onCancel={() => {
          setShowLogin(false);
        }}
      />

      <MenuPop
        showMenuPop={isModalOpen}
        setShowMenuPop={setIsModalOpen}
        balanceValue={balanceValue}
        anotherBalanceValue={anotherBalanceValue}
        accountAddress={accountAddress}
        caAddress={caAddress}
        logout={logOut}
        lock={lock}
        QrCodeInfo={getQrInfo()}
      />

      <Unlock
        open={showUnlock}
        value={passwordValue}
        isWrongPassword={isWrongPassword}
        onChange={(passwordVal) => {
          setPasswordValue(passwordVal);
        }}
        onCancel={() => {
          setShowUnlock(false);
        }}
        onUnlock={async () => {
          const localWallet = await did.load(passwordValue, KEY_NAME);
          if (!localWallet.didWallet.accountInfo.loginAccount) {
            setIsWrongPassword(true);
            return;
          }
          await unLock(localWallet);
          setIsWrongPassword(false);
          setPasswordValue('');
          setShowUnlock(false);
        }}
      />
    </div>
  );
};
export default MBingoGame;
