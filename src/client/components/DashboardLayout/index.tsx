import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Sidebar from './Sidebar';

import styles from './dashboard-layout.module.css';

type Props = { children: JSX.Element | JSX.Element[]; title?: string };

export default function Layout({ children, title }: Props): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Resident-Hub{title ? ' | ' + title : ''}</title>
      </Head>
      <div className={styles.dashboard_layout}>
        <Header />
        <Sidebar />
        <main className={styles.dashboard_main}>{children}</main>
      </div>
    </>
  );
}
