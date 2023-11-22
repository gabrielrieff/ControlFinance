import { ReactNode } from 'react';

interface contentProps {
  children: ReactNode;
  open: boolean;
}

export const Content = (props: contentProps) => {
  return (
    <div
      className={`${
        props.open ? 'flex' : 'hidden'
      } absolute z-10 flex-col w-full bg-grey-300 p-2 max-h-[150px] scroll overflow-y-auto`}
    >
      {props.children}
    </div>
  );
};
