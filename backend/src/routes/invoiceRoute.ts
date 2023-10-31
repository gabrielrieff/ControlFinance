import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateInvoiceController } from "../Controllers/Inovoice/create-inovoice/create-invoice";
import { ListInvoiceController } from "../Controllers/Inovoice/list-invoice/list-invoice";
import { DeleteInvoiceController } from "../Controllers/Inovoice/delete-invoice/delete-invoice";
import { UpdateInvoiceController } from "../Controllers/Inovoice/update-invoice/update-invoice";

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

invoiceRouter.get(
  "/invoices",
  isAuthenticated,
  new ListInvoiceController().handle
);

invoiceRouter.patch(
  "/invoice/:id",
  isAuthenticated,
  new UpdateInvoiceController().handle
);
export { invoiceRouter };
