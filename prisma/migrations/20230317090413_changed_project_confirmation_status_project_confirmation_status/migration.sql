/*
  Warnings:

  - The `project_confirmation_status` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "project_confirmation_status",
ADD COLUMN     "project_confirmation_status" BOOLEAN NOT NULL DEFAULT false;
