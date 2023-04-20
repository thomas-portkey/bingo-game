import React from 'react';

import styles from './index.module.css';
const InitLoading = (props: { isMobileMode?: boolean; isInit?: boolean; loading: boolean }) => {
  const { isMobileMode, isInit, loading } = props;

  if (!loading) {
    return null;
  }

  return (
    <div className={isInit ? styles.body_init : styles.body}>
      {isMobileMode ? (
        <img className={styles.bingo_mobile} src={require('../../../public/bingo_white.png').default.src} />
      ) : (
        <img className={styles.bingo_pc} src={require('../../../public/bingo_white_pc.png').default.src} />
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

export default InitLoading;
