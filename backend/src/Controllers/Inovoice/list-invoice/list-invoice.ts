import { Request, Response } from "express";
import { Invoice } from "~/models/inovoice";
import { ListInvoiceRepository } from "~/repositories/Inovoice/list-invoice/list-invoice";

export class ListInvoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice[] | string>> {
    try {
      const userId = httpRequest.user_id;
      const { year, month } = httpRequest.query;
      const take = parseInt(httpRequest.query.take as string) || 0;
      console.log(take);
      console.log(year);
      console.log(month);

      const yearConverted = parseInt(year as string, 10);
      const monthConverted = parseInt(month as string, 10);

      const monthZeroBased = monthConverted - 1;
      const startDate = new Date(yearConverted, monthZeroBased, 1);
      const endDate = new Date(yearConverted, monthZeroBased + 1, 1);

      const listInvoiceRepository = new ListInvoiceRepository();
      const ListInvoice = await listInvoiceRepository.listInvoice(
        userId,
        take,
        startDate,
        endDate
      );

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
