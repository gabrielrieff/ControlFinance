import { enumInvoice } from "~/Enums/EnumInvoice";

export interface Invoice {
  description: string;
  value: number;
  type: enumInvoice;
  categoryId: string;
  userId: string;
  repeatedInvoices?: repeatedInvoices;
}

export interface repeatedInvoices {
  id?: string;
  dateInit?: Date;
  dateEnd: Date;
  invoiceId: string;
}
