import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

export class ListInvoiceYearRepository {
  async ListInvoiceYear(
    id: string,
    //Year: number,
  ): Promise<Invoice[] | string> {
    const invoices = await client.invoice.findMany({
      where: {
        userId: id,
        // dateEnd: {gte: new Date() },
        // type
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
