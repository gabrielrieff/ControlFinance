'use client';

import { FormEvent, useContext, useRef } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { dateInstallments } from '~/Helpers/dateInstallments';
import { Button } from '../shared/Button';
import { Dialog } from '../shared/Dialog';
import { Input } from '../shared/Input';
import { SelectedCategories } from './SelectedCategories/SelectedCategories';
import { SelectedInstallments } from './SelectedInstallments/SelectedInstallments';

interface addRecipeProps {
  closeModal: () => void;
}

export const AddExpense = ({ closeModal }: addRecipeProps) => {
  const { AddInvoice } = useContext(AuthContext);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const categoriRef = useRef<HTMLDivElement | null>(null);
  const installmentsRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleCreatedExpense = (event: FormEvent) => {
    event.preventDefault();

    const categoryId = categoriRef.current?.getAttribute('data-value');
    const installment = Number(
      installmentsRef.current?.getAttribute('data-value')
    );

    if (
      descriptionRef.current?.value === '' ||
      categoryId === '' ||
      valueRef.current?.valueAsNumber! < 1 ||
      installment === undefined ||
      null
    )
      return;

    const dateEnd = dateInstallments(installment);
    const data = {
      description: descriptionRef.current?.value!,
      value: valueRef.current?.valueAsNumber!,
      type: 1,
      installments: installment,
      categoryId: categoryId!,
      dateEnd: dateEnd
    };

    AddInvoice(data);

    if (descriptionRef.current && categoriRef.current && valueRef.current) {
      descriptionRef.current.value = '';
      valueRef.current.valueAsNumber = 0;
    }
  };

  return (
    <>
      <Dialog.Title>Adicionar uma nova despesa</Dialog.Title>
      <Dialog.Content description="Vamos usar esse campo para adicionar novas despesas ao seu controle de finanças">
        <form onSubmit={handleCreatedExpense}>
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
            <Button
              type="submit"
              className="font-semibold text-white-100 bg-green-400 hover:bg-green-400/80 transition-[.3s] "
            >
              Salvar
            </Button>
            <Button
              type="button"
              className="font-semibold text-white-100 bg-red-500 hover:bg-red-500/80 transition-[.3s]"
              onClick={closeModal}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Dialog.Content>
      <Dialog.Close isOpen={closeModal}></Dialog.Close>
    </>
  );
};
