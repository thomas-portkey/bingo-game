import { ChainId } from '@portkey/types';

// const bingoAddress = 'fU9csLqXtnSbcyRJs3fPYLFTz2S9EZowUqkYe4zrJgp1avXK2';
// const CHAIN_ID = 'tDVV';

const bingoAddress = process.env.NEXT_PUBLIC_BINGO_ADDRESS;
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as ChainId;
console.log('process.env.---', bingoAddress, CHAIN_ID);

// if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
//   bingoAddress = 'JvDB3rguLJtpFsovre8udJeXJLhsV1EPScGz2u1FFneahjBQm';
//   CHAIN_ID = 'tDVV';
// }

export const isTestNet =
  typeof location !== 'undefined' &&
  !['bingogame-pro.portkey.finance', 'bingogame.portkey.finance'].includes(location?.host);
const currentNetworkType = `SideChain ${CHAIN_ID} ${isTestNet ? 'Testnet' : ''}`;
const anotherNetworkType = `MainChain AELF`;

export { bingoAddress, CHAIN_ID, currentNetworkType, anotherNetworkType };
