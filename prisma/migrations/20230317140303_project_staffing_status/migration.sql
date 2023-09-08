-- CreateEnum
CREATE TYPE "StaffingStatus" AS ENUM ('Not_Started', 'Awaiting_Confirmation', 'Completed');

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "project_staffing_status" "StaffingStatus" NOT NULL DEFAULT 'Not_Started';
