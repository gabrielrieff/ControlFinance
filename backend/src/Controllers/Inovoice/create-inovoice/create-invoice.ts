import { Request, Response } from "express";
import { Invoice } from "~/models/inovoice";
import { PostgresCreateInvocieRepository } from "~/repositories/Inovoice/create-inovoice/postgres-create-invoice";

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

      return httpResponse.status(201).json(inovoice);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Error when trying to create a new invoice" });
      }
    }
  }
}
