import { Request, Response } from "express";
import { convertedDates } from "~/Helpers/converterDate";
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

      const { startDate, endDate} = convertedDates(year as string, month as string);

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
