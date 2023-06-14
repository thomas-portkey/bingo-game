import React from 'react';

import styles from './cutdown.module.scss';
import { COUNT } from '@/hooks/useBingo';

interface ICutDownProps {
  isMobile?: boolean;
  time?: number;
}
const CutDown = (props: ICutDownProps) => {
  const { isMobile, time } = props;

  return (
    <div className={[styles.wrapper, styles[isMobile ? 'mobile' : 'pc']].join(' ')}>
      <div className={styles.countdown}>
        <div className={styles.number}>
          <span>{time >= 10 ? Math.floor(time / 10) : 0}</span>
        </div>
        <div className={styles.number}>
          <span>{time % 10}</span>
        </div>
      </div>
      <div className={styles.bar_bg}>
        <img
          className={styles.truck}
          style={{ animationDuration: `${COUNT}s` }}
          src={require('@source/truck.svg').default.src}
        />
        <div className={styles.bar} style={{ animationDuration: `${COUNT}s` }} />
      </div>
    </div>
  );
};

export default CutDown;
