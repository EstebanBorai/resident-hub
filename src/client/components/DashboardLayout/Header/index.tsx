import React from 'react';

import Avatar from './Avatar';

import styles from './header.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <h1>Resident Hub</h1>
      <div>
        <Avatar />
      </div>
    </header>
  );
}
