/*
  Warnings:

  - You are about to drop the `position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project_requirements" DROP CONSTRAINT "project_requirements_position_id_fkey";

-- DropTable
DROP TABLE "position";
