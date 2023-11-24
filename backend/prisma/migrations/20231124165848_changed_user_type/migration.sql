/*
  Warnings:

  - You are about to drop the column `admin` on the `users` table. All the data in the column will be lost.
  - Added the required column `installments` to the `inovoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "repeatedInvoices" DROP CONSTRAINT "repeatedInvoices_invoiceId_fkey";

-- AlterTable
ALTER TABLE "inovoices" ADD COLUMN     "installments" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "admin",
ADD COLUMN     "userType" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_InvoiceTorepeatedInvoice" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceTorepeatedInvoice_AB_unique" ON "_InvoiceTorepeatedInvoice"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceTorepeatedInvoice_B_index" ON "_InvoiceTorepeatedInvoice"("B");

-- AddForeignKey
ALTER TABLE "_InvoiceTorepeatedInvoice" ADD CONSTRAINT "_InvoiceTorepeatedInvoice_A_fkey" FOREIGN KEY ("A") REFERENCES "inovoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceTorepeatedInvoice" ADD CONSTRAINT "_InvoiceTorepeatedInvoice_B_fkey" FOREIGN KEY ("B") REFERENCES "repeatedInvoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
