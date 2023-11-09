import * as Dialog from '@radix-ui/react-dialog';

interface dialogDemoProps {
  children: React.ReactNode;
  Open: React.ReactNode;
  isOpen: boolean;
}

export const Root = (props: dialogDemoProps) => {
  return (
    <Dialog.Root open={props.isOpen}>
      {props.Open}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black-100/80 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed z-10
        top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] 
        translate-y-[-50%] rounded-[6px] bg-white-100 p-[25px] focus:outline-none"
        >
          {props.children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
