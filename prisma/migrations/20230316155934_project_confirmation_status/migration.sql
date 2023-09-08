-- CreateEnum
CREATE TYPE "Project_Confirmation_Status" AS ENUM ('Confirmed', 'Tentative');

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "project_confirmation_status" "Project_Confirmation_Status" NOT NULL DEFAULT 'Tentative';
