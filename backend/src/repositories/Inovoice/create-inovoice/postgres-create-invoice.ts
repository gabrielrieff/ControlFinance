/* eslint-disable @typescript-eslint/no-unused-vars */
import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

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

    const dateEnd = new Date(params.dateEnd);
    const createdInvoice = await client.invoice.create({
      data: {
        description: params.description,
        type: params.type,
        value: params.value,
        categoryId: params.categoryId,
        userId: params.userId,
        installments: params.installments,
        dateEnd: dateEnd,
      },
      select: {
        id: true,
        description: true,
        value: true,
        type: true,
        categoryId: true,
        userId: true,
        dateEnd: true,
      },
    });

    const existingInvoice = await client.invoice.findUnique({
      where: { id: createdInvoice.id },
    });

    if (!existingInvoice) {
      throw new Error("Invoice not found");
    }

    return createdInvoice;
  }
}
