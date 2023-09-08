/*
  Warnings:

  - Added the required column `validator` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skill" ADD COLUMN     "validator" INTEGER NOT NULL;
