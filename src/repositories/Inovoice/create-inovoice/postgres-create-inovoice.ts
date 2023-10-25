import { Response } from "express";
import { Invoice } from "../../../models/inovoice";
import client from "../../../database/postgres";

export class PostgresCreateInvocieRepository {
  async createInovocieRepository(
    params: Invoice
  ): Promise<Response<Invoice | string>> {
    const userAlreadyExist = await client.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    if (userAlreadyExist) {
      throw new Error("User already exist!");
    }

    const createdInivoice = await client.invoice.create({
      data: {
        description: params.description,
        type: params.type,
        value: params.value,
        category_id: params.categoryId,
        userId: params.userId,
      },
      select: {
        description: true,
        value: true,
        type: true,
        category: true,
        userId: true,
      },
    });

    return createdInivoice;
  }
}
