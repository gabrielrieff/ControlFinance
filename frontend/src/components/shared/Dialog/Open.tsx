import * as Dialog from '@radix-ui/react-dialog';

interface openProps {
  children: React.ReactNode;
}

export const Open = (props: openProps) => {
  return <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>;
};
