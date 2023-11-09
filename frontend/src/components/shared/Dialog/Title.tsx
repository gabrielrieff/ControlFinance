import * as Dialog from '@radix-ui/react-dialog';

interface openProps {
  children: React.ReactNode;
}

export const Title = (props: openProps) => {
  return (
    <Dialog.Title className="text-black-100 m-0 text-[20px] font-medium">
      {props.children}
    </Dialog.Title>
  );
};
