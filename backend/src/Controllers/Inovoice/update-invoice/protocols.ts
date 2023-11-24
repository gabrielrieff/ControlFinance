import { enumInvoice } from "~/Enums/EnumInvoice";

export interface UpdateInvoiceParams {
  id: string;
  description?: string;
  value?: number;
  type?: enumInvoice;
  userId?: string;
  categoryId?: string;
  installments?: number;
  dateEnd?: Date;
}
