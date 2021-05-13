import React from 'react';
import Head from 'next/head';

import LoginScreen from '../modules/auth/screens/Login';

export default function Login(): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Thruway | Login</title>
      </Head>
      <div>
        <LoginScreen />
      </div>
    </>
  );
}
