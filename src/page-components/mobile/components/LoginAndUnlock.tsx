import { isTestNet } from '@/constants/network';
import { StepStatus } from '@/hooks/useBingo';
import { Button, ButtonType } from '@/page-components/Button';

import styles from '@/styles/mobile.module.css';

interface LoginAndUnlockProps {
  step: StepStatus;
  showUnlockModal: () => void;
  showLoginModal: () => void;
}

const LoginAndUnlock: React.FC<LoginAndUnlockProps> = ({ step, showUnlockModal, showLoginModal }) => {
  return (
    <div className={styles.defaultWrapper}>
      <div className={styles.title__img__wrapper}>
        {isTestNet && (
          <div className={styles.test__tag__wrapper}>
            <div className={styles.test__tag__wrapper__content}>TEST</div>
          </div>
        )}
        <img className={styles.logo} src={require('@source/bingo.png').default.src} />
      </div>
      {step === StepStatus.LOCK && (
        <>
          <Button
            className={styles.defaultBtn}
            type={ButtonType.BLUE}
            isMobile
            onClick={() => {
              showUnlockModal();
            }}>
            <p className={styles.artWord}>UNLOCK</p>
          </Button>
        </>
      )}

      {step === StepStatus.LOGIN && (
        <>
          <Button
            className={styles.defaultBtn}
            type={ButtonType.ORANGE}
            isMobile
            onClick={() => {
              showLoginModal();
            }}>
            <p className={styles.artWord}>PLAY NOW</p>
          </Button>
        </>
      )}
      {isTestNet && (
        <div className={styles.initTip}>
          <img src={require('@source/warn.svg').default.src} />
          <span>This is a demo on the Testnet.</span>
        </div>
      )}
    </div>
  );
};

export default LoginAndUnlock;
