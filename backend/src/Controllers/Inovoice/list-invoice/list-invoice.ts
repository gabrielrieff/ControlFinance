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

      return httpResponse.status(202).json(ListInvoice);
    } catch (error) {
      httpResponse
        .status(500)
        .json({ error: "Erro ao tentar listar seus faturas!" });
    }
  }
}
