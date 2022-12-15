/*
  Warnings:

  - A unique constraint covering the columns `[auth_user_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "auth_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_auth_user_id_key" ON "Student"("auth_user_id");
