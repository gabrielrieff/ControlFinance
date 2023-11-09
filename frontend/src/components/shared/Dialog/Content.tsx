import * as Dialog from '@radix-ui/react-dialog';

interface contentProps {
  children: React.ReactNode;
  description?: string;
}

export const Content = (props: contentProps) => {
  return (
    <>
      {props.description != '' ? (
        <Dialog.Description className="text-grey-600 mt-[10px] mb-5 text-[15px] leading-normal">
          {props.description}
        </Dialog.Description>
      ) : (
        ''
      )}
      {props.children}
    </>
  );
};
