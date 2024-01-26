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

    if (categoryId) {
        filters.categoryId = categoryId as string;
      }
  
      if (type) {
          filters.type = type;
        }

      if(id) {
          filters.userId = id;
      }

      if (!isNaN(monthEnd) && !isNaN(yearEnd)) {
        filters.dateEnd = {};
        if (monthEnd) {
          filters.dateEnd.gte = monthEnd;
        }
        if (yearEnd) {
          filters.dateEnd.lt = yearEnd;
        }
      }

      console.log(typeof monthCreated)
      console.log(yearCreated)
  
      if (!isNaN(monthCreated) && !isNaN(yearCreated)) {
        filters.created_at = {};
        if (monthCreated) {
          filters.created_at.gte = monthCreated;
        }
        if (yearCreated) {
          filters.created_at.lt = yearCreated;
        }
      }

      console.log(filters)

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
