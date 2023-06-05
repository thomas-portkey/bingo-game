import { Button, ButtonType } from '@/page-components/Button';
import { useTranslation } from 'react-i18next';

import styles from '@/styles/pc.module.css';
import BoardNumbers from '@/page-components/BoardNumbers';
import BigNumber from 'bignumber.js';

interface BingoProps {
  isWin: boolean;
  hasFinishBet: boolean;
  dice1: number;
  dice2: number;
  dice3: number;
  difference: number;
  onBingo: () => void;
  onBet: () => void;
  fee?: BigNumber;
  totalReturn?: BigNumber;
}

const Bingo = ({
  isWin,
  hasFinishBet,
  dice1,
  dice2,
  dice3,
  difference,
  onBingo,
  onBet,
  fee,
  totalReturn,
}: BingoProps) => {
  const { t } = useTranslation();
  const text = isWin ? 'You Win' : 'You Lose';
  const style = isWin
    ? {
        color: '#2E6BC7',
        background: '#C5DFFF',
      }
    : {
        color: '#D63333',
        background: '#FFCB9B',
      };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {hasFinishBet ? (
        <div className={styles.bingoContentWrapper}>
          <BoardNumbers isFinished number1={dice1} number2={dice2} number3={dice3} />
          <div className={styles.bingoContent__bg}>
            <div className={styles.bingoContent__wrapper}>
              <>
                <div className={styles.bingoTips}>
                  {isWin ? (
                    <img style={{ width: '51.6rem' }} src={require('@source/congratulations.svg').default.src} />
                  ) : (
                    <img style={{ width: '51.6rem' }} src={require('@source/lose_pc.svg').default.src} />
                  )}
                  <div className={styles.bingoText}>
                    <span>{text}</span>
                    <span style={style}>{Math.abs(difference).toFixed(2)} ELF</span>
                    {isWin && totalReturn && (
                      <>
                        <span>Total Return</span>
                        <span style={style}>{totalReturn.toFixed(2)} ELF</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  className={styles.bingoContent__betBtn}
                  type={ButtonType.ORANGE}
                  onClick={() => {
                    onBet();
                  }}>
                  <span className={styles.playContent__betBtn_p}>
                    <p style={{ fontSize: '4.8rem', fontWeight: 900 }} className={styles.artWord}>
                      {t('common.button.bet')}
                    </p>
                  </span>
                </Button>
                {fee && <div className={styles.bingoContent__fee}>Transaction Fee: {fee.toFixed(2)} ELF</div>}
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          <div className={styles.content__bg}>
            <div className={styles.contentBingoInit__wrapper}>
              <div className={styles.bingoContent__boardNumbers}>
                <BoardNumbers number1={0} number2={0} number3={0} isSmall />
              </div>
              <Button className={styles.bingoBtn} type={ButtonType.ORANGE} onClick={onBingo}>
                <p className={styles.artWord}>BINGO</p>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bingo;
