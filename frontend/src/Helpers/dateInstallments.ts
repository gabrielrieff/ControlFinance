export const dateInstallments = (installment: number) => {
  const dataAtual = new Date();

  dataAtual.setMonth(dataAtual.getMonth() + installment);
  dataAtual.setDate(0);

  const ano = dataAtual.getFullYear();
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
  const dia = dataAtual.getDate().toString().padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
};
