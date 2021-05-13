import React from 'react';

import styles from './card.module.css';

type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

export default function Card({ children, className }: Props): JSX.Element {
  return (
    <div className={className ? `${className} ${styles.card}` : styles.card}>
      {children}
    </div>
  );
}
