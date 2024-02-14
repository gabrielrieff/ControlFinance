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
    <Card className="grid grid-cols-2 max-w-[1300px] lg:max-w-[1000px] mlg:grid-cols-1 justify-center items-center gap-8 p-4 mt-12">
      <section className="w-full grid grid-rows-4 grid-cols-1 justify-start gap-3">
        <div className="grid grid-cols-3 row-span-1 items-start lg:items-center gap-2">
          <Card className="lg:h-full">
            <CardHeader>
              <CardTitle>Total receita</CardTitle>
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

          <Card className="lg:h-full">
            <CardHeader>
              <CardTitle>Total despesas</CardTitle>
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

          <Card className="lg:h-full">
            <CardHeader>
              <CardTitle>Total lucro/prejuízo</CardTitle>
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
      <Card className="p-5 h-full">
        <TransactionHistory />
      </Card>
    </Card>
  );
}
