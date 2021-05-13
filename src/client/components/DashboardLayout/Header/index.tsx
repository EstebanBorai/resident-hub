import React from 'react';

import styles from './header.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <h1>Thruway</h1>
    </header>
  );
}
