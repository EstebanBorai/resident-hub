import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import LoginScreen from '../modules/auth/screens/Login';
import useUser from '../hooks/use-user';

export default function Login(): JSX.Element {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user !== null) {
      router.push('/');
    }
  }, [user]);

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
