import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { invoiceProps, recipeProps } from '~/@types/contextTypes';
import { TableBody, TableCell, TableRow } from '~/components/shadcn/table';
import { Input } from '~/components/shadcn/input';
import { FormatDate } from '~/Helpers/FormatDate';
import { Button } from '~/components/shadcn/button';
import { AuthContext } from '~/context/auth/authContext';
import { checkInstallmentsPaid } from '~/Helpers/checkInstallmentsPaid';
import { MdDelete, MdEditDocument } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import { SelectCategories } from '~/components/shared/Select-categorias';
import { SelectInstallments } from '~/components/shared/Select-Installments';
import { InputMaskReal } from '~/components/shared/InputMaskReal';

export const BodyTable = () => {
  const { invoices, updateInvoide } = useContext(AuthContext);

  const [arrayInvoices, setArrayInvoices] =
    useState<Array<invoiceProps>>(invoices);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  const installmentsRef = useRef<HTMLButtonElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const [isDescription, setIsDescription] = useState<string>('');
  const [isValue, setIsValue] = useState<string>('');
  const [isCategori, setIsCategori] = useState<string>('');
  const [valueCategory, setValueCategory] = useState('');
  const [valuePortion, setValuePortion] = useState('');

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
  }

  function editInvoice(id: string) {
    const value = valueRef.current?.value?.split(' ')[1]!;
    const valueNumber = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    const valuePortionNum = Number(valuePortion);

    let data: recipeProps = {
      description: isDescription,
      value: valueNumber,
      installments: valuePortionNum,
      categoryId:
        valueCategory !== undefined && valueCategory.length > 1
          ? valueCategory
          : isCategori
    };

    updateInvoide(id, data);

    setIsCategori('');
    setIsDescription('');
    valueRef.current!.value = 'R$ ';
    setValueCategory('');
    setValuePortion('');

    handleOpenModalEdit(null);
  }

  function handleOpenModalEdit(id: string | null) {
    setEditingIndex(id);
  }

  useEffect(() => {
    const invoice = invoices.filter((item) => item.id === editingIndex)[0];

    if (invoice === undefined) return;

    valueRef.current!.value = `${invoice.value}`;
    setIsDescription(invoice.description);
    setIsCategori(invoice.categoryId);
    setValueCategory(invoice.categoryId);
    setValuePortion(String(invoice.installments));
  }, [editingIndex]);

  return (
    <TableBody className="gap-2 flex flex-col overflow-y-auto scroll w-full max-h-[650px] ">
      {invoices.map((item) => (
        <TableRow key={item.id} className="flex justify-between">
          {item.id !== editingIndex ? (
            <TableCell className="center text-center w-[10%] justify-start">
              <Image
                alt={item.category.title}
                src={`http://localhost:3333/files/image/category/${item.category.banner}`}
                width={40}
                height={40}
                className="rounded-full lg:w-[30px] lg:h-[30px]"
              />
              <span>{item.category.title}</span>
            </TableCell>
          ) : (
            <TableCell className="center text-center w-[10%] justify-start">
              <SelectCategories
                setValor={setValueCategory}
                valor={valueCategory}
              />
            </TableCell>
          )}

          {item.type == 0 ? (
            <TableCell className="text-green-400 font-semibold center w-[10%]">
              Receita
            </TableCell>
          ) : (
            <TableCell className="text-red-500 font-semibold center w-[10%]">
              Despesa
            </TableCell>
          )}

          {item.id !== editingIndex ? (
            <TableCell className="center text-center w-[20%]">
              {item.description}
            </TableCell>
          ) : (
            <TableCell className="center p-1 w-[20%]">
              <Input
                type="text"
                value={isDescription}
                onChange={(e) => setIsDescription(e.target.value)}
                className="border border-grey-500"
              />
            </TableCell>
          )}

          {item.id !== editingIndex ? (
            <TableCell className="center justify-end w-[10%]">
              R${' '}
              {item.value.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
            </TableCell>
          ) : (
            <TableCell className="center justify-end w-[10%]">
              <InputMaskReal
                valueRef={valueRef}
                setValor={setIsValue}
                valor={isValue}
              />
            </TableCell>
          )}

          {item.type == 0 ? (
            <TableCell className="center w-[10%]">-</TableCell>
          ) : (
            <TableCell className="center w-[10%]">
              {checkInstallmentsPaid(
                new Date(item.created_at),
                new Date(item.dateEnd)
              )}
            </TableCell>
          )}

          {item.id !== editingIndex ? (
            item.type == 0 ? (
              <TableCell className="center md:hidden w-[10%]">-</TableCell>
            ) : (
              <TableCell className="center md:hidden w-[10%]">
                {item.installments}x
              </TableCell>
            )
          ) : item.type == 0 ? (
            <TableCell className="center md:hidden w-[10%]">-</TableCell>
          ) : (
            <TableCell className="center w-[10%]">
              <SelectInstallments
                setValor={setValuePortion}
                valor={valuePortion}
              />
            </TableCell>
          )}
          <TableCell className="center justify-end w-[10%]">
            {FormatDate(item.created_at)}
          </TableCell>
          <TableCell className="center justify-end w-[10%]">
            {FormatDate(item.dateEnd)}
          </TableCell>

          {item.id !== editingIndex ? (
            <TableCell className="center gap-3 lg:gap-1 lg:flex-col w-[10%]">
              <Button
                onClick={() => deleteInvoice(item.type, item.value, item.id)}
                className="bg-red-500 hover:bg-red-500/60 w-max transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
              >
                <MdDelete size={25} className="text-white-100" />
              </Button>
              <Button
                onClick={() => handleOpenModalEdit(item.id)}
                className="bg-orange-500 hover:bg-orange-500/60 w-max transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
              >
                <MdEditDocument size={25} className="text-white-100" />
              </Button>
            </TableCell>
          ) : (
            <TableCell className="center gap-3 lg:gap-1 md:flex-col w-[10%]">
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
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};
