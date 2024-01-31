/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "~/database/postgres";
import { Invoice } from "~/models/inovoice";

export class FilterMonthRepository {
  async FilterMonth(
    id: string,
    categoryId?: string,
    type?: number,
    monthEnd?: Date | any,
    yearEnd?: Date | any,
    monthCreated?: Date | any,
    yearCreated?: Date | any,
  ): Promise<Invoice[] | string> {

    const filters: any = {};

    if(id) {
        filters.userId = id;
    }

    if (categoryId) {
        filters.categoryId = categoryId as string;
      }
  
      if (type) {
          filters.type = type;
        }


      if (!isNaN(monthEnd) && !isNaN(yearEnd)) {
        filters.dateEnd = {};
        filters.invoiceID = null
        filters.type = 1;

        if (monthEnd) {
          filters.dateEnd.gte = monthEnd;
        }
        if (yearEnd) {
          filters.dateEnd.lt = yearEnd;
        }
      }

      if (!isNaN(monthCreated) && !isNaN(yearCreated)) {
        filters.created_at = {};
        if (monthCreated) {
          filters.created_at.gte = monthCreated;
        }
        if (yearCreated) {
          filters.created_at.lt = yearCreated;
        }
      }

    const invoices = await client.invoice.findMany({
      where: filters,
      select: {
        id: true,
        description: true,
        value: true,
        type: true,
        categoryId: true,
        userId: true,
        installments: true,
        dateEnd: true,
        created_at: true,
        category: true,
      },
    });

    return invoices;
  }
}
