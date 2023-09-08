/*
  Warnings:

  - You are about to alter the column `project_hours` on the `project_staffs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "project_staffs" ALTER COLUMN "project_hours" SET DATA TYPE INTEGER;
