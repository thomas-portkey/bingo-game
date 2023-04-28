let rewrite = [];

if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  rewrite = [
    { source: '/api/:path*', destination: 'http://192.168.66.240:15577/api/:path*' },
    {
      source: '/AElfIndexer_DApp/:path*',
      destination: 'http://192.168.67.172:8083/AElfIndexer_DApp/:path*',
    },
  ];
} else {
  rewrite = [
    { source: '/api/:path*', destination: 'https://did-portkey-test.portkey.finance/api/:path*' },
    {
      source: '/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
      destination: 'https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/:path*',
    },
  ];
}

console.log('rewrite', rewrite);
console.log('env---', process.env.NEXT_PUBLIC_APP_ENV);

// const rewrite = [
//   { source: '/api/:path*', destination: process.env.DESTINATION },
//   {
//     source: '/AElfIndexer_DApp/PortKeyIndexerCASchema/:path*',
//     destination: process.env.SCAN_DESTINATION,
//   },
// ];

module.exports = rewrite;
