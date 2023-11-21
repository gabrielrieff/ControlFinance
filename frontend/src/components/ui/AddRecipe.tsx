'use client';

import { FormEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { IoIosArrowDown, IoMdCloseCircle } from 'react-icons/io';
import { Button } from '../shared/Button';
import { Dialog } from '../shared/Dialog';
import { Drowdown } from '../shared/Dropdown';
import { Input } from '../shared/Input';

interface addRecipeProps {
  closeModal: () => void;
}

export const AddRecipe = ({ closeModal }: addRecipeProps) => {
  const { categories, AddRecipe } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [labelCategorie, setLabelCategorie] = useState<JSX.Element | null>(
    null
  );

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

    AddRecipe(data);

    if (descriptionRef.current && categoriRef.current && valueRef.current) {
      descriptionRef.current.value = '';
      valueRef.current.valueAsNumber = 0;
      handleCleanSelectedCategorie();
    }
  };

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorie = (
    categoryId: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const divHandle = (
      <div
        ref={categoriRef}
        data-value={categoryId}
        className="flex items-center gap-4"
        dangerouslySetInnerHTML={{ __html: event.currentTarget.innerHTML }}
      />
    );

    setLabelCategorie(divHandle);
    setIsOpen(!isOpen);
  };

  function handleCleanSelectedCategorie() {
    setLabelCategorie(null);
  }
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

          <fieldset className="mb-[15px] flex flex-col items-start gap-5 w-full">
            <label htmlFor="categoria">Categoria</label>
            <Drowdown.Root>
              <Drowdown.Main onClick={handleDropdown}>
                {labelCategorie === null ? (
                  <>
                    <span>Selecione uma categoria</span>
                  </>
                ) : (
                  <>
                    <>{labelCategorie}</>
                    <button
                      className="absolute right-9"
                      onClick={handleCleanSelectedCategorie}
                    >
                      <IoMdCloseCircle
                        size={26}
                        className="hover:text-red-200"
                      />
                    </button>
                  </>
                )}
                <IoIosArrowDown className={`${isOpen ? 'rotate-180' : ''}`} />
              </Drowdown.Main>
              <Drowdown.Content open={isOpen}>
                {categories.map((category) => (
                  <div
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => handleCategorie(category.id, e)}
                    data-value={category.id}
                    key={category.id}
                    className="flex items-center hover:bg-grey-400 p-2 cursor-pointer gap-4"
                  >
                    <Image
                      width={26}
                      height={26}
                      className="rounded-full h-[26px] object-cover"
                      alt={category.title}
                      src={`http://localhost:3333/files/image/category/${category.banner}`}
                    />
                    <span>{category.title}</span>
                  </div>
                ))}
              </Drowdown.Content>
            </Drowdown.Root>
          </fieldset>

          <fieldset className="mb-[15px] flex flex-col items-start w-[100%]">
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
