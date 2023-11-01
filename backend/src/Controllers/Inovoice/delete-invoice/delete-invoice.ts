import { Request, Response } from "express";
import { Invoice } from "../../../models/inovoice";
import { DeleteInvoiceRepository } from "../../../repositories/Inovoice/delete-invoice/postgres-delete-invoice";

export class DeleteInvoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice | string>> {
    try {
      const id = httpRequest.params.id as string;
      const userId = httpRequest.user_id as string;

      if (!id) {
        return httpResponse.status(401).json({ error: "Missing user id" });
      }

      const deleteInvoiceRepository = new DeleteInvoiceRepository();
      const deleteInvoice = await deleteInvoiceRepository.deleteInvoice({
        id,
        userId,
      });

      return httpResponse.json(deleteInvoice);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Error when trying to change your invoices" });
      }
    }
  }
}
