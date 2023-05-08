let rewrite = [
  { source: '/api/:path*', destination: 'https://did-portkey.portkey.finance/api/:path*' },
  {
    source: '/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
    destination: 'https://dapp-portkey.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/:path*',
  },
];

if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  rewrite = [
    { source: '/api/:path*', destination: 'http://192.168.66.240:15577/api/:path*' },
    {
      source: '/AElfIndexer_DApp/:path*',
      destination: 'http://192.168.67.172:8083/AElfIndexer_DApp/:path*',
    },
  ];
}
if (process.env.NEXT_PUBLIC_APP_ENV === 'test') {
  rewrite = [
    { source: '/api/:path*', destination: 'https://did-portkey-test.portkey.finance/api/:path*' },
    {
      source: '/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
      destination: 'https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/:path*',
    },
  ];
}

module.exports = rewrite;
