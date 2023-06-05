import React from 'react';
import { decorateBalanceText } from '@/utils/common';
import { currentNetworkType, anotherNetworkType } from '@/constants/network';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { TOKEN_UNIT } from '@/constants/global';

import styles from './AElfAssets.module.scss';

interface AElfAssetsProps {
  balanceValue: string;
  anotherBalanceValue: string;
  isMobileBrowser: boolean;
  className?: string;
}

const AElfAssets = ({ balanceValue, anotherBalanceValue, isMobileBrowser, className }: AElfAssetsProps) => {
  const { t } = useTranslation();
  return (
    <div className={clsx(isMobileBrowser ? styles.mobile : styles.pc, className)}>
      <div className={styles.assetWrapper}>
        <div className={styles.assetTokenIcon} />
        <div className={styles.textContentFlex}>
          <div className={styles.textContentLeft}>
            <span>{TOKEN_UNIT}</span>
            <span>{decorateBalanceText(balanceValue)}</span>
          </div>
          <span className={styles.networkType}>{currentNetworkType}</span>
        </div>
        <div className={styles.currentLabel}>{t('current')}</div>
      </div>
      <div className={styles.assetWrapper}>
        <div className={styles.assetTokenIcon} />
        <div className={styles.textContentFlex}>
          <div className={styles.textContentLeft}>
            <span>{TOKEN_UNIT}</span>
            <span>{decorateBalanceText(anotherBalanceValue)}</span>
          </div>
          <span className={styles.networkType}>{anotherNetworkType}</span>
        </div>
      </div>
    </div>
  );
};

export default AElfAssets;
