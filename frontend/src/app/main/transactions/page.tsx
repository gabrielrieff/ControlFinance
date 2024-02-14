'use client';

import { Table } from '~/components/shadcn/table';

import { HeaderTable } from '~/components/ui/main/Transctions/table/HeaderTable';
import { BodyTable } from '~/components/ui/main/Transctions/table/BodyTable';
import { Filter } from '~/components/ui/main/Transctions/table/Filter';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { invoiceProps } from '~/@types/contextTypes';
import { Card } from '~/components/shadcn/card';

export default function transactions() {
  const { invoices } = useContext(AuthContext);

  const [arrayInvoices, setArrayInvoices] =
    useState<Array<invoiceProps>>(invoices);

  useEffect(() => {
    setArrayInvoices(invoices);
  }, [invoices]);

  return (
    <main className="flex flex-col items-center h-screen gap-3 rounded-[20px] p-4">
      <Filter />
      <Card className="w-full h-full p-3">
        <h1 className="text-3xl font-bold">Lista de transações</h1>
        <Table className="w-full text-[14px] lg:text-[12px] md:text-[10px] ">
          <HeaderTable
            invoices={arrayInvoices}
            setInvoices={setArrayInvoices}
          />

          <BodyTable invoices={arrayInvoices} />
        </Table>
      </Card>
    </main>
  );
}
