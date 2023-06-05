import React from 'react';
import { message } from 'antd';
import clsx from 'clsx';
import { CopyIcon } from '../Icon';
import { copy, dealWithAccountAddressDisplay } from '@/utils/common';

import styles from './AccountNo.module.scss';

interface AccountNoProps {
  accountAddress: string;
  maxToShow: number;
  className?: string;
  accountTextCss?: string;
  accountCopyCss?: string;
}

const AccountNo = ({ accountAddress, className, accountTextCss, accountCopyCss, maxToShow }: AccountNoProps) => {
  return (
    <div className={clsx(styles.accountNo, className)}>
      <div className={clsx(styles.accountText, accountTextCss)}>
        {dealWithAccountAddressDisplay(accountAddress, maxToShow)}
      </div>
      <div
        className={clsx(styles.accountCopy, accountCopyCss)}
        onClick={() => {
          copy(accountAddress);
          message.success('Copied!');
        }}>
        <CopyIcon />
      </div>
    </div>
  );
};

export default AccountNo;
