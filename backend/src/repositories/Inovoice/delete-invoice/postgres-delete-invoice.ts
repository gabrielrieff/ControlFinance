import { deleteInvoice } from "~/Controllers/Inovoice/delete-invoice/protocols";
import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

export class DeleteInvoiceRepository {
  async deleteInvoice(params: deleteInvoice): Promise<Invoice> {
    const user = await client.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const existingInvoice = await client.invoice.findUnique({
      where: {
        id: params.id,
        userId: params.userId,
      },
      select: {
        description: true,
        value: true,
        type: true,
        categoryId: true,
        category: true,
        userId: true,
        installments: true,
        dateEnd: true,
      },
    });

    const repetInvoices = await client.invoice.findMany({
      where: {
        invoiceID: params.id,
      },
      select: {
        id: true,
      },
    });

    if (!existingInvoice) {
      throw new Error("Invoice not found");
    }

    await client.invoice.delete({
      where: {
        id: params.id,
      },
    });

    if (repetInvoices.length > 0) {
      for (let i = 0; i < repetInvoices.length; i++) {
        const id = repetInvoices[i].id;
        console.log(id);
        await client.invoice.delete({
          where: {
            id: id,
          },
        });
      }
    }

    return existingInvoice!;
  }
}
