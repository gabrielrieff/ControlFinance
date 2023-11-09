import * as Dialog from '@radix-ui/react-dialog';
import { AiOutlineClose } from 'react-icons/ai';

interface closeProps {
  isOpen: () => void;
}

export const CloseD = (props: closeProps) => {
  return (
    <Dialog.Close asChild>
      <button
        onClick={props.isOpen}
        className="hover:bg-red-200 focus:shadow-red-200 absolute
      top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none
      items-center justify-center rounded-full"
      >
        <AiOutlineClose />
      </button>
    </Dialog.Close>
  );
};
