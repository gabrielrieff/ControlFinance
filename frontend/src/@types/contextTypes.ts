import { enumInvoice } from './enum/EnumInvoice';

export type userProps = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  photo?: string;
  admin?: number;
  password?: string;
  updated_at?: Date;
  created_at?: Date;
};

export type signInProps = {
  email: string;
  password: string;
};

export type invoiceProps = {
  description: string;
  value: number;
  type: enumInvoice;
  categoryId: string;
  userId: string;
  repeatedInvoices?: repeatedInvoicesProps;
};

export type repeatedInvoicesProps = {
  id?: string;
  dateInit?: Date;
  dateEnd: Date;
  invoiceId: string;
};
