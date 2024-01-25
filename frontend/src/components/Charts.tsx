import { ChangeEvent, useEffect, useState } from "react";
import Chart from 'react-google-charts';
import { invoiceProps } from "~/@types/contextTypes";
import { transformArrayToChartData } from "~/app/main/dashboard/transformArrayToChartData";
import { api } from "~/services/api";

export const Charts = () => {

    const [dateFilter, setDateFilter] = useState<string>(formatDefaultDate());
    const [invoices, setInvoices] = useState<Array<invoiceProps>>([]);
    const [chart, setChart] = useState<any>(null);

    const fetch = async (year?: number) => {
      try {
        const data = await api.get(`/invoicesyear?year=${year}`)
        return setInvoices(data.data)
      } catch (error) {
      }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedDate = event.target.value;
      setDateFilter(selectedDate);

      const [selectedYear, selectedMonth] = selectedDate.split('-').map(Number);
      fetch(selectedYear);
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
      <>
          <input
            type="month"
            value={dateFilter}
            id="anoInput"
            name="anoInput"
            onChange={handleInputChange}
            min="2022"
            max="2027"
          />
        <Chart
          chartType="LineChart"
          data={chart}
          options={options}
          className="w-full h-[350px]"
        />
      </>
    )
}

const options = {
    curveType: 'function',
    hAxis: {},
    vAxis: {
      format: 'currency',
      formatOptions: {
        prefix: 'R',
        fractionDigits: 0
      },
      minValue: 0
    }
  };