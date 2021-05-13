import React from 'react';

import NavLink from './NavLink';

import styles from './sidebar.module.css';

export default function Sidebar(): JSX.Element {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <NavLink href="/" text="Overview" />
      </ul>
    </aside>
  );
}
