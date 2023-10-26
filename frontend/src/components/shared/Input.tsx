import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface inputProps extends ComponentProps<'input'> {
  stylecss?: string;
}

export const Input = (props: inputProps) => {
  return (
    <input
      {...props}
      className={twMerge('rounded-[16px] p-2 w-full', props.className)}
    />
  );
};
