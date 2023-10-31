import client from "../../../database/postgres";
import { Invoice } from "../../../models/inovoice";

export class ListInvoiceRepository {
  async listInvoice(id: string): Promise<Invoice[] | string> {
    const user = await client.user.findFirst({
      where: { id: id },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const listInvoice = await client.invoice.findMany({
      where: {
        userId: id,
      },
      select: {
        description: true,
        value: true,
        type: true,
        categoryId: true,
        userId: true,
      },
    });

    console.log(listInvoice);

    return listInvoice;
  }
}
