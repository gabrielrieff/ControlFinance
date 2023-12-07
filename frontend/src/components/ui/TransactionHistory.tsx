import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { FormatDate } from '~/Helpers/FormatDate';
import './style.css';

export const TransactionHistory = () => {
  const { listInvoice } = useContext(AuthContext);

  return (
    <section
      className="border border-grey-500 rounded-2xl flex flex-col
      p-2 h-full"
    >
      <h1 className="font-semibold p-3">Histórico de transações mensal</h1>

      <table className="text-grey-600 text-center w-full sm:text-xs">
        <thead className="flex w-full">
          <tr className="flex w-full text-center">
            <th className="w-1/5 center justify-start md:justify-center">
              Transição
            </th>
            <th className="w-1/5 center">Tipo</th>
            <th className="w-1/5 center">Valor</th>
            <th className="w-1/5 center">Data de lançamento</th>
            <th className="w-1/5 center">Status</th>
          </tr>
        </thead>

        <tbody
          className="flex flex-col items-center justify-between overflow-y-auto scroll
         w-full h-[150px] "
        >
          {listInvoice.map((invoice) => (
            <tr className="p-3 flex w-full" key={invoice.id}>
              <td className="center gap-3 w-1/5 justify-start md:flex-col">
                <Image
                  alt={invoice.category.title}
                  src={`http://localhost:3333/files/image/category/${invoice.category.banner}`}
                  width={40}
                  height={40}
                  className="rounded-full "
                />
                <span>{invoice.category.title}</span>
              </td>
              <td className="w-1/5 center">{invoice.description}</td>
              <td className="w-1/5 center">R$ {invoice.value.toFixed(2)}</td>
              <td className="w-1/5 center">{FormatDate(invoice.created_at)}</td>
              {invoice.type == 0 ? (
                <td className="text-green-400 font-semibold center w-1/5">
                  Receita
                </td>
              ) : (
                <td className="text-red-500 font-semibold center w-1/5">
                  Despesa
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
