import { Request, Response } from "express";
import { Invoice } from "../../../models/inovoice";
import { PostgresCreateInvocieRepository } from "../../../repositories/Inovoice/create-inovoice/postgres-create-inovoice";

export class CreateInovoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice | string>> {
    try {
      const requiredFields = [
        "id",
        "description",
        "value",
        "type",
        "created_at",
        "updated_at",
        "categoryId",
      ];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof Invoice]?.length) {
          throw new Error(`Fields ${field} is required!`);
        }
      }

      const {
        id,
        description,
        value,
        type,
        created_at,
        updated_at,
        categoryId,
      } = httpRequest.body;
      const userId = httpRequest.user_id;

      const data = {
        id,
        description,
        value,
        type,
        created_at,
        updated_at,
        categoryId,
        userId,
      };

      const createInovocieRepository = new PostgresCreateInvocieRepository();
      const inovoice = createInovocieRepository.createInovocieRepository(data);

      return httpResponse.json(inovoice);
    } catch (error) {
      throw new Error(error);
    }
  }
}
