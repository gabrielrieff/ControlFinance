'use client';

import { useRef, useState, useContext } from "react";
import { AuthContext } from "~/context/auth/authContext";

import { Input } from "./shared/Input";
import { SelectedCategories } from "./ui/SelectedCategories/SelectedCategories";

import { MdFilterListAlt } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io"

export const Filter = () => {
    const [isFormFilter, setIsFormFilter] = useState(true);
    const categoriRef = useRef<HTMLDivElement | null>(null);

    const [dateCreatedFilter, setDateCreatedFilter] = useState('');
    const [dateEndFilter, setDateEndFilter] = useState('');
    const [type, setType] = useState('');
    const [t, setT] = useState(false);
    


    const { getFilterInvoices, getInvoices } = useContext(AuthContext)

    function handleFilter() {
        setIsFormFilter(!isFormFilter);
    }

    const applayFilters = async () => {
        var baseURL = `/filter-invoices?`

        const category = categoriRef.current?.getAttribute('data-value')!;

        if(dateCreatedFilter){
            const [defaultYear, defaultMonth] = dateCreatedFilter.split('-').map(Number);       
            baseURL += `&monthCreated=${defaultMonth}&yearCreated=${defaultYear}`
        }

        if(dateEndFilter){  
            const [defaultYear, defaultMonth] = dateEndFilter.split('-').map(Number);
            baseURL += `&monthEnd=${defaultMonth}&yearEnd=${defaultYear}`
        }

        if(type){
            baseURL += `&type=${type}`
        }

        if(category !== undefined){
            baseURL += `&categoryId=${category}`
        }

        getFilterInvoices(baseURL);
    }

    async function cleanFilters(){
      setDateCreatedFilter('');
      setDateEndFilter('');
      setType('')
      categoriRef.current = null;

      getInvoices()
  }
  return (
    <>
        <div
          className={`border border-grey-600 w-full flex justify-between
        items-center p-2`}
        >
          <div className='center'>
            <span>Filtros</span>
            <MdFilterListAlt size={25}/>
          </div>
          <IoIosArrowDown
            size={25}
            className={`cursor-pointer hover:text-orenge-500 transition-[.3s] ${
              isFormFilter ? 'rotate-180' : 'rotate-0'
            }`}
            onClick={handleFilter}
          />
        </div>

        <div className='w-full'>
          <div
            className={`bg-grey-300 p-2 pt-5  ${
              isFormFilter ? 'flex' : 'hidden'
            } flex-row transition-[.3s] gap-3`}
          >
              <label className="w-1/5" htmlFor="created-date">
                <span>Data criação</span>
                <Input
                  id="created-date"
                  type="month"
                  onChange={(e) => setDateCreatedFilter(e.target.value)}
                  value={dateCreatedFilter}    
                  min="2022"
                  max="2027"
                  className="border border-grey-500 rounded-none"
                />
              </label>

              <label className="w-1/5" htmlFor="last-portion">
                <span>Última parcela</span>
                <Input
                  id="last-portion"
                  onChange={(e) => setDateEndFilter(e.target.value)}
                  value={dateEndFilter}
                  type="month"
                  min="2022"
                  max="2027"      
                  className="border border-grey-500 rounded-none"
                />
              </label>

              <label className="w-1/5 flex flex-col" htmlFor="type">
                <span>Tipo</span>
                <select value={type} onChange={(e) => setType(e.target.value)} className="h-2/4 bg-grey-200">
                  <option value=""></option>
                  <option value={0} >Crédito</option>
                  <option value={1} >Débito</option>
                </select>
              </label>

              <label className="w-1/5" htmlFor="category">
                <span>Categoria</span>
                <SelectedCategories categoriRef={categoriRef} />
              </label>

              <label className="w-1/5 flex flex-col gap-2">
                <button className="bg-green-400 px-4 py-2 rounded-md hover:bg-green-400/70 transition-[.5s]" onClick={applayFilters} type="button">Aplicar filtros</button>             
                <button className="bg-grey-200 px-4 py-2 rounded-md hover:bg-grey-200/70 transition-[.5s]" onClick={cleanFilters} type="button">Limpar filtros</button>             
              </label>

            </div>
        </div>
    </>

  );
};

function formatDefaultDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
}
