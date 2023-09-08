/*
  Warnings:

  - Added the required column `project_hours` to the `project_staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `project_staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_staffs" ADD COLUMN     "billable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "confirmated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "project_hours" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
