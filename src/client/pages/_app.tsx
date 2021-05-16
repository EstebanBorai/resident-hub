import axios from 'axios';
import Head from 'next/head';

import { UserContextProvider } from '../contexts/user';

import type { NextComponentType } from 'next';

import '../styles/global.css';

function App({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: Record<string, unknown>;
}): JSX.Element {
  axios.defaults.baseURL = '/';

  return (
    <UserContextProvider>
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </>
    </UserContextProvider>
  );
}

export default App;
