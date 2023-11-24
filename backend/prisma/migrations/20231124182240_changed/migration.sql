/*
  Warnings:

  - You are about to drop the `repeatedInvoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "repeatedInvoices" DROP CONSTRAINT "repeatedInvoices_invoiceId_fkey";

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "dateEnd" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "repeatedInvoices";
