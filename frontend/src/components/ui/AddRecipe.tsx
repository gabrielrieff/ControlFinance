'use client';

import Image from 'next/image';
import { FormEvent, useContext, useRef } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { Button } from '../shared/Button';
import { Dialog } from '../shared/Dialog';
import { Input } from '../shared/Input';

interface addRecipeProps {
  closeModal: () => void;
}

export const AddRecipe = ({ closeModal }: addRecipeProps) => {
  const { categories, AddRecipe } = useContext(AuthContext);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const categoriRef = useRef<HTMLSelectElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleCreatedRecipe = (event: FormEvent) => {
    event.preventDefault();
    if (
      descriptionRef.current?.value === '' ||
      categoriRef.current?.value === '' ||
      valueRef.current?.value === ''
    )
      return;
    const data = {
      description: descriptionRef.current?.value!,
      value: valueRef.current?.valueAsNumber!,
      type: 0,
      categoryId: categoriRef.current?.value!,
      dateEnd: '2024-05-10'
    };

    AddRecipe(data);
  };
  return (
    <>
      <Dialog.Title>Adicionar uma nova receita</Dialog.Title>
      <Dialog.Content description="Vamos usar esse campo para adicionar novas receitas ao seu controle de finanças">
        <form onSubmit={handleCreatedRecipe}>
          <fieldset className="mb-[15px] flex flex-col items-start gap-5">
            <label htmlFor="descricao">Descrições</label>
            <textarea
              ref={descriptionRef}
              id="descricao"
              className="border border-grey-500 w-full rounded-xl h-[145px] p-2"
            ></textarea>
          </fieldset>
          <fieldset className="mb-[15px] flex flex-col items-start gap-5">
            <label htmlFor="categoria">Categoria</label>
            <select
              ref={categoriRef}
              id="categoria"
              className="border border-grey-500 w-full h-[41px] rounded-[16px] p-2"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  <Image
                    width={46}
                    height={46}
                    className="rounded-full h-[46px] object-cover"
                    alt={category.title}
                    src={`http://localhost:3333/files/image/category/${category.banner}`}
                  />
                  <span>{category.title}</span>
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="mb-[15px] flex flex-col items-start w-[50%]">
            <label htmlFor="valor">Valor</label>
            <Input
              inputref={valueRef}
              type="number"
              className="border border-grey-500"
              id="valor"
            />
          </fieldset>

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
