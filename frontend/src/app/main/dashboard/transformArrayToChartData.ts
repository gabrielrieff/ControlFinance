import { invoiceProps } from '~/@types/contextTypes';

export function transformArrayToChartData(data: invoiceProps[]): unknown[][] {
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

  // Array de objetos representando os dados dos meses
  const dataByMonth: { month: string; Receitas: number; Despesas: number }[] =
    [];

  data.forEach((item) => {
    const date = new Date(item.created_at);
    const month = date.getMonth() + 1;
    const monthKey = months[month];

    // Verifica se o mês já existe no array de dados
    const existingMonth = dataByMonth.find((obj) => obj.month === monthKey);
    if (existingMonth) {
      // Se já existe, atualiza os valores de Receitas e Despesas
      const typeKey = item.type ? 'Despesas' : 'Receitas';
      existingMonth[typeKey] += item.value;
    } else {
      // Se não existe, cria um novo objeto para o mês
      const typeKey = item.type ? 'Despesas' : 'Receitas';
      const newMonthData = {
        month: monthKey,
        Receitas: typeKey === 'Receitas' ? item.value : 0,
        Despesas: typeKey === 'Despesas' ? item.value : 0
      };
      dataByMonth.push(newMonthData);
    }
  });

  // Ordena o array de objetos com base no nome do mês
  dataByMonth.sort((a, b) => {
    return (
      Object.values(months).indexOf(a.month) -
      Object.values(months).indexOf(b.month)
    );
  });

  // Cria o array de dados para o gráfico
  const chartData: unknown[][] = [['Month', 'Receitas', 'Despesas']];
  dataByMonth.forEach((monthData) => {
    const chartRow = [monthData.month, monthData.Receitas, monthData.Despesas];
    chartData.push(chartRow);
  });

  return chartData;
}
