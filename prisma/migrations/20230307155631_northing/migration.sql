/*
  Warnings:

  - Made the column `role` on table `project_staffs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project_staffs" ALTER COLUMN "role" SET NOT NULL;
