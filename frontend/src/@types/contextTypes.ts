import { enumInvoice } from './enum/EnumInvoice';

export type userProps = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  photo?: string;
  userType?: number;
  expense?: number;
  sum?: number;
  revenue?: number;
  password?: string;
  updated_at?: Date;
  created_at?: Date;
};

export type signInProps = {
  email: string;
  password: string;
};

export type invoiceProps = {
  id: string;
  description: string;
  value: number;
  type: enumInvoice;
  categoryId: string;
  installments: number;
  category: Category;
  userId: string;
  created_at: Date;
  dateEnd: Date;
};

export type recipeProps = {
  description: string;
  value: number;
  type: enumInvoice;
  installments: number;
  categoryId: string;
  dateEnd: string;
};

export interface Category {
  id: string;
  title: string;
  banner: string;
  userId?: string;
}

export interface updateUserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  file?: FileList;
}
