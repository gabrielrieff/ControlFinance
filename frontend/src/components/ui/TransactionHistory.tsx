import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

export const TransactionHistory = () => {
  const { listInvoice } = useContext(AuthContext);
  console.log(listInvoice);

  function convertDate(date: Date) {
    const data = new Date(date);
    const newDate = data.toLocaleDateString();
    return newDate;
  }
  return (
    <section
      className="border border-grey-500 rounded-2xl flex flex-col
      p-2 h-[200px]"
    >
      <h1 className="font-semibold p-3">Histórico de transações mensal</h1>

      <table className="text-grey-600 text-center w-full">
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
            <tr className="p-3" key={invoice.id}>
              <td className="flex items-center justify-center gap-3">
                <Image
                  alt={invoice.category.title}
                  src={`http://localhost:3333/files/image/category/${invoice.category.banner}`}
                  width={40}
                  height={40}
                  className="rounded-full "
                />
                <span>{invoice.category.title}</span>
              </td>
              <td>{invoice.description}</td>
              <td>R$ {invoice.value.toFixed(2)}</td>
              <td>{convertDate(invoice.created_at)}</td>
              {invoice.type == 0 ? (
                <td className="text-green-400 font-semibold">Receita</td>
              ) : (
                <td className="text-red-500 font-semibold">Despesa</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
