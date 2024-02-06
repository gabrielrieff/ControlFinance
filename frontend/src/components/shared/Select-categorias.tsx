import { useContext, useState } from 'react';
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
  setValor: (valor: string) => void;
  valor: string;
}

export const SelectCategories = ({
  setValor,
  valor
}: selectCategoriesProps) => {
  const { categories } = useContext(AuthContext);

  return (
    <Select onValueChange={(e) => setValor(e)} value={valor}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              <div className="flex flex-row items-center gap-2">
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
