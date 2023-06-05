import React from 'react';

import styles from './playlayout.module.scss';

interface IPlayLayoutProps {
  left: React.ReactNode;
  input: React.ReactNode;
  minmax: React.ReactNode;
  minmaxError?: string;
  bigsmall: React.ReactNode;
  isMobile?: boolean;
}
const PlayLayout = (props: IPlayLayoutProps) => {
  const { left, input, minmax, minmaxError, bigsmall, isMobile } = props;

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>
        <div className={styles.input}>{input}</div>
        <div className={styles.minmax}>{minmax}</div>
        <div className={styles.minmaxError}>{minmaxError}</div>
        <div className={styles.bigsmall}>{bigsmall}</div>
      </div>
    </div>
  );
};

export default PlayLayout;
