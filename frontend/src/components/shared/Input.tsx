import { ComponentProps, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface inputProps extends ComponentProps<'input'> {
  styleCSS?: string;
  children?: React.ReactNode;
}

export const Input = (props: inputProps) => {
  return (
    <input
      {...props}
      className={twMerge('rounded-[16px] p-2 w-full', props.styleCSS)}
    >
      {props.children}
    </input>
  );
};
