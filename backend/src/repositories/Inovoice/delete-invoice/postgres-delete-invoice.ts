import client from "../../../database/postgres";
import { Invoice, deleteInvoice } from "../../../models/inovoice";

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
    });

    if (!existingInvoice) {
      throw new Error("Fatura não encontrada");
    }

    const invoiceId = params.id;

    await client.repeatedInvoice.deleteMany({
      where: { invoiceId },
    });

    await client.invoice.delete({
      where: {
        id: params.id,
      },
    });

    return existingInvoice!;
  }
}