import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import NavLink from './NavLink';

import styles from './sidebar.module.css';

export default function Sidebar(): JSX.Element {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <NavLink href="/">
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
      </ul>
    </aside>
  );
}
