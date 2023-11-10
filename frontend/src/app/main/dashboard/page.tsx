'use client';

import Chart from 'react-google-charts';
import { BoxResume } from '~/components/BoxResume';
import { TransactionHistory } from '~/components/ui/TransactionHistory';

export default function Dashboard() {
  return (
    <main
      className="flex flex-col justify-between items-center bg-white-100
     h-full rounded-[20px] p-4"
    >
      <section className="w-full flex items-center justify-around flex-wrap gap-3">
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
      <section className="w-full">
        <div
          className="border border-grey-500 rounded-2xl flex flex-col
                      p-2"
        >
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            className=""
            data={data}
            options={options}
          />
        </div>
      </section>
      <section className="w-full">
        <TransactionHistory />
      </section>
    </main>
  );
}

const options = {
  curveType: 'function',
  hAxis: {
    title: 'Month'
  },
  vAxis: {
    format: 'currency',
    formatOptions: {
      prefix: 'R',
      fractionDigits: 0
    },
    title: 'Sales',
    minValue: 0
  },
  chartArea: {
    width: '80%',
    height: '70%'
  }
};

const data = [
  ['Age', 'Weight'],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];
