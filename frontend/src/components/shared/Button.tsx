import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface inputProps extends ComponentProps<'button'> {
  children?: ReactNode;
}

export const Button = (props: inputProps) => {
  return (
    <button
      {...props}
      className={twMerge('rounded-[16px] p-2 w-full', props.className)}
    ></button>
  );
};
