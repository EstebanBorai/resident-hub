import axios from 'axios';
import Head from 'next/head';

import UserContext, { UserContextProvider } from '../contexts/user';
import LoginScreen from '../modules/auth/screens/Login';

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
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <UserContext.Consumer>
        {({ user }) => {
          if (user === null) {
            return (
              <>
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                  />
                  <title>Thruway | Login</title>
                  <link rel="preconnect" href="https://fonts.gstatic.com" />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
                    rel="stylesheet"
                  />
                </Head>
                <div>
                  <LoginScreen />
                </div>
              </>
            );
          }

          return (
            <>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1.0, width=device-width"
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
                  rel="stylesheet"
                />
              </Head>
              <Component {...pageProps} />
            </>
          );
        }}
      </UserContext.Consumer>
    </UserContextProvider>
  );
}

export default App;
