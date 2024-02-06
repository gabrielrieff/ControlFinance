import { TableHead, TableHeader, TableRow } from '~/components/shadcn/table';

import {
  LiaLongArrowAltDownSolid,
  LiaLongArrowAltUpSolid,
  LiaSortAlphaDownSolid,
  LiaSortAlphaUpAltSolid,
  LiaSortAmountDownAltSolid,
  LiaSortAmountDownSolid
} from 'react-icons/lia';
import { useContext, useEffect, useState } from 'react';
import { invoiceProps } from '~/@types/contextTypes';
import { orderByInvoices } from '~/Helpers/orderByInvoices';
import { FaGear } from 'react-icons/fa6';
import { AuthContext } from '~/context/auth/authContext';

export const HeaderTable = () => {
  const { invoices } = useContext(AuthContext);

  const [arrayInvoices, setArrayInvoices] =
    useState<Array<invoiceProps>>(invoices);

  const [ascDescVelue, setAscDescVelue] = useState<string>('asc');
  const [ascDescDescription, setAscDescDescription] = useState<string>('asc');
  const [ascDescType, setAscDescType] = useState<string>('asc');
  const [ascDescCategory, setAscDescCategory] = useState<string>('asc');
  const [ascDescActive, setAscDescActive] = useState<string>('');

  const orderByValue = async function () {
    if (ascDescVelue === 'asc') {
      const order = await orderByInvoices(arrayInvoices, 'value', 'asc')!;
      setArrayInvoices(order);
      setAscDescVelue('desc');
      setAscDescActive('value');
    } else {
      const order = await orderByInvoices(arrayInvoices, 'value', 'desc')!;
      setArrayInvoices(order);
      setAscDescVelue('asc');
      setAscDescActive('value');
    }
  };

  const orderByDescription = async function () {
    if (ascDescDescription === 'asc') {
      const order = await orderByInvoices(arrayInvoices, 'description', 'asc')!;
      setArrayInvoices(order);
      setAscDescDescription('desc');
      setAscDescActive('description');
    } else {
      const order = await orderByInvoices(
        arrayInvoices,
        'description',
        'desc'
      )!;
      setArrayInvoices(order);
      setAscDescDescription('asc');
      setAscDescActive('description');
    }
  };

  const orderByType = async function () {
    if (ascDescType === 'asc') {
      const order = await orderByInvoices(arrayInvoices, 'type', 'asc')!;
      setArrayInvoices(order);
      setAscDescType('desc');
      setAscDescActive('type');
    } else {
      const order = await orderByInvoices(arrayInvoices, 'type', 'desc')!;
      setArrayInvoices(order);
      setAscDescType('asc');
      setAscDescActive('type');
    }
  };

  const orderByCategory = async function () {
    if (ascDescCategory === 'asc') {
      const order = await orderByInvoices(arrayInvoices, 'category', 'asc')!;
      setArrayInvoices(order);
      setAscDescCategory('desc');
      setAscDescActive('category');
    } else {
      const order = await orderByInvoices(arrayInvoices, 'category', 'desc')!;
      setArrayInvoices(order);
      setAscDescCategory('asc');
      setAscDescActive('category');
    }
  };

  useEffect(() => {
    setArrayInvoices(invoices);
  }, [invoices]);
  return (
    <TableHeader>
      <TableRow className="flex justify-between">
        <TableHead className="w-[10%] center justify-start text-black pt-2 pb-2 items-end">
          Categoria
          <button onClick={orderByCategory} type="button">
            {ascDescCategory === 'asc' ? (
              <LiaSortAlphaUpAltSolid
                size={25}
                className={
                  ascDescActive === 'category' ? 'text-orange-500' : ''
                }
              />
            ) : (
              <LiaSortAlphaDownSolid
                size={25}
                className={
                  ascDescActive === 'category' ? 'text-orange-500' : ''
                }
              />
            )}
          </button>
        </TableHead>

        <TableHead className="w-[10%] !text-black pt-2 pb-2 items-end center">
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

        <TableHead className="w-[20%] !text-black pt-2 pb-2 items-end center">
          Descrição
          <button onClick={orderByDescription} type="button">
            {ascDescDescription === 'asc' ? (
              <LiaSortAlphaUpAltSolid
                size={25}
                className={
                  ascDescActive === 'description' ? 'text-orange-500' : ''
                }
              />
            ) : (
              <LiaSortAlphaDownSolid
                size={25}
                className={
                  ascDescActive === 'description' ? 'text-orange-500' : ''
                }
              />
            )}
          </button>
        </TableHead>

        <TableHead className="w-[10%] !text-black pt-2 pb-2 items-end center justify-end">
          Valor
          <button onClick={orderByValue} type="button">
            {ascDescVelue === 'asc' ? (
              <LiaSortAmountDownSolid
                size={25}
                className={ascDescActive === 'value' ? 'text-orange-500' : ''}
              />
            ) : (
              <LiaSortAmountDownAltSolid
                size={25}
                className={ascDescActive === 'value' ? 'text-orange-500' : ''}
              />
            )}
          </button>
        </TableHead>
        <TableHead className="w-[10%] !text-black pt-2 pb-2 items-end center">
          Parcelas pagas
        </TableHead>
        <TableHead className="w-[10%] !text-black pt-2 pb-2 items-end center">
          Número de parcelas
        </TableHead>
        <TableHead className="w-[10%] !text-black pt-2 pb-2 items-end center justify-end">
          Data de criação
        </TableHead>
        <TableHead className="w-[10%] !text-black pt-2 pb-2 items-end center justify-end">
          Última parcela
        </TableHead>
        <TableHead className="w-[10%] !text-black pt-2 pb-2 items-end center">
          <FaGear size={25} />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
