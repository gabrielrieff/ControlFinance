/*
  Warnings:

  - You are about to drop the column `firtsName` on the `users` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "firtsName",
ADD COLUMN     "firstName" TEXT NOT NULL;
