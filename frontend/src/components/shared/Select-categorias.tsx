import { MutableRefObject, useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../shadcn/select';
import Image from 'next/image';

interface selectCategoriesProps {
  refCategories: MutableRefObject<HTMLButtonElement | null>;
}

export const SelectCategories = ({ refCategories }: selectCategoriesProps) => {
  const { categories } = useContext(AuthContext);
  const [sel, setSel] = useState('');

  console.log();

  return (
    <Select>
      <SelectTrigger className="col-span-3" ref={refCategories}>
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              <div
                data-value={category.id}
                className="flex flex-row items-center gap-2"
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
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
