import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Fieldset({ children }: Props): JSX.Element {
  return <fieldset className="mb-4">{children}</fieldset>;
}
