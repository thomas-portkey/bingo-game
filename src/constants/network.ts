import { ChainId } from '@portkey/types';

let bingoAddress = 'CuHsvBBBEtV3vManBWUsCmwWs7ANag3Mk8UUbPN7s1waFVa8G';
let CHAIN_ID = 'tDVW' as ChainId;

if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  bingoAddress = 'JvDB3rguLJtpFsovre8udJeXJLhsV1EPScGz2u1FFneahjBQm';
  CHAIN_ID = 'tDVV';
}

export { bingoAddress, CHAIN_ID };
