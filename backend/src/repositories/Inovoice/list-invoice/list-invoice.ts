import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

export class ListInvoiceRepository {
  async listInvoice(
    id: string,
    take?: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<Invoice[] | string> {
    const listInvoice = await client.invoice.findMany({
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
      take: take,
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

    return listInvoice;
  }
}
