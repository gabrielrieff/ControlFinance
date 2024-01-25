'use client';

import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { BoxResume } from '~/components/BoxResume';
import { TransactionHistory } from '~/components/ui/TransactionHistory';
import { Charts } from '~/components/Charts';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <main
      className="flex flex-col items-center bg-white-100
     h-full gap-8 rounded-[20px] p-4"
    >
      <section className="w-full flex items-center md:flex-col justify-around gap-3">
        <BoxResume className="bg-blue-200 font-semibold gap-2 md:w-full md:p-2">
          <h3 className="text-sm md:text-sm">Total receita</h3>
          <span className="text-xl md:text-base">
            R${' '}
            {user?.revenue?.toLocaleString(undefined, {
              minimumFractionDigits: 2
            })}
          </span>
        </BoxResume>
        <BoxResume className="bg-red-200 font-semibold gap-2 md:w-full md:p-2">
          <h3 className="text-sm md:text-sm">Total despesas</h3>
          <span className="text-xl md:text-base">
            R${' '}
            {user?.expense?.toLocaleString(undefined, {
              minimumFractionDigits: 2
            })}
          </span>
        </BoxResume>
        <BoxResume
          className={`${
            user?.sum! > 0 ? 'bg-green-200' : 'bg-red-500'
          } font-semibold gap-2 md:w-full md:p-2`}
        >
          <h3 className="text-sm md:text-sm">Total lucro/prejuízo</h3>
          <span className="text-xl md:text-base">
            R${' '}
            {user?.sum?.toLocaleString(undefined, {
              minimumFractionDigits: 2
            })}
          </span>
        </BoxResume>
      </section>
      <section className="w-full">
        <div className="border border-grey-500 rounded-2xl p-2">
            <Charts/> 
        </div>
      </section>
      <section className="w-full h-full">
        <TransactionHistory />
      </section>
    </main>
  );
}


