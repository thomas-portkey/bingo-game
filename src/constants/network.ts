import { ChainId } from '@portkey/types';

const bingoAddress = process.env.NEXT_PUBLIC_BINGO_ADDRESS;
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as ChainId;

export const isTestNet =
  typeof location !== 'undefined' &&
  !['bingogame-pro.portkey.finance', 'bingogame.portkey.finance'].includes(location?.host);
const currentNetworkType = `SideChain ${CHAIN_ID} ${isTestNet ? 'Testnet' : ''}`;
const anotherNetworkType = `MainChain AELF`;

export { bingoAddress, CHAIN_ID, currentNetworkType, anotherNetworkType };
