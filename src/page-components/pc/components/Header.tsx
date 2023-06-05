import { Popover } from 'antd';
import { QRCode } from 'react-qrcode-logo';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { decorateBalanceText, QrCodeDataArrType } from '@/utils/common';
import useCopy from '@/hooks/useCopy';

import styles from '@/styles/pc.module.css';
import ExplorerLink from '@/page-components/ExplorerLink';

interface HeaderProps {
  accountAddress: string;
  balanceValue: string;
  QrCodeInfo: QrCodeDataArrType;
  lock: () => void;
  logOut: () => void;
  getBalance: () => void;
  setShowMenuPop: (boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  setShowMenuPop,
  lock,
  balanceValue,
  accountAddress,
  QrCodeInfo,
  logOut,
  getBalance,
}) => {
  const { onCopy } = useCopy({ accountAddress });
  const { t } = useTranslation();

  return (
    <div className={styles.settingHeader}>
      <img
        className={clsx(styles.setting__menu, styles.btn)}
        src={require('@source/menu_pc.png').default.src}
        onClick={() => {
          setShowMenuPop(true);
        }}
      />
      <div className={styles.setting__balance}>
        <div className={styles.setting_balanceWrapper}>
          <div className={styles.tokenIcon} />
          <div className={styles.setting__balance__content}>
            <div style={{ width: '100%', fontSize: '2.4rem' }}>{decorateBalanceText(balanceValue)} ELF</div>
            <button
              className={styles.btn}
              onClick={() => {
                getBalance();
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.setting__account}>
        <div className={styles.setting__account__content}>
          <div>{t('account')}</div>
          <div style={{ width: '40rem', overflow: 'hidden' }}>
            {accountAddress?.length > 18
              ? `${accountAddress.slice(0, 10)}...${accountAddress.slice(
                  accountAddress?.length - 10,
                  accountAddress?.length,
                )}`
              : accountAddress}
          </div>
          <button className={clsx(styles.setting__account__content__copy, styles.btn)} onClick={onCopy} />

          <Popover
            content={() => (
              <QRCode
                value={JSON.stringify(QrCodeInfo)}
                size={200}
                quietZone={0}
                qrStyle={'squares'}
                eyeRadius={{ outer: 7, inner: 4 }}
                ecLevel={'L'}
              />
            )}>
            <div className={clsx(styles.setting__account__content__qrcode, styles.btn)} />
          </Popover>

          <div className={clsx(styles.setting__account__redirect, styles.btn)}>
            <ExplorerLink address={accountAddress} width={'1.5vw'} />
          </div>
        </div>
      </div>
      <button className={styles.setting__logout} onClick={logOut}>
        Exit Game
      </button>
      <img
        className={[styles.setting__lock, styles.btn].join(' ')}
        src={require('@source/lock.png').default.src}
        onClick={() => {
          lock();
        }}
      />
    </div>
  );
};

export default Header;
