export type QRCodeDataObjType = {
  address: string;
  netWorkType: string;
  chainType: string;
  type: 'login' | 'send';
  toInfo: { name: string; address: string };
  deviceType?: number;
  assetInfo: {
    symbol: string;
    tokenContractAddress: string;
    chainId: string;
    decimals: string | number;
  };
};

export type QrCodeDataArrType = [
  string, // chainType
  string, // netWorkType
  'login' | 'send', // type
  string, // toAddress
  string, // symbol
  string, // tokenContractAddress
  string, // chainId
  string | number, // decimals
  number | undefined, //
];

export const copy = (content: string) => {
  const input = document.createElement('input');
  input.value = content;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  input.remove();
};

// check if the user is on mobile
export const isMobile = (uaString?: string) => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(uaString);
};

export const shrinkSendQrData = (data: QRCodeDataObjType): QrCodeDataArrType => {
  // 1.chainType  2.netWorkType 3.data.type 4.toAddress 5. symbol 6. tokenContractAddress 7. chainId 8. decimals
  return [
    data.chainType,
    data.netWorkType,
    data.type,
    data.address,
    data.assetInfo.symbol,
    data.assetInfo.tokenContractAddress,
    data.assetInfo.chainId,
    data.assetInfo.decimals,
    data.deviceType,
  ];
};

export const decorateBalanceText = (balance: string) => {
  if (!(balance?.length > 0)) return balance;
  let dealedBalance = balance;
  if (balance.lastIndexOf('.') > 0) {
    const [before, after] = balance.split('.').map((val, idx) => (idx !== 0 ? val.substring(0, 2) : val));
    const checkedAfter =
      after.length > 1
        ? after[0] === '0'
          ? after
          : Number(after) % 10 === 0
          ? `${Number(after) / 10}`
          : after
        : after[0] === '0'
        ? ''
        : after;
    dealedBalance = checkedAfter.length > 0 ? `${before}.${checkedAfter}` : before;
  }
  return dealedBalance.replace('.00', '');
};
