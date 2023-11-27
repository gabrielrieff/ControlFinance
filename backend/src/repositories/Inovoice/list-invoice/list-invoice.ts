import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

export class ListInvoiceRepository {
  async listInvoice(id: string, take?: number): Promise<Invoice[] | string> {
    const listInvoice = await client.invoice.findMany({
      where: {
        userId: id,
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
