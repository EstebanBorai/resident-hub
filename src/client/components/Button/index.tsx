import React from 'react';

import styles from './button.module.css';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  type?: 'button' | 'submit';
};

export default function Button({
  children,
  type = 'button',
}: Props): JSX.Element {
  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  );
}
