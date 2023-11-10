import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

export const TransactionHistory = () => {
  const { listInvoice } = useContext(AuthContext);
  console.log(listInvoice);
  return (
    <section
      className="border border-grey-500 rounded-2xl flex flex-col
      p-2 h-[200px]"
    >
      <h1 className="font-semibold">Histórico de transações mensal</h1>

      <table className="text-grey-600 text-center">
        <thead>
          <tr>
            <th>Transição</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {listInvoice.map((invoice) => (
            <tr className="p-3">
              <td className="flex items-center">
                <Image alt={invoice.description} src={''} />
                <span>{}</span>
              </td>
              <td>{invoice.description}</td>
              <td>R${invoice.value}</td>
              <td>31/10/2023</td>
              <td>Crédito</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
