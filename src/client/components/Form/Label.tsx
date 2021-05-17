import React from 'react';

type Props = {
  htmlFor: string;
  text: string;
};

export default function Label({ htmlFor, text }: Props): JSX.Element {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
}
