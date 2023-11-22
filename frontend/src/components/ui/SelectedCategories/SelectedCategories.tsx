'use client';

import { MutableRefObject, useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { Drowdown } from '~/components/shared/Dropdown';

import { IoIosArrowDown, IoMdCloseCircle } from 'react-icons/io';

interface selectedCategoriesProps {
  categoriRef: MutableRefObject<HTMLDivElement | null>;
}

export const SelectedCategories = (props: selectedCategoriesProps) => {
  const { categories } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [labelCategorie, setLabelCategorie] = useState<JSX.Element | null>(
    null
  );

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorie = (
    categoryId: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const divHandle = (
      <div
        ref={props.categoriRef}
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
              <IoMdCloseCircle size={26} className="hover:text-red-200" />
            </button>
          </>
        )}
        <IoIosArrowDown className={`${isOpen ? 'rotate-180' : ''}`} />
      </Drowdown.Main>
      <Drowdown.Content open={isOpen}>
        {categories.map((category) => (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleCategorie(category.id, e)
            }
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
  );
};
