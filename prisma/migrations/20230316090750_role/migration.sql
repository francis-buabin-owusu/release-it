/*
  Warnings:

  - Added the required column `role` to the `project_staffs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Team_Lead', 'Member', 'Backup');

-- AlterTable
ALTER TABLE "project_staffs" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "confirmation_status" SET DEFAULT 'Unconfirmed';
