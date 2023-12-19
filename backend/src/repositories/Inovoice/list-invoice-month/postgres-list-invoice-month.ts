import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

export class ListInvoiceMonthRepository {
  async ListInvoiceMonth(
    id: string,
    startDate: Date,
    endDate: Date
  ): Promise<Invoice[] | string> {
    const invoices = await client.invoice.findMany({
      where: {
        userId: id,
        AND: [
          {
            created_at: { gte: startDate },
          },
          {
            created_at: {
              lt: endDate,
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

    return invoices;
  }
}

// {
//   created_at: {
//     gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
//     lt: new Date(`${year}-${month}-01T00:00:00.000Z`),
//   },
// },
