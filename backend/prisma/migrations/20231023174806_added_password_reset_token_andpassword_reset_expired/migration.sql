-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordResetExpired" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;
