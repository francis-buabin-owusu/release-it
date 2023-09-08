/*
  Warnings:

  - Changed the type of `project_status` on the `project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Project_Status" AS ENUM ('Not_Started', 'In_Progress', 'Completed', 'Suspended', 'Terminated');

-- AlterTable
ALTER TABLE "project" DROP COLUMN "project_status",
ADD COLUMN     "project_status" "Project_Status" NOT NULL;
