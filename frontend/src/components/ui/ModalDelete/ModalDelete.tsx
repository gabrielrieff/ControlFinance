'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { Button } from '~/components/shared/Button';
import { AuthContext } from '~/context/auth/authContext';

interface data {
  type: number;
  value: string;
  id: string;
}

interface dialogProps {
  isOpen: boolean;
  close: () => void;
  data: data;
  className?: string;
}

export const ModalDelete = (props: dialogProps) => {
  const { deleteInvoice } = useContext(AuthContext);

  return (
    <Dialog.Root open={props.isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={props.close}
          className="bg-black-100/10 data-[state=open]:animate-overlayShow fixed inset-0"
        />
        <Dialog.Content
          className={`${twMerge(
            props.className
          )} data-[state=open]:animate-contentShow fixed z-10
          top-[50%] left-[50%] w-[40%] 2xl:w-[50%] xl:w-[60%] lg:w-[90%] h-[30%] translate-x-[-50%] 
          translate-y-[-50%] rounded-[6px] bg-white-100 p-[25px] focus:outline-none`}
        >
          <Dialog.Title className="text-black-100 m-0 text-[20px] font-medium">
            Adicionar uma nova receita
          </Dialog.Title>

          <div>
            <h3>Tipo de transação:</h3>
            {props.data.type == 0 ? <span>Receita</span> : <span>Despesa</span>}
            <h3>Valor:</h3>
            <span>R$ {props.data.value}</span>
          </div>

          <div className="center gap-7">
            <Button
              className="bg-green-200"
              onClick={() => deleteInvoice(props.data.id)}
            >
              Confirmar
            </Button>
            <Button className="bg-red-200" onClick={props.close}>
              Cancelar
            </Button>
          </div>

          <Dialog.Close asChild>
            <button
              onClick={props.close}
              className="hover:bg-red-500 focus:shadow-red-500 absolute
                          top-[10px] right-[10px] h-[25px] w-[25px] appearance-none 
                          rounded-full center"
            >
              <AiOutlineClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
