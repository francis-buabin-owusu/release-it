/*
  Warnings:

  - The primary key for the `staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employee_id` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project_staffs" DROP CONSTRAINT "project_staffs_staff_id_fkey";

-- DropIndex
DROP INDEX "staff_employee_id_key";

-- AlterTable
ALTER TABLE "staff" DROP CONSTRAINT "staff_pkey",
DROP COLUMN "employee_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "staff_pkey" PRIMARY KEY ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_user_id_key" ON "staff"("user_id");

-- AddForeignKey
ALTER TABLE "project_staffs" ADD CONSTRAINT "project_staffs_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
