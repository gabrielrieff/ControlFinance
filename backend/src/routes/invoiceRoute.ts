import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateInvoiceController } from "../Controllers/Inovoice/create-inovoice/create-invoice";

const invoiceRouter = Router();

invoiceRouter.post(
  "/invoices",
  isAuthenticated,
  new CreateInvoiceController().handle
);

export { invoiceRouter };
