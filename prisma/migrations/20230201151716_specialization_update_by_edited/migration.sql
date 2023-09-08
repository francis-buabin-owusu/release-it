/*
  Warnings:

  - The `updated_by` column on the `specialization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `created_by` on the `specialization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "specialization" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER;
