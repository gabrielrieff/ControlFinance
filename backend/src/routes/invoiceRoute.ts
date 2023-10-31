import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateInvoiceController } from "../Controllers/Inovoice/create-inovoice/create-invoice";
import { DeleteInvoiceController } from "../Controllers/Inovoice/create-inovoice/delete-invoice";

const invoiceRouter = Router();

invoiceRouter.post(
  "/invoices",
  isAuthenticated,
  new CreateInvoiceController().handle
);

invoiceRouter.delete(
  "/invoice/:id",
  isAuthenticated,
  new DeleteInvoiceController().handle
);

export { invoiceRouter };
