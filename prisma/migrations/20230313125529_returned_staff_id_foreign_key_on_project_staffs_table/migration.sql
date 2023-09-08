/*
  Warnings:

  - Added the required column `staff_id` to the `project_staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_staffs" ADD COLUMN     "staff_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "project_staffs" ADD CONSTRAINT "project_staffs_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
