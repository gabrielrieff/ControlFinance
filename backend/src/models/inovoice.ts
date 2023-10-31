export interface Invoice {
  description: string;
  value: number;
  type: boolean;
  categoryId: string;
  userId: string;
  repeatedInvoices?: repeatedInvoices;
}

export interface deleteInvoice {
  id: string;
  userId: string;
}

export interface repeatedInvoices {
  id?: string;
  dateInit?: Date;
  dateEnd: Date;
  invoiceId: string;
}
