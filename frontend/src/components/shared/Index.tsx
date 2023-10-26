import { InputHTMLAttributes } from 'react';

type inputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ...rest }: inputProps) => {
  return <input {...rest} />;
};
