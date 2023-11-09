/*
  Warnings:

  - Added the required column `banner` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `inovoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `admin` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "banner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "inovoices" DROP COLUMN "type",
ADD COLUMN     "type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "admin",
ADD COLUMN     "admin" INTEGER NOT NULL;
