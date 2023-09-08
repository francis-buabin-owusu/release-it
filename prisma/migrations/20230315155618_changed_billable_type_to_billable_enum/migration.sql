/*
  Warnings:

  - The `billable` column on the `project_staffs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Billable" AS ENUM ('Billable', 'Not_Billable');

-- AlterTable
ALTER TABLE "project_staffs" DROP COLUMN "billable",
ADD COLUMN     "billable" "Billable" NOT NULL DEFAULT 'Not_Billable';
