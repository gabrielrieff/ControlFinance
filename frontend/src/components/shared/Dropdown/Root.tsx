import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export const Root = (props: RootProps) => {
  return <section className="relative w-full">{props.children}</section>;
};
