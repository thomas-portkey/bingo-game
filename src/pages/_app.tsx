import type { AppProps } from 'next/app';

import InlineScript from './_inlineScript';

import '@portkey/did-ui-react/dist/assets/index.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <InlineScript></InlineScript>
      <Component {...pageProps} />
    </>
  );
};

export default App;
