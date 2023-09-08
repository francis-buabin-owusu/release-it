/*
  Warnings:

  - You are about to drop the column `time_zone` on the `client` table. All the data in the column will be lost.
  - Added the required column `time_zone` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "time_zone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "client" DROP COLUMN "time_zone";
