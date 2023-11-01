import { Request, Response } from "express";
import { Invoice } from "../../../models/inovoice";
import { ListInvoiceRepository } from "../../../repositories/Inovoice/list-invoice/list-invoice";

export class ListInvoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice[] | string>> {
    try {
      const userId = httpRequest.user_id;

      const listInvoiceRepository = new ListInvoiceRepository();
      const ListInvoice = await listInvoiceRepository.listInvoice(userId);

      return httpResponse.json(ListInvoice);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        httpResponse
          .status(500)
          .json({ error: "Error trying to list your invoices!" });
      }
    }
  }
}
