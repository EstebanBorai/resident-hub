import React from 'react';

import type { ChangeEvent, FocusEvent } from 'react';

import styles from './form.module.css';

type Props = {
  name: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onBlur(event: FocusEvent<HTMLInputElement>): void;
  onFocus(event: FocusEvent<HTMLInputElement>): void;
};

export default function Input({
  name,
  type = 'text',
  placeholder,
  value = '',
  onChange,
  onBlur,
  onFocus,
}: Props): JSX.Element {
  return (
    <input
      className={styles.input}
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
