import React from 'react';

import styles from './index.module.css';

export default (props: { isMobileMode?: boolean }) => {
  const { isMobileMode } = props;
  return (
    <div className={styles.body}>
      {isMobileMode ? (
        <img className={styles.bingo} src={require('../../../public/bingo_white.png').default.src} />
      ) : (
        <img className={styles.bingo} src={require('../../../public/bingo_white_pc.png').default.src} />
      )}

      <div className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>

        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
};
