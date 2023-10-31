import { Request, Response } from "express";
import { Invoice } from "../../../models/inovoice";
import { DeleteInvoiceRepository } from "../../../repositories/Inovoice/create-inovoice/postgres-delete-invoice";

export class DeleteInvoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice | string>> {
    try {
      const id = httpRequest.params.id as string;
      const userId = httpRequest.user_id as string;

      if (!id) {
        throw new Error("Missing user id");
      }

      const deleteInvoiceRepository = new DeleteInvoiceRepository();
      const deleteInvoice = await deleteInvoiceRepository.deleteInvoice({
        id,
        userId,
      });

      return httpResponse.json(deleteInvoice);
    } catch (error) {
      throw new Error(error);
    }
  }
}
