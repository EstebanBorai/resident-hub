import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../components/DashboardLayout';
import useUser from '../hooks/use-user';

export default function Home(): JSX.Element {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    }
  }, []);

  return (
    <DashboardLayout>
      <h1>
        <strong>Welcome to the Overview</strong>
      </h1>
    </DashboardLayout>
  );
}
