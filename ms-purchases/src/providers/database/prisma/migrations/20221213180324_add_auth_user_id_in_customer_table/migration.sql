/*
  Warnings:

  - A unique constraint covering the columns `[auth_user_id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "auth_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_auth_user_id_key" ON "Customer"("auth_user_id");
