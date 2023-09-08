/*
  Warnings:

  - A unique constraint covering the columns `[project_staff_id]` on the table `project_staffs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project_staffs" ADD COLUMN     "project_staff_id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "project_staffs_project_staff_id_key" ON "project_staffs"("project_staff_id");
