/* eslint-disable @typescript-eslint/no-unused-vars */
import { Invoice } from "../../../models/inovoice";
import client from "../../../database/postgres";

export class PostgresCreateInvocieRepository {
  async createInovocieRepository(params: Invoice) {
    const user = await client.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    if (!user) {
      throw new Error("User not exist");
    }

    const createdInvoice = await client.invoice.create({
      data: {
        description: params.description,
        type: params.type,
        value: params.value,
        categoryId: params.categoryId,
        userId: params.userId,
      },
      select: {
        id: true,
        description: true,
        value: true,
        type: true,
        categoryId: true,
        userId: true,
      },
    });

    const existingInvoice = await client.invoice.findUnique({
      where: { id: createdInvoice.id },
    });

    if (!existingInvoice) {
      throw new Error("Fatura não encontrada");
    }
    const d = new Date();
    let createdrepeatedInvoice = {};
    createdrepeatedInvoice = await client.repeatedInvoice.create({
      data: {
        dateEnd: d,
        invoiceId: createdInvoice.id,
      },
    });

    const data = {
      ...createdInvoice,
      ...createdrepeatedInvoice,
    };
    return data;
  }
}
