/*
  Warnings:

  - You are about to drop the column `validator` on the `skill` table. All the data in the column will be lost.
  - Added the required column `validator_id` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skill" DROP COLUMN "validator",
ADD COLUMN     "validator_id" INTEGER NOT NULL;
