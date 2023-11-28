import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import './style.css';

export const TransactionHistory = () => {
  const { listInvoice } = useContext(AuthContext);

  function convertDate(date: Date) {
    const data = new Date(date);
    const newDate = data.toLocaleDateString();
    return newDate;
  }
  return (
    <section
      className="border border-grey-500 rounded-2xl flex flex-col
      p-2"
    >
      <h1 className="font-semibold p-3">Histórico de transações mensal</h1>

      <table className="text-grey-600 text-center w-full">
        <thead className="flex w-full">
          <tr className="flex w-full text-center">
            <th className="w-1/5">Transição</th>
            <th className="w-1/5">Tipo</th>
            <th className="w-1/5">Valor</th>
            <th className="w-1/5">Data de lançamento</th>
            <th className="w-1/5 text-center">Status</th>
          </tr>
        </thead>

        <tbody
          className="flex flex-col items-center justify-between overflow-y-auto
         w-full h-[100px] scroll"
        >
          {listInvoice.map((invoice) => (
            <tr className="p-3 flex w-full" key={invoice.id}>
              <td className="flex items-center justify-center gap-3 w-1/5">
                <Image
                  alt={invoice.category.title}
                  src={`http://localhost:3333/files/image/category/${invoice.category.banner}`}
                  width={40}
                  height={40}
                  className="rounded-full "
                />
                <span>{invoice.category.title}</span>
              </td>
              <td className="w-1/5">{invoice.description}</td>
              <td className="w-1/5">R$ {invoice.value.toFixed(2)}</td>
              <td className="w-1/5">{convertDate(invoice.created_at)}</td>
              {invoice.type == 0 ? (
                <td className="text-green-400 font-semibold text-center w-1/5">
                  Receita
                </td>
              ) : (
                <td className="text-red-500 font-semibold text-center w-1/5">
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
