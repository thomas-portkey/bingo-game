import React from 'react';

import styles from './boardnumbers.module.scss';
import BoardNumber from '../BoardNumber';

interface IBoardNumberProps {
  number1: number;
  number2: number;
  number3: number;
  isMobile?: boolean;
  isFinished?: boolean;
  isSmall?: boolean;
}
const BoardNumbers = (props: IBoardNumberProps) => {
  const { number1, number2, number3, isMobile, isFinished, isSmall } = props;

  return (
    <div
      className={[
        styles.wrapper,
        styles[isMobile ? 'mobile' : 'pc'],
        styles[isFinished ? 'finished' : 'start'],
        styles[isSmall ? 'small' : 'large'],
      ].join(' ')}>
      <div className={styles.position}>
        <BoardNumber number={number1} isMobile={isMobile} />
        <BoardNumber number={number2} isMobile={isMobile} />
        <BoardNumber number={number3} isMobile={isMobile} />
      </div>
    </div>
  );
};

export default BoardNumbers;
