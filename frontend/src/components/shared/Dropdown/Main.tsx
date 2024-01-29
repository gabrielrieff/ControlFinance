import { ComponentProps, MutableRefObject, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface mainProps extends ComponentProps<'button'> {
  children: ReactNode;
  onClick: () => void;
  mainref?: MutableRefObject<HTMLButtonElement | null>;
}

export const Main = (props: mainProps) => {
  return (
    <div>
      <button
        type="button"
        ref={props.mainref}
        onClick={props.onClick}
        className={twMerge(`flex items-center justify-between p-2 rounded-[16px] border border-grey-500 w-full`, props.className)}
      >
        {props.children}
      </button>
    </div>
  );
};
