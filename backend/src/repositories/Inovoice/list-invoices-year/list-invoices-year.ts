import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

export class ListInvoiceYearRepository {
  async ListInvoiceYear(
    id: string,
    Year: number,
  ): Promise<Invoice[] | string> {
    const invoices = await client.invoice.findMany({
      where: {
        userId: id,
        AND: [
          {
            created_at: { gte: new Date(`${Year}-01-01`) },
          },
          {
            created_at: {
              lt: new Date(`${Year + 1}-01-01`),
            },
          },
        ],
      },
      select: {
        id: true,
        description: true,
        value: true,
        type: true,
        categoryId: true,
        userId: true,
        installments: true,
        dateEnd: true,
        created_at: true,
        category: true,
      },
    });

    console.log(invoices)

    return invoices;
  }
}
