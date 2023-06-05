import type { AppProps } from 'next/app';

import InlineScript from './_inlineScript';

import '@portkey/did-ui-react/dist/assets/index.css';
import { PortkeyConfigProvider } from '@portkey/did-ui-react';

import '../styles/globals.css';
import '../utils/i18n';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PortkeyConfigProvider>
      <InlineScript></InlineScript>
      <Component {...pageProps} />
    </PortkeyConfigProvider>
  );
};

export default App;
