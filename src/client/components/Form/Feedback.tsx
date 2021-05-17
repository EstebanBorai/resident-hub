import React from 'react';

type Props = {
  text?: string;
};

export default function Feedback({ text }: Props): JSX.Element {
  return <p className="text-red-500 text-xs italic">{text || ' '}</p>;
}
