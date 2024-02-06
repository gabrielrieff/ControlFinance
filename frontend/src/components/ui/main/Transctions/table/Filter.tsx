import { useContext, useEffect, useRef, useState } from 'react';
import { FaFilterCircleXmark } from 'react-icons/fa6';
import { FiFilter } from 'react-icons/fi';
import { Button } from '~/components/shadcn/button';
import { Input } from '~/components/shadcn/input';
import { Label } from '~/components/shadcn/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/shadcn/select';
import { SelectCategories } from '~/components/shared/Select-categorias';
import { AuthContext } from '~/context/auth/authContext';

interface filterProps {
  baseURL: string;
}

export const Filter = () => {
  const [dateCreatedFilter, setDateCreatedFilter] = useState('');
  const [dateEndFilter, setDateEndFilter] = useState('');
  const [type, setType] = useState('');
  const [valueCategory, setValueCategory] = useState('');

  const { getFilterInvoices, getInvoices } = useContext(AuthContext);
  const applayFilters = async () => {
    var baseURL = `/filter-invoices?`;

    if (dateCreatedFilter) {
      const [defaultYear, defaultMonth] = dateCreatedFilter
        .split('-')
        .map(Number);
      baseURL += `&monthCreated=${defaultMonth}&yearCreated=${defaultYear}`;
    }

    if (dateEndFilter) {
      const [defaultYear, defaultMonth] = dateEndFilter.split('-').map(Number);
      baseURL += `&monthEnd=${defaultMonth}&yearEnd=${defaultYear}`;
    }

    if (type) {
      baseURL += `&TypeInvoice=${type}`;
    }

    if (valueCategory !== undefined && valueCategory !== '') {
      baseURL += `&categoryId=${valueCategory}`;
    }
    getFilterInvoices(baseURL);
  };

  async function cleanFilters() {
    setDateCreatedFilter('');
    setDateEndFilter('');
    setType('');
    setValueCategory('');

    getInvoices();
  }

  return (
    <form className="w-full flex flex-col items-start justify-center p-2 mb-5">
      <div>
        <h2 className="text-2xl">Filtros</h2>
      </div>
      <div className="flex w-full mt-3 bg-slate-100 p-4 rounded-md">
        <section className="flex items-end gap-7 w-full">
          <Label className="flex flex-col gap-2">
            <span>Data criação</span>
            <Input
              type="month"
              max="2027"
              min="2023"
              value={dateCreatedFilter}
              onChange={(e) => setDateCreatedFilter(e.target.value)}
            />
          </Label>

          <Label className="flex flex-col gap-2">
            <span>Última parcela</span>
            <Input
              type="month"
              max="2027"
              min="2023"
              value={dateEndFilter}
              onChange={(e) => setDateEndFilter(e.target.value)}
            />
          </Label>

          <Label className="flex flex-col gap-2">
            <span>Tipo</span>
            <Select onValueChange={(e) => setType(e)} value={type}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Crédito/Débito" />
              </SelectTrigger>
              <SelectContent onChange={(e) => console.log(e)}>
                <SelectGroup>
                  <SelectItem value="0">Crédito</SelectItem>
                  <SelectItem value="1">Débito</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>

          <Label className="flex flex-col gap-2">
            <span>Categorias</span>

            <SelectCategories
              setValor={setValueCategory}
              valor={valueCategory}
            />
          </Label>
        </section>

        <div className="flex items-end gap-4">
          <Button
            variant={'outline'}
            type="button"
            className="flex gap-2"
            onClick={applayFilters}
          >
            <FiFilter size={20} />
            Filtrar
          </Button>

          <Button
            variant={'default'}
            type="button"
            className="flex gap-2"
            onClick={cleanFilters}
          >
            <FaFilterCircleXmark size={20} className="text-white" />
            Limpar
          </Button>
        </div>
      </div>
    </form>
  );
};
