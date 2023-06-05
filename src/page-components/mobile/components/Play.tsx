import React, { useEffect, useState } from 'react';

import { BetType, StepStatus } from '@/hooks/useBingo';
import { Button, ButtonType } from '@/page-components/Button';
import { INITIAL_INPUT_VALUE, MAX_BET_VALUE } from '@/constants/global';

import styles from '@/styles/mobile.module.css';
import BoardNumbers from '@/page-components/BoardNumbers';
import AmountInput from '@/page-components/AmountInput';
import ButtonMinMax, { minmaxError } from '@/page-components/ButtonMinMax';
import PlayLayout from '@/page-components/PlayLayout/PlayLayout';
import CutDown from '@/page-components/CutDown';

interface PlayProps {
  step?: StepStatus;
  time: number;
  balanceValue: string;
  accountAddress: string;
  setBalanceInputValue: (value: string) => void;
  onPlay: (BetType) => void;
  showModal: () => void;
}

export interface PlayHandle {
  resetAmount: () => void;
}

const Play: React.FC<PlayProps> = ({ step, time, setBalanceInputValue, onPlay }, ref) => {
  const [inputValue, setInputValue] = useState<string>(INITIAL_INPUT_VALUE);

  useEffect(() => {
    setMin();
  }, []);

  const setMin = () => {
    setAmount(INITIAL_INPUT_VALUE);
  };

  const setMax = () => {
    setAmount(`${MAX_BET_VALUE}`);
  };

  const setAmount = (val: string) => {
    setBalanceInputValue(val);
    setInputValue(val);
  };

  return (
    <div className={styles.container}>
      <div className={styles.centerPopup}>
        <div className={[styles.playWrapper, step === StepStatus.CUTDOWN ? styles.playWrapper_cutdown : ''].join(' ')}>
          {step === StepStatus.CUTDOWN && <CutDown isMobile time={time} />}
          <div className={styles.playContent}>
            {step === StepStatus.PLAY && (
              <PlayLayout
                isMobile
                left={<BoardNumbers number1={0} number2={0} number3={0} isMobile />}
                input={<AmountInput value={inputValue} onChange={setAmount} isMobile />}
                minmax={
                  <>
                    <ButtonMinMax isMobile onClick={setMin}>
                      MIN
                    </ButtonMinMax>
                    <ButtonMinMax isMobile onClick={setMax}>
                      MAX
                      <span>{`(${MAX_BET_VALUE})`}</span>
                    </ButtonMinMax>
                  </>
                }
                minmaxError={minmaxError(inputValue)}
                bigsmall={
                  <>
                    <Button
                      isMobile
                      type={ButtonType.ORANGE}
                      onClick={async () => {
                        onPlay(BetType.BIG);
                      }}>
                      BIG
                    </Button>
                    <Button
                      isMobile
                      type={ButtonType.BLUE}
                      onClick={() => {
                        onPlay(BetType.SMALL);
                      }}>
                      SMALL
                    </Button>
                  </>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
