export const TransactionHistory = () => {
  return (
    <section
      className="border border-grey-500 rounded-2xl flex flex-col
      p-2 h-[200px]"
    >
      <h1 className="font-semibold">Histórico de transações mensal</h1>

      <table className="text-grey-600 text-center">
        <thead>
          <tr>
            <th>Transição</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="p-3">
            <td>Callidus</td>
            <td>Trabalho</td>
            <td>R$1000,00</td>
            <td>31/10/2023</td>
            <td>Crédito</td>
          </tr>

          <tr className="p-1">
            <td>Nubank</td>
            <td>Cartao de credito</td>
            <td>R$100,00</td>
            <td>31/10/2023</td>
            <td>Débito</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
