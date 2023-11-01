import { UpdateInvoiceParams } from "~/Controllers/Inovoice/update-invoice/protocols";
import client from "~/database/postgres";

export class UpdateInvoiceRepository {
  async update(id: string, params: UpdateInvoiceParams) {
    await client.invoice.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });

    const invoice = await client.invoice.findFirst({
      where: {
        id: id,
      },
    });

    return invoice;
  }
}
