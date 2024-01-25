import { Request, Response } from "express";
import { Invoice } from "~/models/inovoice";
import { ListInvoiceYearRepository } from "~/repositories/Inovoice/list-invoices-year/list-invoices-year";

export class ListInvoiceYearController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice[] | string>> {
    try {
      const { year } = httpRequest.query;

      const userId = httpRequest.user_id;
      const yearConverted = parseInt(year);

      const InvoicesYearRepository = new ListInvoiceYearRepository();
      const invoices = await InvoicesYearRepository.ListInvoiceYear(
        userId,
        yearConverted,
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
