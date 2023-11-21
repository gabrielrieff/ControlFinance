import { MutableRefObject, ReactNode } from 'react';

interface mainProps {
  children: ReactNode;
  onClick: () => void;
  mainref?: MutableRefObject<HTMLButtonElement | null>;
}

export const Main = (props: mainProps) => {
  return (
    <button
      type="button"
      ref={props.mainref}
      onClick={props.onClick}
      className="flex items-center justify-between p-2 rounded-[16px] border border-grey-500 w-full"
    >
      {props.children}
    </button>
  );
};
