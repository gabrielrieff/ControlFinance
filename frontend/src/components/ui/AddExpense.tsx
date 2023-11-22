'use client';

import { FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../shared/Button';
import { Dialog } from '../shared/Dialog';
import { Drowdown } from '../shared/Dropdown';
import { Input } from '../shared/Input';
import { SelectedCategories } from './SelectedCategories';

interface addRecipeProps {
  closeModal: () => void;
}

export const AddExpense = ({ closeModal }: addRecipeProps) => {
  const {} = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const categoriRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleCreatedRecipe = (event: FormEvent) => {
    event.preventDefault();

    const categoryId = categoriRef.current?.getAttribute('data-value');

    if (
      descriptionRef.current?.value === '' ||
      categoryId === '' ||
      valueRef.current?.valueAsNumber! < 1
    )
      return;

    const data = {
      description: descriptionRef.current?.value!,
      value: valueRef.current?.valueAsNumber!,
      type: 0,
      categoryId: categoryId!,
      dateEnd: '2024-05-10'
    };

    //AddRecipe(data);

    if (descriptionRef.current && categoriRef.current && valueRef.current) {
      descriptionRef.current.value = '';
      valueRef.current.valueAsNumber = 0;
    }
  };

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Dialog.Title>Adicionar uma nova despesa</Dialog.Title>
      <Dialog.Content description="Vamos usar esse campo para adicionar novas despesas ao seu controle de finanças">
        <form onSubmit={handleCreatedRecipe}>
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
              <Drowdown.Root>
                <Drowdown.Main onClick={handleDropdown}>
                  Quantidade de parcelas a lançar
                  <IoIosArrowDown className={`${isOpen ? 'rotate-180' : ''}`} />
                </Drowdown.Main>
                <Drowdown.Content open={isOpen}>1x</Drowdown.Content>
              </Drowdown.Root>
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
