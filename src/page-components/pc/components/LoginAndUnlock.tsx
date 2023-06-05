import { isTestNet } from '@/constants/network';
import { StepStatus } from '@/hooks/useBingo';
import { Button, ButtonType } from '@/page-components/Button';
import { useTranslation } from 'react-i18next';

import styles from '@/styles/pc.module.css';

interface LoginAndUnlockProps {
  step: StepStatus;
  showUnlockModal: () => void;
  showLoginModal: () => void;
}

const LoginAndUnlock: React.FC<LoginAndUnlockProps> = ({ step, showUnlockModal, showLoginModal }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={styles.defaultWrapper}>
        <div className={styles.title__img__wrapper}>
          {isTestNet && (
            <div className={styles.test__tag__wrapper}>
              <div className={styles.test__tag__wrapper__content}>TEST</div>
            </div>
          )}
          <img className={styles.logo} src={require('@source/bingo.png').default.src} />
        </div>
        {step === StepStatus.LOGIN && (
          <Button
            className={styles.defaultBtn__origin}
            type={ButtonType.ORANGE}
            onClick={() => {
              showLoginModal();
            }}>
            <p className={styles.artWord}>PLAY NOW</p>
          </Button>
        )}
        {step === StepStatus.LOCK && (
          <Button
            className={styles.defaultBtn__blue}
            type={ButtonType.BLUE}
            onClick={() => {
              showUnlockModal();
            }}>
            <p className={styles.artWord}>UNLOCK</p>
          </Button>
        )}

        {isTestNet && (
          <div className={styles.initTip}>
            <img src={require('@source/warn.svg').default.src} />
            <span>{t('demo.desc')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginAndUnlock;
