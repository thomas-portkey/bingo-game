import React, { useEffect, useState, useRef } from 'react';
import { isMobile } from '../utils/common';
import { SideProps } from '../type';

import { ConfigProvider } from '@portkey/did-ui-react';
import { Store } from '../utils/store';
import InitLoading from '../page-components/Loading';
import MBingoGame from './mobile';
import PCBingoGame from './pc';

import ImgSourceMap from '../constants/sourceMap';

ConfigProvider.setGlobalConfig({
  storageMethod: new Store(),
  graphQLUrl: '/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql',
  socialLogin: {
    Apple: {
      clientId: 'did.portkey',
      redirectURI: 'https://localtest-applesign.portkey.finance/api/app/appleAuth/bingoReceive',
    },
    Google: {
      clientId: '176147744733-a2ks681uuqrmb8ajqrpu17te42gst6lq.apps.googleusercontent.com',
    },
  },
  network: {
    defaultNetwork: 'TESTNET',
    networkList: [
      {
        name: 'aelf Testnet',
        walletType: 'aelf',
        networkType: 'TESTNET',
        isActive: true,
        apiUrl: '',
        graphQLUrl: '/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql',
        connectUrl: '',
      },
    ],
  },
});

const BingoGame = (props: SideProps) => {
  const isMobileBrowser = isMobile(props.uaString || navigator.userAgent);
  const [hasLoadedSource, setHasLoadedSource] = useState<boolean>(false);
  const unLoadSourceRef = useRef<number>(0);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
      document.body.appendChild(script);
      script.onload = () => {
        setTimeout(() => {
          new window.VConsole();
        }, 0);
      };
    }

    const sourceMap: Array<string> = isMobileBrowser ? ImgSourceMap.mobile : ImgSourceMap.pc;

    const timeTask = new Promise(function (resolve) {
      setTimeout(resolve, 10000, false);
    });

    const scheduleTask = new Promise(function (resolve) {
      const start = Date.now();
      const schedule = (src: string) => {
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
          unLoadSourceRef.current = unLoadSourceRef.current + 1;
          if (unLoadSourceRef.current >= sourceMap.length) {
            if (Date.now() - start > 3000) {
              resolve(true);
            } else {
              setTimeout(() => {
                resolve(true);
              }, 3000 - (Date.now() - start));
            }
          }
        };
      };
      sourceMap.forEach((src) => {
        schedule(src);
      });
    });

    Promise.race([timeTask, scheduleTask]).then(() => {
      setHasLoadedSource(true);
    });
  }, []);

  if (!hasLoadedSource) {
    return <InitLoading isMobileMode={isMobileBrowser} isInit loading isMainChain />;
  }

  return isMobileBrowser ? <MBingoGame /> : <PCBingoGame />;
};

export function getServerSideProps(context: any): { props: SideProps } {
  return {
    props: {
      uaString: context.req.headers['user-agent'],
    },
  };
}

export default BingoGame;
