/*
  Warnings:

  - You are about to drop the column `client_email` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `client_phone` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "client_email",
DROP COLUMN "client_phone";
