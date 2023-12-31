import { Router } from "express";
import { CreateInvoiceController } from "~/Controllers/Inovoice/create-inovoice/create-invoice";
import { DeleteInvoiceController } from "~/Controllers/Inovoice/delete-invoice/delete-invoice";
import { ListInvoiceMonthController } from "~/Controllers/Inovoice/list-invoice-month/list-invoice-month";
import { ListInvoiceController } from "~/Controllers/Inovoice/list-invoice/list-invoice";
import { UpdateInvoiceController } from "~/Controllers/Inovoice/update-invoice/update-invoice";
import { isAuthenticated } from "~/middlewares/isAuthenticated";

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

invoiceRouter.get(
  "/invoice",
  isAuthenticated,
  new ListInvoiceMonthController().handle
);

invoiceRouter.patch(
  "/invoice/:id",
  isAuthenticated,
  new UpdateInvoiceController().handle
);
export { invoiceRouter };
