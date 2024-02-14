import { useEffect, useState } from 'react';
import Chart, { ChartWrapperOptions } from 'react-google-charts';
import { invoiceProps } from '~/@types/contextTypes';
import { transformArrayToChartData } from '~/app/main/dashboard/transformArrayToChartData';
import { api } from '~/services/api';

export const Charts = () => {
  const [dateFilter, setDateFilter] = useState<string>(formatDefaultDate());
  const [invoices, setInvoices] = useState<Array<invoiceProps>>([]);
  const [chart, setChart] = useState<any>(null);

  const fetch = async (year?: number) => {
    try {
      const data = await api.get(`/invoicesyear?year=${year}`);
      return setInvoices(data.data);
    } catch (error) {}
  };

  function formatDefaultDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    const [defaultYear, defaultMonth] = dateFilter.split('-').map(Number);
    fetch(defaultYear);
  }, [dateFilter]);

  useEffect(() => {
    const chart = transformArrayToChartData(invoices);
    setChart(chart);
  }, [invoices]);

  return (
    <Chart
      chartType="Bar"
      data={chart}
      options={options}
      className="w-full h-full"
      loader={<div>Loading Chart</div>}
    />
  );
};

const options = {
  curveType: 'function',
  hAxis: {},
  colors: ['#EA580C', '#6D28D9'],
  vAxis: {
    format: 'currency',
    formatOptions: {
      prefix: 'R',
      fractionDigits: 0
    },
    minValue: 0
  },
  chartType: '',
  containerId: ''
};
