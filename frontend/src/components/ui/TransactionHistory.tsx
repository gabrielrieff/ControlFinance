import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader
} from '~/components/shadcn/table';

export const TransactionHistory = () => {
  const { invoicesTake } = useContext(AuthContext);

  return (
    <section className="flex flex-col p-2 h-full">
      <h1 className="font-semibold p-3">Histórico de transações mensal</h1>

      <Table className="text-grey-600 text-center w-full sm:text-xs">
        <TableHeader className="flex w-full">
          <TableRow className="flex w-full text-center">
            <TableHead className="w-2/4 center justify-start md:justify-center">
              Transição
            </TableHead>
            <TableHead className="w-1/4 center">Status</TableHead>
            <TableHead className="w-1/4 center">Valor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="flex flex-col items-center justify-between w-full">
          {invoicesTake.map((invoice) => (
            <TableRow className="p-3 flex w-full" key={invoice.id}>
              <TableCell className="center gap-3 justify-start w-2/4 md:flex-col">
                <Image
                  alt={invoice.category.title}
                  src={`http://localhost:3333/files/image/category/${invoice.category.banner}`}
                  width={40}
                  height={40}
                  className="rounded-full "
                />
                <span>{invoice.category.title}</span>
              </TableCell>
              {invoice.type == 0 ? (
                <TableCell className="text-green-400 font-semibold center w-1/4">
                  Receita
                </TableCell>
              ) : (
                <TableCell className="text-red-500 font-semibold center w-1/4">
                  Despesa
                </TableCell>
              )}
              <TableCell className="w-1/4 center">
                R$ {invoice.value.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
