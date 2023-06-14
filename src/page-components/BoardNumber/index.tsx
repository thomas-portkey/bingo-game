import React from 'react';

import styles from './boardnumber.module.css';

function getClassnameFromNumber(num: number) {
  if (num >= 1 && num <= 6) return num;

  return 0;
}

interface IBoardNumberProps {
  number: number;
  isMobile?: boolean;
}
const BoardNumber = (props: IBoardNumberProps) => {
  const { number, isMobile } = props;

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <div className={[styles.number, styles[`_${getClassnameFromNumber(number)}`]].join(' ')}></div>
    </div>
  );
};

export default BoardNumber;
