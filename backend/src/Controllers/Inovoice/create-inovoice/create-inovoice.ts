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
        "description",
        "value",
        "type",
        "categoryId",
        "dateEnd",
      ];

      // for (const field of requiredFields) {
      //   if (!httpRequest?.body?.[field as keyof Invoice]?.length) {
      //     throw new Error(`Fields ${field} is required!`);
      //   }
      // }

      const { description, value, type, categoryId } = httpRequest.body;
      const userId = httpRequest.user_id;
      const invoiceId = "";

      console.log(httpRequest.user_id);
      const data = {
        description,
        value,
        type,
        categoryId,
        userId,
        repeatedInvoices: {
          invoiceId,
        },
      } as Invoice;

      const createInovocieRepository = new PostgresCreateInvocieRepository();
      const inovoice = createInovocieRepository.createInovocieRepository(data);

      return httpResponse.json(inovoice);
    } catch (error) {
      throw new Error(error);
    }
  }
}
