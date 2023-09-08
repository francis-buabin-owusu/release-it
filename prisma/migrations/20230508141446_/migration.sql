/*
  Warnings:

  - You are about to drop the column `email` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `client` table. All the data in the column will be lost.
  - Added the required column `client_email` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_phone` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "client_email" TEXT NOT NULL,
ADD COLUMN     "client_phone" TEXT NOT NULL;
