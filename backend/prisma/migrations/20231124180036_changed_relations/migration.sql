/*
  Warnings:

  - You are about to drop the `inovoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inovoices" DROP CONSTRAINT "inovoices_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "inovoices" DROP CONSTRAINT "inovoices_userId_fkey";

-- DropForeignKey
ALTER TABLE "repeatedInvoices" DROP CONSTRAINT "repeatedInvoices_invoiceId_fkey";

-- AlterTable
ALTER TABLE "repeatedInvoices" ALTER COLUMN "dateEnd" DROP NOT NULL;

-- DropTable
DROP TABLE "inovoices";

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "repeatedInvoicesId" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_repeatedInvoicesId_fkey" FOREIGN KEY ("repeatedInvoicesId") REFERENCES "repeatedInvoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repeatedInvoices" ADD CONSTRAINT "repeatedInvoices_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
