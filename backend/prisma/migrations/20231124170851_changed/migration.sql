/*
  Warnings:

  - You are about to drop the `_InvoiceTorepeatedInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InvoiceTorepeatedInvoice" DROP CONSTRAINT "_InvoiceTorepeatedInvoice_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceTorepeatedInvoice" DROP CONSTRAINT "_InvoiceTorepeatedInvoice_B_fkey";

-- DropTable
DROP TABLE "_InvoiceTorepeatedInvoice";

-- AddForeignKey
ALTER TABLE "repeatedInvoices" ADD CONSTRAINT "repeatedInvoices_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "inovoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
