import React, { useEffect, useState } from 'react';

import { BetType, StepStatus } from '@/hooks/useBingo';
import { Button, ButtonType } from '@/page-components/Button';
import { INITIAL_INPUT_VALUE, MAX_BET_VALUE } from '@/constants/global';

import styles from '@/styles/pc.module.css';
import BoardNumbers from '@/page-components/BoardNumbers';
import AmountInput from '@/page-components/AmountInput';
import ButtonMinMax, { minmaxError } from '@/page-components/ButtonMinMax';
import PlayLayout from '@/page-components/PlayLayout/PlayLayout';
import CutDown from '@/page-components/CutDown';

interface PlayProps {
  step: StepStatus;
  time: number;
  balanceValue: string;
  setBalanceInputValue: (value: string) => void;
  onPlay: (BetType) => void;
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
    <div>
      <div className={styles.contentWrapper}>
        <div className={[styles.content__bg, step === StepStatus.CUTDOWN ? styles.content__bg_cutdown : ''].join(' ')}>
          <div className={styles.content__wrapper}>
            {step === StepStatus.CUTDOWN && <CutDown time={time} />}

            {step === StepStatus.PLAY && (
              <PlayLayout
                left={<BoardNumbers number1={0} number2={0} number3={0} />}
                input={<AmountInput value={inputValue} onChange={setAmount} />}
                minmax={
                  <>
                    <ButtonMinMax onClick={setMin}>MIN</ButtonMinMax>
                    <ButtonMinMax onClick={setMax}>
                      MAX
                      <span>{`(${MAX_BET_VALUE})`}</span>
                    </ButtonMinMax>
                  </>
                }
                minmaxError={minmaxError(inputValue)}
                bigsmall={
                  <>
                    <Button
                      type={ButtonType.ORANGE}
                      onClick={async () => {
                        onPlay(BetType.BIG);
                      }}>
                      BIG
                    </Button>
                    <Button
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
