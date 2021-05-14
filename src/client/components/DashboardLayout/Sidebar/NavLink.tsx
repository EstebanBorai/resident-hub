import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './sidebar.module.css';

type Props = {
  href: string;
  children: JSX.Element;
};

export default function Sidebar({ href, children }: Props): JSX.Element {
  const router = useRouter();

  return (
    <li>
      <Link href={href}>
        <a className={router.pathname === href ? styles.active : undefined}>
          <span>{children}</span>
        </a>
      </Link>
    </li>
  );
}
