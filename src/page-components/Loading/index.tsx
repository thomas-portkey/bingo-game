import React from 'react';

import styles from './index.module.css';
import { CHAIN_ID } from '../../constants/network';
import { MAIN_CHAIN_SYMBOL } from '../../constants/global';

export enum ExtraDataMode {
  NONE,
  INIT_MAIN_CHAIN,
}

const InitLoading = (props: {
  extraDataMode?: ExtraDataMode;
  isMobileMode?: boolean;
  isMainChain: boolean;
  isInit?: boolean;
  loading: boolean;
}) => {
  const { isMobileMode, isInit, loading, extraDataMode, isMainChain } = props;

  const renderExtraData = () => {
    switch (extraDataMode) {
      case ExtraDataMode.INIT_MAIN_CHAIN: {
        return (
          <div className={isMobileMode ? styles.extra__data__wrapper__mobile : styles.extra__data__wrapper__pc}>
            <div className={isMobileMode ? styles.sync__maintitle__mobile : styles.sync__maintitle__pc}>
              Synchronizing on-chain account information...
            </div>
            <div className={isMobileMode ? styles.sync__subtitle__mobile : styles.sync__subtitle__pc}>
              While waiting, you can pre-deposit funds in the Portkey wallet for use in the game on the{' '}
              {isMainChain ? 'mainchain' : 'sidechain'} {isMainChain ? MAIN_CHAIN_SYMBOL : CHAIN_ID}.
            </div>
          </div>
        );
      }
      default: {
        return null;
      }
    }
  };

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

      <div className={isMobileMode ? styles.wrapper_mobile : styles.wrapper}>
        <div className={[styles.circle, styles.circle_1].join(' ')}></div>
        <div className={[styles.circle, styles.circle_2].join(' ')}></div>
        <div className={[styles.circle, styles.circle_3].join(' ')}></div>
      </div>
      {renderExtraData()}
    </div>
  );
};

export default InitLoading;
