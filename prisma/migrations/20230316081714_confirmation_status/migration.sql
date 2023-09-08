/*
  Warnings:

  - You are about to drop the column `confirmated` on the `project_staffs` table. All the data in the column will be lost.
  - Added the required column `confirmation_status` to the `project_staffs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Confirmation_Status" AS ENUM ('Confirmed', 'Unconfirmed');

-- AlterTable
ALTER TABLE "project_staffs" DROP COLUMN "confirmated",
ADD COLUMN     "confirmation_status" "Confirmation_Status" NOT NULL;
