/*
  Warnings:

  - You are about to drop the column `billable` on the `project_staffs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project_staffs" DROP COLUMN "billable",
ADD COLUMN     "billability_status" "Billability_Status" NOT NULL DEFAULT 'Not_Billable';
