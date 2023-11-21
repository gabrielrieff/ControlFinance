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
      } absolute flex-col justify-center w-full bg-grey-300 p-2`}
    >
      {props.children}
    </div>
  );
};
