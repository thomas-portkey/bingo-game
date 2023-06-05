import React, { useState } from 'react';
import { message, Popover } from 'antd';
import Modal from '@/page-components/Modal';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import { Button, ButtonType } from '@/page-components/Button';
import AElfAssets from '@/page-components/AElfAssets';
import ExplorerLink from '@/page-components/ExplorerLink';
import SettingModal from '../../../page-components/SettingModal';
import { MODAL_TYPE_ENUMS } from '@/page-components/SettingModal/constants';
import { dealWithAccountAddressDisplay } from '@/utils/common';
import clsx from 'clsx';

import { copy, QrCodeDataArrType } from '@/utils/common';

import styles from '@/styles/pc.module.css';

interface MenuPopProps {
  showMenuPop: boolean;
  setShowMenuPop: (boolean) => void;
  accountAddress?: string;
  balanceValue: string;
  anotherBalanceValue: string;
  QrCodeInfo?: QrCodeDataArrType;
  caAddress: string;
}

const MenuPop: React.FC<MenuPopProps> = ({
  showMenuPop,
  setShowMenuPop,
  balanceValue,
  anotherBalanceValue,
  accountAddress,
  caAddress,
  QrCodeInfo = '',
}) => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { t } = useTranslation();
  return (
    <Modal isMobileBrowser={false} visibility={showMenuPop} setVisibility={setShowMenuPop}>
      <div className={styles.menuPop__wrapper}>
        <div className={styles.menuPop__wrapper_content}>
          <div className={[styles.setting__account, styles.menuPop__wrapper_account].join(' ')}>
            <div className={styles.setting__account__content}>
              <div>Account</div>
              <div style={{ width: '42rem', overflow: 'hidden' }}>
                {dealWithAccountAddressDisplay(accountAddress, 18)}
              </div>
              <button
                className={clsx(styles.setting__account__content__copy, styles.btn)}
                onClick={() => {
                  copy(accountAddress);
                  message.success('Copied!');
                }}
              />
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
                <ExplorerLink address={accountAddress} width={'1.3vw'} />
              </div>
            </div>
          </div>
          <AElfAssets balanceValue={balanceValue} anotherBalanceValue={anotherBalanceValue} isMobileBrowser={false} />
          <div className={styles.menuPop__buttonsWrapper}>
            <Button
              className={styles.menuPop__button}
              type={ButtonType.ORANGE}
              onClick={() => {
                setModalType(MODAL_TYPE_ENUMS.betHistory);
                setShowSettingModal(true);
              }}>
              {t('common.button.bet.history')}
            </Button>
            <Button
              className={styles.menuPop__button}
              type={ButtonType.ORANGE}
              onClick={() => {
                setModalType(MODAL_TYPE_ENUMS.gameRules);
                setShowSettingModal(true);
              }}>
              {t('common.button.game.rules')}
            </Button>
            <Button
              className={styles.menuPop__button}
              type={ButtonType.ORANGE}
              onClick={() => {
                setModalType(MODAL_TYPE_ENUMS.howToPlay);
                setShowSettingModal(true);
              }}>
              {t('common.button.how.to.play')}
            </Button>
          </div>
        </div>
      </div>
      {showSettingModal && (
        <SettingModal
          isMobileBrowser={false}
          showModal={showSettingModal}
          setShowModal={setShowSettingModal}
          caAddress={caAddress}
          type={modalType}
        />
      )}
    </Modal>
  );
};

export default MenuPop;
