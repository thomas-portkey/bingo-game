import { DEFAULT_DICE_INTERVAL_DURATION, DEFAULT_DICE_TIMEOUT_DURATION } from '@/constants/global';
import { randomDice } from '@/utils/common';
import { useEffect, useState } from 'react';

/**
 * This hook keeps rolling the dice for a set duration and returns the actual result.
 * @param actual the actual dice result
 * @param intervalDuration the time between adjacent rolls
 * @param timeoutDuration how long to keep rolling
 * @returns the actual dice result
 */
export const useRandomDice = (actual: number, intervalDuration?: number, timeoutDuration?: number) => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum(randomDice());
    }, intervalDuration || DEFAULT_DICE_INTERVAL_DURATION);

    setTimeout(() => {
      clearInterval(interval);
      setNum(actual);
    }, timeoutDuration || DEFAULT_DICE_TIMEOUT_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, [actual, intervalDuration, timeoutDuration]);

  return num;
};
