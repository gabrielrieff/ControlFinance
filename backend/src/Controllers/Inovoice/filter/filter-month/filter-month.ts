import { Request, Response } from "express";
import { convertedDates } from "~/Helpers/converterDate";
import { Invoice } from "~/models/inovoice";
import { FilterMonthRepository } from "~/repositories/Inovoice/filter/filter-month/filter-month";

export class FilterMonthController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice[] | string>> {
    try {
      const {
        categoryId,
        monthEnd,
        yearEnd,
        monthCreated,
        yearCreated,
        TypeInvoice,
      } = httpRequest.query;

      const userId = httpRequest.user_id;

      const category = categoryId as string;
      const type = parseInt(TypeInvoice as string);

      const { startDate: startDateEnd, endDate: endDateEnd } = convertedDates(
        yearEnd as string,
        monthEnd as string
      );

      const { startDate: startDateCreated, endDate: endDateCreated } =
        convertedDates(yearCreated as string, monthCreated as string);

      const filterMonthRepository = new FilterMonthRepository();
      const invoices = await filterMonthRepository.FilterMonth(
        userId,
        category,
        type,
        startDateEnd,
        endDateEnd,
        startDateCreated,
        endDateCreated
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
