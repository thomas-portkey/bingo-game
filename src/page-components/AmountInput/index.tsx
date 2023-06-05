import React from 'react';

import styles from './amountinput.module.scss';
import { InputNumber } from 'antd';

const MAX_LIMIT = '9'.repeat(13 - 3);

interface IBoardNumberProps {
  value: string;
  onChange: (value: string) => void;
  isMobile?: boolean;
}
const AmountInput = (props: IBoardNumberProps) => {
  const { value, onChange, isMobile } = props;

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <InputNumber
        value={value}
        bordered={false}
        precision={2}
        max={MAX_LIMIT}
        className={styles.input}
        onChange={onChange}
        controls={false}
      />
      <span className={styles.text}>BET ELF</span>
    </div>
  );
};

export default AmountInput;
