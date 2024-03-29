'use client';

import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { TransactionHistory } from '~/components/ui/TransactionHistory';
import { Charts } from '~/components/Charts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '~/components/shadcn/card';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Card className="grid grid-cols-2 max-w-[1300px] dlg:max-w-[1000px] dlg:grid-cols-1 justify-center items-center gap-8 p-4 m-3 mt-20">
      <section className="w-full grid grid-rows-4 grid-cols-1 justify-start gap-3">
        <div className="grid grid-cols-3 row-span-1 items-start dlg:items-center gap-2">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="dsm:px-1">
              <CardTitle className="dsm:p-2 dsm:w-full">
                Total receita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-base">
                R$
                {user?.revenue?.toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })}
              </p>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="dsm:px-1">
              <CardTitle className="dsm:p-2 dsm:w-full">
                Total despesas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-base">
                R$
                {user?.expense?.toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })}
              </p>
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="dsm:px-1">
              <CardTitle className="dsm:p-2 dsm:w-full">
                Total lucro/prejuízo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-base">
                R$
                {user?.sum?.toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="p-5 grid row-span-3">
          <Charts />
        </Card>
      </section>
      <Card className="p-5 dsm:p-2 h-full">
        <TransactionHistory />
      </Card>
    </Card>
  );
}
