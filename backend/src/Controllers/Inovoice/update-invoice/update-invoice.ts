import { Request, Response } from "express";
import { Invoice } from "~/models/inovoice";
import { UpdateInvoiceRepository } from "~/repositories/Inovoice/update-invoice/update-invoice";
import { UpdateInvoiceParams } from "./protocols";

export class UpdateInvoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice | string>> {
    try {
      const id = httpRequest?.params?.id as string;
      const body = httpRequest?.body;

      if (!id) {
        return httpResponse.status(400).json({ error: "Missing user id" });
      }

      const allowedFieldToUpdat: (keyof UpdateInvoiceParams)[] = [
        "id",
        "description",
        "value",
        "type",
        "installments",
        "userId",
        "categoryId",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (field) =>
          !allowedFieldToUpdat.includes(field as keyof UpdateInvoiceParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return httpResponse
          .status(400)
          .json({ error: "Some received field is not allowed" });
      }

      const updateInvoiceRepository = new UpdateInvoiceRepository();
      const updadeInvoice = await updateInvoiceRepository.update(id, body);

      return httpResponse.status(202).json(updadeInvoice);
    } catch (error) {
      if (error != "") {
        return httpResponse.status(400).json({ error: error.message });
      } else {
        return httpResponse
          .status(500)
          .json({ error: "Error when trying to change your invoices" });
      }
    }
  }
}
