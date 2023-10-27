import { ComponentProps, MutableRefObject } from 'react';
import { twMerge } from 'tailwind-merge';

interface inputProps extends ComponentProps<'input'> {
  stylecss?: string;
  inputref?: MutableRefObject<HTMLInputElement | null>;
}

export const Input = (props: inputProps) => {
  return (
    <input
      {...props}
      ref={props.inputref}
      className={twMerge('rounded-[16px] p-2 w-full', props.className)}
    />
  );
};
