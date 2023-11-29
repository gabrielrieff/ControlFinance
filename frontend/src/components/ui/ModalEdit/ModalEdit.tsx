'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { invoiceProps } from '~/@types/contextTypes';
import { Button } from '~/components/shared/Button';
import { Input } from '~/components/shared/Input';
import { AuthContext } from '~/context/auth/authContext';
import { SelectedCategories } from '../SelectedCategories/SelectedCategories';
import { SelectedInstallments } from '../SelectedInstallments/SelectedInstallments';

interface dialogProps {
  isOpen: boolean;
  close: () => void;
  data: invoiceProps | any;
  className?: string;
}

export const ModalEdit = (props: dialogProps) => {
  const { deleteInvoice } = useContext(AuthContext);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const categoriRef = useRef<HTMLDivElement | null>(null);
  const installmentsRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  console.log(props.data);

  return (
    <Dialog.Root open={props.isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={props.close}
          className="bg-black-100/30 data-[state=open]:animate-overlayShow fixed inset-0"
        />
        <Dialog.Content
          className={`${twMerge(
            props.className
          )} data-[state=open]:animate-contentShow fixed z-10
          top-[50%] left-[50%] w-[40%] 2xl:w-[50%] xl:w-[60%] lg:w-[90%] h-[70%] translate-x-[-50%] 
          translate-y-[-50%] rounded-[6px] bg-white-100 p-[25px] focus:outline-none`}
        >
          <Dialog.Title className="text-black-100 m-0 text-[20px] font-medium">
            Editar a transação
          </Dialog.Title>

          <form onSubmit={() => console.log()}>
            <fieldset className="mb-[15px] flex flex-col items-start gap-5">
              <label htmlFor="descricao">Descrições</label>
              <textarea
                ref={descriptionRef}
                id="descricao"
                className="border border-grey-500 w-full rounded-xl h-[145px] p-2"
              ></textarea>
            </fieldset>

            <fieldset className="mb-[15px] flex flex-col items-start gap-5 w-full">
              <label htmlFor="categoria">Categoria</label>
              <SelectedCategories categoriRef={categoriRef} />
            </fieldset>

            <div className="flex gap-2">
              <fieldset className="mb-[15px] flex flex-col items-start w-[50%]">
                <label htmlFor="valor">Valor</label>
                <Input
                  inputref={valueRef}
                  type="number"
                  className="border border-grey-500"
                  id="valor"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex flex-col items-start w-[50%]">
                <label htmlFor="valor">Parcelas</label>
                <SelectedInstallments installmentsRef={installmentsRef} />
              </fieldset>
            </div>

            <div className="flex gap-5 mt-8">
              <Button className="bg-green-200" onClick={() => console.log()}>
                Salvar
              </Button>
              <Button className="bg-red-200" onClick={props.close}>
                Cancelar
              </Button>
            </div>
          </form>

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
