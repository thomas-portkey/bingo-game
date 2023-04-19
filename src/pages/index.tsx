import React, { useEffect, useState, useRef } from 'react';
import { isMobile } from '../utils/common';
import { SideProps } from '../type';

import { ConfigProvider } from '@portkey/did-ui-react';
import { Store } from '../utils/store';
import InitLoading from '../page-components/InitLoading';
import MBingoGame from './mobile';
import PCBingoGame from './pc';

import sourceMap from './sourceMap';

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
  const isMobileBrowser = isMobile(props.uaString);
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

    const schedule = (src: string) => {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        unLoadSourceRef.current = unLoadSourceRef.current + 1;
        if (unLoadSourceRef.current >= sourceMap.length) {
          setHasLoadedSource(true);
        }
      };
    };
    sourceMap.forEach((src) => {
      schedule(src);
    });

    if (!isMobileBrowser) {
      // const style = document.createElement('style');
      // style.setAttribute('type', 'text/css');
      // style.textContent =
      //   'body{ @media screen and (max-width: 1280px) {zoom: 0.6; }  @media screen and (min-width: 1280px) and (max-width: 1920px) {zoom: 0.6;} }  @media screen and (min-width: 1920) {zoom: 1;}';
      // document.head.appendChild(style);
    }
  }, []);

  if (!hasLoadedSource) {
    return <InitLoading isMobileMode={isMobileBrowser} />;
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
