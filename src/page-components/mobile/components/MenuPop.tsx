import React, { useState } from 'react';
import { Popover } from 'antd';
import Modal from '@/page-components/Modal';
import { Button, ButtonType } from '@/page-components/Button';
import { useTranslation } from 'react-i18next';
import { QRCode } from 'react-qrcode-logo';
import clsx from 'clsx';

import useCopy from '@/hooks/useCopy';
import ExplorerLink from '@/page-components/ExplorerLink';
import { dealWithAccountAddressDisplay, QrCodeDataArrType } from '@/utils/common';
import AElfAssets from '@/page-components/AElfAssets';
import SettingModal from '@/page-components/SettingModal';
import { MODAL_TYPE_ENUMS } from '@/page-components/SettingModal/constants';

import styles from '@/styles/mobile.module.css';
interface MenuPopProps {
  showMenuPop: boolean;
  setShowMenuPop;
  caAddress: string;
  accountAddress: string;
  balanceValue: string;
  anotherBalanceValue: string;
  QrCodeInfo: QrCodeDataArrType;
  logout: () => void;
  lock: () => void;
}

const MenuPop: React.FC<MenuPopProps> = ({
  showMenuPop,
  setShowMenuPop,
  balanceValue,
  anotherBalanceValue,
  caAddress,
  accountAddress,
  QrCodeInfo,
  logout,
  lock,
}) => {
  const { onCopy } = useCopy({ accountAddress });
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const { t } = useTranslation();

  return (
    <Modal isMobileBrowser visibility={showMenuPop} setVisibility={setShowMenuPop}>
      <div className={styles.setting__wrapper}>
        <div className={styles.setting__content}>
          <div className={styles.setting__account__module}>
            <div className={styles.setting__account__module__text}>
              {dealWithAccountAddressDisplay(accountAddress, 18)}
            </div>
            <div className={clsx(styles.setting__account__module__copy, styles.button)} onClick={onCopy} />
            <Popover
              trigger={'click'}
              placement={'bottomLeft'}
              arrowPointAtCenter={false}
              content={() => (
                <div>
                  <QRCode
                    value={JSON.stringify(QrCodeInfo)}
                    size={175}
                    quietZone={0}
                    qrStyle={'squares'}
                    eyeRadius={{ outer: 7, inner: 4 }}
                    ecLevel={'L'}
                  />
                  <div className={styles.setting__qrcode__address}>{accountAddress}</div>
                </div>
              )}>
              <div className={clsx(styles.setting__account__module__qrcode, styles.button)} />
            </Popover>
            <div className={clsx(styles.setting__account__module__external, styles.button)}>
              <ExplorerLink address={accountAddress} width={'3vw'} />
            </div>
          </div>
          <AElfAssets isMobileBrowser balanceValue={balanceValue} anotherBalanceValue={anotherBalanceValue} />
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
          <div className={styles.setting__footerButtonWrapper}>
            <div
              className={styles.setting__logout}
              onClick={() => {
                logout();
                setShowMenuPop(false);
              }}>
              <div className={styles.setting__logout__text}>Exit Game</div>
            </div>
            <div
              className={styles.setting__lock}
              onClick={() => {
                setShowMenuPop(false);
                lock();
              }}
            />
          </div>
        </div>
      </div>
      {showSettingModal && (
        <SettingModal
          isMobileBrowser
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
