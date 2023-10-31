import { Request, Response } from "express";
import { Invoice } from "../../../models/inovoice";
import { PostgresCreateInvocieRepository } from "../../../repositories/Inovoice/create-inovoice/postgres-create-invoice";

export class CreateInvoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice | string>> {
    try {
      const { description, value, type, categoryId } = httpRequest.body;
      const userId = httpRequest.user_id;
      const invoiceId = "";

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
