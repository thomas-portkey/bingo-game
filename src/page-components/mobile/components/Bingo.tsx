import BoardNumbers from '@/page-components/BoardNumbers';
import { Button, ButtonType } from '@/page-components/Button';

import styles from '@/styles/mobile.module.css';
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

const Bingo: React.FC<BingoProps> = ({
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
}) => {
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
    <div className={styles.container}>
      <div className={styles.centerPopup}>
        <div className={styles.playWrapper}>
          <div className={styles.playContent}>
            <div className={styles.bingoContent}>
              <BoardNumbers
                isFinished={hasFinishBet}
                isMobile
                number1={hasFinishBet ? dice1 : 0}
                number2={hasFinishBet ? dice2 : 0}
                number3={hasFinishBet ? dice3 : 0}
              />
              {hasFinishBet ? (
                <>
                  <div className={styles.bingoTips}>
                    {isWin ? (
                      <img src={require('@source/congratulations.svg').default.src} />
                    ) : (
                      <img src={require('@source/lose_mobile.svg').default.src} className={styles.loseBingo} />
                    )}
                    <div className={styles.bingoText}>
                      <span>{text}</span>
                      <span style={style}>{Math.abs(difference).toFixed(2)} ELF</span>
                    </div>
                    {isWin && totalReturn && (
                      <div className={styles.bingoText}>
                        <span>Total Return</span>
                        <span style={style}>{totalReturn.toFixed(2)} ELF</span>
                      </div>
                    )}
                  </div>
                  <Button
                    className={styles.playContent__betBtn}
                    type={ButtonType.ORANGE}
                    isMobile
                    onClick={() => {
                      onBet();
                    }}>
                    <span className={styles.playContent__betBtn_p}>
                      <p style={{ fontSize: '24px' }} className={styles.artWord}>
                        BET
                      </p>
                    </span>
                  </Button>
                  {fee && <div className={styles.bingoContent__fee}>Transaction Fee: {fee.toFixed(2)} ELF</div>}
                </>
              ) : (
                <Button isMobile className={styles.playContent__betBtn} type={ButtonType.ORANGE} onClick={onBingo}>
                  <span className={styles.playContent__betBtn_p}>
                    <p style={{ fontSize: '24px' }} className={styles.artWord}>
                      BINGO
                    </p>
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bingo;
