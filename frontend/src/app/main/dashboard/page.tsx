'use client';

import { BoxResume } from '~/components/BoxResume';

export default function Dashboard() {
  return (
    <main className="flex justify-center items-center bg-white-100 h-full rounded-[20px]">
      <section className="flex items-center justify-center flex-wrap gap-3">
        <BoxResume className="bg-blue-200 font-semibold gap-2">
          <h3 className="text-sm">Total receita</h3>
          <span className="text-xl ">R$ 1000,00</span>
        </BoxResume>
        <BoxResume className="bg-red-200 font-semibold gap-2">
          <h3 className="text-sm">Total despesas</h3>
          <span className="text-xl ">R$ 500,00</span>
        </BoxResume>
        <BoxResume className="bg-green-200 font-semibold gap-2">
          <h3 className="text-sm">Total lucro/prejuízo</h3>
          <span className="text-xl ">R$ 500,00</span>
        </BoxResume>
      </section>
      <section></section>
      <section></section>
    </main>
  );
}
