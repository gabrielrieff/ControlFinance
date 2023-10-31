import { Request, Response } from "express";
import { Invoice } from "../../../models/inovoice";
import { UpdateInvoiceParams } from "./protocols";
import { UpdateInvoiceRepository } from "../../../repositories/Inovoice/update-invoice/update-invoice";

export class UpdateInvoiceController {
  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response<Invoice | string>> {
    try {
      const id = httpRequest?.params?.id as string;
      const body = httpRequest?.body;

      if (!id) {
        throw new Error("Missing user id");
      }

      const allowedFieldToUpdat: (keyof UpdateInvoiceParams)[] = [
        "id",
        "description",
        "value",
        "type",
        "userId",
        "categoryId",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (field) =>
          !allowedFieldToUpdat.includes(field as keyof UpdateInvoiceParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        throw new Error("Some received field is not allowed");
      }

      const updateInvoiceRepository = new UpdateInvoiceRepository();
      const updadeInvoice = await updateInvoiceRepository.update(id, body);

      return httpResponse.status(202).json(updadeInvoice);
    } catch (error) {
      httpResponse
        .status(500)
        .json({ error: "Erro ao tentar alterar sua faturas!" });
    }
  }
}
