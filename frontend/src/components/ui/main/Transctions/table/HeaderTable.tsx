import { TableHead, TableHeader, TableRow } from '~/components/shadcn/table';

import {
  LiaLongArrowAltDownSolid,
  LiaLongArrowAltUpSolid,
  LiaSortAlphaDownSolid,
  LiaSortAlphaUpAltSolid,
  LiaSortAmountDownAltSolid,
  LiaSortAmountDownSolid
} from 'react-icons/lia';
import { useEffect, useState } from 'react';
import { invoiceProps } from '~/@types/contextTypes';
import { orderByInvoices } from '~/Helpers/orderByInvoices';
import { FaGear } from 'react-icons/fa6';

interface headerTableProps {
  setInvoices: (valor: Array<invoiceProps>) => void;
  invoices: Array<invoiceProps>;
}

export const HeaderTable = ({ invoices, setInvoices }: headerTableProps) => {
  const [ascDescVelue, setAscDescVelue] = useState<string>('asc');
  const [ascDescDescription, setAscDescDescription] = useState<string>('asc');
  const [ascDescType, setAscDescType] = useState<string>('asc');
  const [ascDescCategory, setAscDescCategory] = useState<string>('asc');
  const [ascDescActive, setAscDescActive] = useState<string>('');

  const orderByValue = async function () {
    if (ascDescVelue === 'asc') {
      const order = await orderByInvoices(invoices, 'value', 'asc')!;
      setInvoices(order);
      setAscDescVelue('desc');
      setAscDescActive('value');
    } else {
      const order = await orderByInvoices(invoices, 'value', 'desc')!;
      setInvoices(order);
      setAscDescVelue('asc');
      setAscDescActive('value');
    }
  };

  const orderByDescription = async function () {
    if (ascDescDescription === 'asc') {
      const order = await orderByInvoices(invoices, 'description', 'asc')!;
      setInvoices(order);
      setAscDescDescription('desc');
      setAscDescActive('description');
    } else {
      const order = await orderByInvoices(invoices, 'description', 'desc')!;
      setInvoices(order);
      setAscDescDescription('asc');
      setAscDescActive('description');
    }
  };

  const orderByType = async function () {
    if (ascDescType === 'asc') {
      const order = await orderByInvoices(invoices, 'type', 'asc')!;
      setInvoices(order);
      setAscDescType('desc');
      setAscDescActive('type');
    } else {
      const order = await orderByInvoices(invoices, 'type', 'desc')!;
      setInvoices(order);
      setAscDescType('asc');
      setAscDescActive('type');
    }
  };

  const orderByCategory = async function () {
    if (ascDescCategory === 'asc') {
      const order = await orderByInvoices(invoices, 'category', 'asc')!;
      setInvoices(order);
      setAscDescCategory('desc');
      setAscDescActive('category');
    } else {
      const order = await orderByInvoices(invoices, 'category', 'desc')!;
      setInvoices(order);
      setAscDescCategory('asc');
      setAscDescActive('category');
    }
  };

  useEffect(() => {
    setInvoices(invoices);
  }, [invoices]);
  return (
    <TableHeader>
      <TableRow className="flex justify-between">
        <TableHead className="w-1/5 center justify-center items-center pt-2 pb-2">
          Categoria
          <button onClick={orderByCategory} type="button">
            {ascDescCategory === 'asc' ? (
              <LiaSortAlphaUpAltSolid
                size={20}
                className={
                  ascDescActive === 'category' ? 'text-orange-500' : ''
                }
              />
            ) : (
              <LiaSortAlphaDownSolid
                size={20}
                className={
                  ascDescActive === 'category' ? 'text-orange-500' : ''
                }
              />
            )}
          </button>
        </TableHead>

        <TableHead className="w-1/5 !text-black pt-2 pb-2 center">
          Tipo
          <button onClick={orderByType} type="button">
            {ascDescType === 'asc' ? (
              <LiaLongArrowAltDownSolid
                size={20}
                className={ascDescActive === 'type' ? 'text-orange-500' : ''}
              />
            ) : (
              <LiaLongArrowAltUpSolid
                size={20}
                className={ascDescActive === 'type' ? 'text-orange-500' : ''}
              />
            )}
          </button>
        </TableHead>

        <TableHead className="w-[20%] !text-black pt-2 pb-2 center">
          Descrição
          <button onClick={orderByDescription} type="button">
            {ascDescDescription === 'asc' ? (
              <LiaSortAlphaUpAltSolid
                size={20}
                className={
                  ascDescActive === 'description' ? 'text-orange-500' : ''
                }
              />
            ) : (
              <LiaSortAlphaDownSolid
                size={20}
                className={
                  ascDescActive === 'description' ? 'text-orange-500' : ''
                }
              />
            )}
          </button>
        </TableHead>

        <TableHead className="w-1/5 !text-black pt-2 pb-2 center justify-end">
          Valor
          <button onClick={orderByValue} type="button">
            {ascDescVelue === 'asc' ? (
              <LiaSortAmountDownSolid
                size={20}
                className={ascDescActive === 'value' ? 'text-orange-500' : ''}
              />
            ) : (
              <LiaSortAmountDownAltSolid
                size={20}
                className={ascDescActive === 'value' ? 'text-orange-500' : ''}
              />
            )}
          </button>
        </TableHead>

        <TableHead className="w-1/5 !text-black pt-2 pb-2 items-end center">
          <FaGear size={20} />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
