/*
  Warnings:

  - The `project_staffing_status` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Project_Staffing_Status" AS ENUM ('Not_Started', 'Awaiting_Confirmation', 'Completed');

-- AlterTable
ALTER TABLE "project" DROP COLUMN "project_staffing_status",
ADD COLUMN     "project_staffing_status" "Project_Staffing_Status" NOT NULL DEFAULT 'Not_Started';

-- DropEnum
DROP TYPE "Project_StaffingStatus";
