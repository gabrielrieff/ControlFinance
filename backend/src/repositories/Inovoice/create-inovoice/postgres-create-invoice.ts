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
    const createdDate = new Date();

    const initialInvoice = await client.invoice.create({
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

    if (params.installments && params.installments > 1) {
      for (let i = 0; i < params.installments - 1; i++) {
        const date = new Date(createdDate.setMonth(i + 1));

        await client.invoice.create({
          data: {
            description: params.description,
            type: params.type,
            value: params.value,
            categoryId: params.categoryId,
            userId: params.userId,
            installments: params.installments,
            created_at: date,
            dateEnd: dateEnd,
            invoiceID: initialInvoice.id,
          },
        });
      }
    }

    return initialInvoice;
  }
}
