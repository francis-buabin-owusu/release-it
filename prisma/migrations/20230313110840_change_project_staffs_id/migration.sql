/*
  Warnings:

  - The primary key for the `project_staffs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `project_staff_id` on the `project_staffs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "project_staffs_project_staff_id_key";

-- AlterTable
ALTER TABLE "project_staffs" DROP CONSTRAINT "project_staffs_pkey",
DROP COLUMN "project_staff_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "project_staffs_pkey" PRIMARY KEY ("id");
