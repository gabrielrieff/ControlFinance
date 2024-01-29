'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { recipeProps } from '~/@types/contextTypes';
import { FormatDate } from '~/Helpers/FormatDate';
import { checkInstallmentsPaid } from '~/Helpers/checkInstallmentsPaid';
import { Button } from '~/components/shared/Button';
import { Input } from '~/components/shared/Input';
import { ModalDelete } from '~/components/ui/ModalDelete/ModalDelete';
import { SelectedCategories } from '~/components/ui/SelectedCategories/SelectedCategories';
import { SelectedInstallments } from '~/components/ui/SelectedInstallments/SelectedInstallments';

import { FaGear } from 'react-icons/fa6';

import '~/components/ui/style.css';
import { Filter } from '~/components/Filter';

export default function transactions() {
  const { invoices, updateInvoide } = useContext(AuthContext);

  const categoriRef = useRef<HTMLDivElement | null>(null);
  const installmentsRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <main
    className="flex flex-col items-center bg-white-100
              h-screen gap-3 rounded-[20px] p-4"
    >

      <Filter />
      <table className="w-full lg:text-[12px] md:text-[10px]">
        <thead>
          <tr
            className="flex w-full justify-center md:justify-around bg-grey-300/90 
          rounded-[10px] mb-3 p-2"
          >
            <th className="w-[15%] md:w-[10%] center">Categoria</th>
            <th className="w-[10%] center">Tipo</th>
            <th className="w-[10%] center">Descrição</th>
            <th className="w-[10%] center">Valor</th>
            <th className="w-[10%] center">Parcelas pagas</th>
            <th className="w-[10%] center md:hidden">Número de parcelas</th>
            <th className="w-[10%] center">Data de criação</th>
            <th className="w-[10%] center">Última parcela</th>
            <th className="w-[15%] md:w-[10%] center">
              <FaGear size={30} />
            </th>
          </tr>
        </thead>
        <tbody
          className="gap-2 flex flex-col overflow-y-auto scroll
         w-full max-h-[650px] "
        >
          {invoices.map((item) => (
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
                <td className="w-[10%] center">
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

              <td className="w-[10%] center">{FormatDate(item.created_at)}</td>
              <td className="w-[10%] center">{FormatDate(item.dateEnd)}</td>

              {item.id !== editingIndex ? (
                <td className="w-[15%] md:w-[10%] center gap-3 lg:gap-1 lg:flex-col">
                  <Button
                    onClick={() =>
                      deleteInvoice(item.type, item.value, item.id)
                    }
                    className="bg-red-500 hover:bg-red-500/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    Excluir
                  </Button>
                  <Button
                    onClick={() => handleOpenModalEdit(item.id)}
                    className="bg-orenge-500 hover:bg-orenge-500/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    Editar
                  </Button>
                </td>
              ) : (
                <td className="w-[15%] md:w-[10%] center gap-3 lg:gap-1 md:flex-col">
                  <Button
                    onClick={() => editInvoice(editingIndex)}
                    className="bg-green-400 hover:bg-green-400/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    Salvar
                  </Button>
                  <Button
                    onClick={() => handleOpenModalEdit(null)}
                    className="bg-red-500 hover:bg-red-500/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 "
                  >
                    Cancelar
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
