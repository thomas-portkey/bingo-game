import React from 'react';
import { Modal as AntdModal } from 'antd';

import styles from './Modal.module.scss';

interface ModalProps {
  isMobileBrowser: boolean;
  visibility: boolean;
  setVisibility: (v: boolean) => void;
  children?: React.ReactNode;
}

const Modal = ({ isMobileBrowser, visibility, setVisibility, children }: ModalProps) => {
  return (
    <AntdModal
      className={isMobileBrowser ? styles.mobile : styles.pc}
      centered
      open={visibility}
      onOk={() => setVisibility(false)}
      onCancel={() => setVisibility(false)}
      width={1000}
      closeIcon={<img className={styles.closeIcon} src={require('@source/close.png').default.src} />}
      footer={null}>
      {children}
    </AntdModal>
  );
};

export default Modal;
