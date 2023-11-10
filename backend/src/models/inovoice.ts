import { enumInvoice } from "~/Enums/EnumInvoice";
import { Category } from "./category";

export interface Invoice {
  description: string;
  value: number;
  type: enumInvoice;
  categoryId: string;
  category: Category;
  userId: string;
  repeatedInvoices?: repeatedInvoices;
}

export interface repeatedInvoices {
  id?: string;
  dateInit?: Date;
  dateEnd: Date;
  invoiceId: string;
}
