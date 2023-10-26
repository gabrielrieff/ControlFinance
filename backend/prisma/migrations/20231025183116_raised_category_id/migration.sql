/*
  Warnings:

  - You are about to drop the column `category_id` on the `inovoices` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `inovoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inovoices" DROP CONSTRAINT "inovoices_category_id_fkey";

-- AlterTable
ALTER TABLE "inovoices" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "inovoices" ADD CONSTRAINT "inovoices_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
