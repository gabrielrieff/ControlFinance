import { Request, Response } from "express";
import { Invoice } from "~/models/inovoice";
import { ListInvoiceMonthRepository } from "~/repositories/Inovoice/list-invoice-month/postgres-list-invoice-month";

export class ListInvoiceMonthController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice[] | string>> {
    try {
      const { year, month } = httpRequest.query;

      const userId = httpRequest.user_id;

      const yearConverted = parseInt(year as string, 10);
      const monthConverted = parseInt(month as string, 10);

      const monthZeroBased = monthConverted - 1;
      const startDate = new Date(yearConverted, monthZeroBased, 1);
      const endDate = new Date(yearConverted, monthZeroBased + 1, 1);

      const InvoicesMonthRepository = new ListInvoiceMonthRepository();
      const invoices = await InvoicesMonthRepository.ListInvoiceMonth(
        userId,
        startDate,
        endDate
      );

      return httpResponse.json(invoices);
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
