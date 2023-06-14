import React from 'react';

import styles from './explorerlink.module.css';
import { AELF_EXPLORER_BASEURL } from '@/constants/network';

interface IExplorerLinkProp {
  address: string;
  width: number | string;
}
const ExplorerLink = (props: IExplorerLinkProp) => {
  const { address, width } = props;

  return (
    <a
      className={styles.wrapper}
      href={`https://${AELF_EXPLORER_BASEURL}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer">
      <img style={{ width }} src={require('@source/external_icon.png').default.src} />
    </a>
  );
};

export default ExplorerLink;
