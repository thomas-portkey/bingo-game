import { dealWithAccountAddressDisplay, decorateBalanceText } from '@/utils/common';
import useCopy from '@/hooks/useCopy';

import styles from '@/styles/mobile.module.css';
import { TOKEN_UNIT } from '@/constants/global';

interface HeaderProps {
  accountAddress: string;
  balanceValue: string;
  showModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ balanceValue, accountAddress, showModal }) => {
  const { onCopy } = useCopy({ accountAddress });
  return (
    <div className={styles.settingBtnGroups}>
      <button
        onClick={() => {
          showModal();
        }}
        className={[styles.settingBtn, styles.button].join(' ')}></button>
      <button onClick={onCopy} className={[styles.accountBtn, styles.button].join(' ')}>
        <div className={styles.buttonText}>{dealWithAccountAddressDisplay(accountAddress, 18)}</div>
        <div className={styles.copyIcon} />
      </button>
      <button className={styles.balanceBtn}>
        <div className={styles.tokenIcon} />
        <div className={styles.buttonText}>
          {decorateBalanceText(balanceValue)} {TOKEN_UNIT}
        </div>
      </button>
    </div>
  );
};

export default Header;
