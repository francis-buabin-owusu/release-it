/*
  Warnings:

  - The `updated_by` column on the `client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `created_at` on table `client` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `created_by` on the `client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "client" ALTER COLUMN "created_at" SET NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER;
