export const checkInstallmentsPaid = (
  dataCriacao: Date,
  dataFinalizacao: Date
): number => {
  const dataAtual = new Date();

  const diffCriacaoAtual =
    (dataAtual.getFullYear() - dataCriacao.getFullYear()) * 12 +
    (dataAtual.getMonth() - dataCriacao.getMonth());
  const diffCriacaoFinalizacao =
    (dataFinalizacao.getFullYear() - dataCriacao.getFullYear()) * 12 +
    (dataFinalizacao.getMonth() - dataCriacao.getMonth());

  return Math.max(0, Math.min(diffCriacaoAtual, diffCriacaoFinalizacao));
};
