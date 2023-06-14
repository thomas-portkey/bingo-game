import React from 'react';

import styles from './buttonminmax.module.css';

interface IButtonMinMaxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isMobile?: boolean;
}
const ButtonMinMax = (props: IButtonMinMaxProps) => {
  return <button {...props} className={[styles[props.isMobile ? 'mobile' : 'pc'], styles.button].join(' ')} />;
};

export const minmaxError = (input?: string) => {
  if (!input) return '';
  const number = Number(input);
  if (number < 1 || number > 100) {
    return 'Limit Amount 1-100 ELF';
  }

  return '';
};

export default ButtonMinMax;
