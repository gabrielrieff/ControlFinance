import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader
} from '~/components/shadcn/table';
import { Filter } from './main/Transctions/table/Filter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../shadcn/dropdown-menu';
import { invoiceProps } from '~/@types/contextTypes';
import { BodyTable } from './main/Transctions/table/BodyTable';
import { HeaderTable } from './main/Transctions/table/HeaderTable';

export const TransactionHistory = () => {
  const { invoices } = useContext(AuthContext);

  const [arrayInvoices, setArrayInvoices] =
    useState<Array<invoiceProps>>(invoices);

  useEffect(() => {
    setArrayInvoices(invoices);
  }, [invoices]);

  return (
    <section className="flex flex-col p-2 h-full">
      <div className="flex justify-between">
        <h1 className="font-semibold p-3">Histórico de transações mensal</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-accent rounded-md">
            Filtros
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Filter />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="text-grey-600 text-center w-full dsm:text-xs">
        <HeaderTable invoices={arrayInvoices} setInvoices={setArrayInvoices} />

        <BodyTable invoices={arrayInvoices} />
      </Table>
    </section>
  );
};
