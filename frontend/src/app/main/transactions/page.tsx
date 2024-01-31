'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { Button } from '~/components/shared/Button';
import { Input } from '~/components/shared/Input';
import { ModalDelete } from '~/components/ui/ModalDelete/ModalDelete';
import { SelectedCategories } from '~/components/ui/SelectedCategories/SelectedCategories';
import { SelectedInstallments } from '~/components/ui/SelectedInstallments/SelectedInstallments';
import { Filter } from '~/components/Filter';

import { invoiceProps, recipeProps } from '~/@types/contextTypes';
import { FormatDate } from '~/Helpers/FormatDate';
import { checkInstallmentsPaid } from '~/Helpers/checkInstallmentsPaid';
import { orderByInvoices } from '~/Helpers/orderByInvoices';

import {
  LiaLongArrowAltDownSolid,
  LiaLongArrowAltUpSolid,
  LiaSortAlphaDownSolid,
  LiaSortAlphaUpAltSolid,
  LiaSortAmountDownAltSolid,
  LiaSortAmountDownSolid
} from 'react-icons/lia';
import { FaGear } from 'react-icons/fa6';
import { MdDelete, MdEditDocument } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import { FaSave } from 'react-icons/fa';

import '~/components/ui/style.css';

export default function transactions() {
  const { invoices, updateInvoide } = useContext(AuthContext);

  const categoriRef = useRef<HTMLDivElement | null>(null);
  const installmentsRef = useRef<HTMLDivElement | null>(null);

  const [arrayInvoices, setArrayInvoices] =
    useState<Array<invoiceProps>>(invoices);

  console.log(arrayInvoices);

  const [isDescription, setIsDescription] = useState<string>('');
  const [isValue, setIsValue] = useState<number>(0);
  const [isInstallment, setIsInstallment] = useState<number>(0);
  const [isCategori, setIsCategori] = useState<string>('');

  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    type: 0,
    value: '',
    id: ''
  });

  function deleteInvoice(type: number, value: number, id: string) {
    setData({
      type: type,
      value: value.toLocaleString(undefined, {
        minimumFractionDigits: 2
      }),
      id: id
    });
    handleOpenModalDelete();
  }

  function handleOpenModalDelete() {
    setIsOpen(!isOpen);
  }

  function editInvoice(id: string) {
    const categoryId = categoriRef.current?.getAttribute('data-value')!;
    const installment = Number(
      installmentsRef.current?.getAttribute('data-value')
    );

    let data: recipeProps = {
      description: isDescription,
      value: isValue,
      installments: !Number.isNaN(installment) ? installment : isInstallment,
      categoryId:
        categoryId !== undefined && categoryId.length > 1
          ? categoryId
          : isCategori
    };

    updateInvoide(id, data);

    setIsCategori('');
    setIsDescription('');
    setIsInstallment(0);
    setIsValue(0);

    handleOpenModalEdit(null);
  }

  function handleOpenModalEdit(id: string | null) {
    setEditingIndex(id);
  }

  useEffect(() => {
    const invoice = invoices.filter((item) => item.id === editingIndex)[0];

    if (invoice === undefined) return;

    setIsValue(invoice.value);
    setIsDescription(invoice.description);
    setIsInstallment(invoice.installments);
    setIsCategori(invoice.categoryId);
  }, [editingIndex]);

  useEffect(() => {
    setArrayInvoices(invoices);
  }, [invoices]);

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

  return (
    <main
      className="flex flex-col items-center bg-white-100
              h-screen gap-3 rounded-[20px] p-4"
    >
      <Filter />
      <table className="w-full lg:text-[12px] md:text-[10px]">
        <thead>
          <tr
            className="flex w-full justify-between md:justify-around bg-grey-300/90 
          rounded-[10px] mb-3 p-2"
          >
            <th className="w-[15%] md:w-[10%] center justify-start">
              Categoria{' '}
              <button onClick={orderByCategory} type="button">
                {ascDescCategory === 'asc' ? (
                  <LiaSortAlphaUpAltSolid
                    size={25}
                    className={
                      ascDescActive === 'category' ? 'text-orenge-500' : ''
                    }
                  />
                ) : (
                  <LiaSortAlphaDownSolid
                    size={25}
                    className={
                      ascDescActive === 'category' ? 'text-orenge-500' : ''
                    }
                  />
                )}
              </button>
            </th>
            <th className="w-[10%] center">
              Tipo{' '}
              <button onClick={orderByType} type="button">
                {ascDescType === 'asc' ? (
                  <LiaLongArrowAltDownSolid
                    size={20}
                    className={
                      ascDescActive === 'type' ? 'text-orenge-500' : ''
                    }
                  />
                ) : (
                  <LiaLongArrowAltUpSolid
                    size={20}
                    className={
                      ascDescActive === 'type' ? 'text-orenge-500' : ''
                    }
                  />
                )}
              </button>
            </th>
            <th className="w-[10%] center">
              Descrição{' '}
              <button onClick={orderByDescription} type="button">
                {ascDescDescription === 'asc' ? (
                  <LiaSortAlphaUpAltSolid
                    size={25}
                    className={
                      ascDescActive === 'description' ? 'text-orenge-500' : ''
                    }
                  />
                ) : (
                  <LiaSortAlphaDownSolid
                    size={25}
                    className={
                      ascDescActive === 'description' ? 'text-orenge-500' : ''
                    }
                  />
                )}
              </button>
            </th>
            <th className="w-[10%] center justify-end">
              Valor{' '}
              <button onClick={orderByValue} type="button">
                {ascDescVelue === 'asc' ? (
                  <LiaSortAmountDownSolid
                    size={25}
                    className={
                      ascDescActive === 'value' ? 'text-orenge-500' : ''
                    }
                  />
                ) : (
                  <LiaSortAmountDownAltSolid
                    size={25}
                    className={
                      ascDescActive === 'value' ? 'text-orenge-500' : ''
                    }
                  />
                )}
              </button>
            </th>
            <th className="w-[10%] center">Parcelas pagas</th>
            <th className="w-[10%] center md:hidden">Número de parcelas</th>
            <th className="w-[10%] center justify-end">Data de criação</th>
            <th className="w-[10%] center justify-end">Última parcela</th>
            <th className="w-[10%] md:w-[10%] center">
              <FaGear size={30} />
            </th>
          </tr>
        </thead>
        <tbody
          className="gap-2 flex flex-col overflow-y-auto scroll
         w-full max-h-[650px] "
        >
          {arrayInvoices.map((item) => (
            <tr
              key={item.id}
              className="bg-grey-300/30 rounded-[10px] p-2 flex w-full justify-between"
            >
              {item.id !== editingIndex ? (
                <td
                  className="flex items-center justify-start gap-3 md:gap-1 md:flex-col 
                            w-[15%] md:w-[10%]"
                >
                  <Image
                    alt={item.category.title}
                    src={`http://localhost:3333/files/image/category/${item.category.banner}`}
                    width={40}
                    height={40}
                    className="rounded-full lg:w-[30px] lg:h-[30px]"
                  />
                  <span>{item.category.title}</span>
                </td>
              ) : (
                <td className="w-[15%] md:w-[10%] center">
                  <SelectedCategories categoriRef={categoriRef} />
                </td>
              )}

              {item.type == 0 ? (
                <td className="text-green-400 font-semibold w-[10%] center">
                  Receita
                </td>
              ) : (
                <td className="text-red-500 font-semibold w-[10%] center">
                  Despesa
                </td>
              )}

              {item.id !== editingIndex ? (
                <td className="w-[10%] center text-center">
                  {item.description}
                </td>
              ) : (
                <td className="w-[10%] center p-1">
                  <Input
                    type="text"
                    value={isDescription}
                    onChange={(e) => setIsDescription(e.target.value)}
                    className="border border-grey-500"
                  />
                </td>
              )}

              {item.id !== editingIndex ? (
                <td className="w-[10%] center justify-end">
                  R${' '}
                  {item.value.toLocaleString(undefined, {
                    minimumFractionDigits: 2
                  })}
                </td>
              ) : (
                <td className="w-[10%] center p-1">
                  <Input
                    type="number"
                    value={isValue}
                    onChange={(e) => setIsValue(e.target.valueAsNumber)}
                    className="border border-grey-500"
                  />
                </td>
              )}

              {item.type == 0 ? (
                <td className="w-[10%] center">-</td>
              ) : (
                <td className="w-[10%] center">
                  {checkInstallmentsPaid(
                    new Date(item.created_at),
                    new Date(item.dateEnd)
                  )}
                </td>
              )}

              {item.id !== editingIndex ? (
                item.type == 0 ? (
                  <td className="w-[10%] center md:hidden">-</td>
                ) : (
                  <td className="w-[10%] center md:hidden">
                    {item.installments}x
                  </td>
                )
              ) : item.type == 0 ? (
                <td className="w-[10%] center md:hidden">-</td>
              ) : (
                <td className="w-[10%] center">
                  <SelectedInstallments installmentsRef={installmentsRef} />
                </td>
              )}

              <td className="w-[10%] center justify-end">
                {FormatDate(item.created_at)}
              </td>
              <td className="w-[10%] center justify-end">
                {FormatDate(item.dateEnd)}
              </td>

              {item.id !== editingIndex ? (
                <td className="w-[10%] md:w-[10%] center gap-3 lg:gap-1 lg:flex-col">
                  <Button
                    onClick={() =>
                      deleteInvoice(item.type, item.value, item.id)
                    }
                    className="bg-red-500 hover:bg-red-500/60 w-max transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    <MdDelete size={25} className="text-white-100" />
                  </Button>
                  <Button
                    onClick={() => handleOpenModalEdit(item.id)}
                    className="bg-orenge-500 hover:bg-orenge-500/60 w-max transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    <MdEditDocument size={25} className="text-white-100" />
                  </Button>
                </td>
              ) : (
                <td className="w-[10%] md:w-[10%] center gap-3 lg:gap-1 md:flex-col">
                  <Button
                    onClick={() => editInvoice(editingIndex)}
                    className="bg-green-400 hover:bg-green-400/60 w-max transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    <FaSave size={25} className="text-white-100" />
                  </Button>
                  <Button
                    onClick={() => handleOpenModalEdit(null)}
                    className="bg-red-500 hover:bg-red-500/60 w-max transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    <TiCancel size={25} className="text-white-100" />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDelete isOpen={isOpen} close={handleOpenModalDelete} data={data} />
    </main>
  );
}
