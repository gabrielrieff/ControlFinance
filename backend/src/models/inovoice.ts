import { enumInvoice } from "~/Enums/EnumInvoice";
import { Category } from "./category";

export interface Invoice {
  description: string;
  value: number;
  type: enumInvoice;
  categoryId: string;
  category: Category;
  userId: string;
  installments: number;
  dateEnd: Date;
  invoiceID?: string;
}
