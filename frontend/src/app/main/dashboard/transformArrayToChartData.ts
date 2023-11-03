import { billsProps } from '../Accounts/@type';

export function transformArrayToChartData(data: billsProps[]): unknown[][] {
  const months: { [key: number]: string } = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dez'
  };

  const chartData: unknown[][] = [['Month', 'Receitas', 'Despesas']];

  const dataByMonth: { [key: string]: { [key: string]: number } } = {};

  data.forEach((item) => {
    const date = new Date(item.created_at);
    const month = date.getMonth() + 1;
    const monthKey = months[month];

    if (!dataByMonth[monthKey]) {
      dataByMonth[monthKey] = {
        Receitas: 0,
        Despesas: 0
      };
    }

    const typeKey = item.type ? 'Receitas' : 'Despesas';
    dataByMonth[monthKey][typeKey] += item.value;
  });

  Object.entries(dataByMonth).forEach(([month, valuesByType]) => {
    const chartRow = [
      month,
      valuesByType['Receitas'],
      valuesByType['Despesas']
    ];
    chartData.push(chartRow);
  });

  return chartData;
}
