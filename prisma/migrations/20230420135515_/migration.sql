/*
  Warnings:

  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_client_id_fkey";

-- DropForeignKey
ALTER TABLE "project_requirements" DROP CONSTRAINT "project_requirements_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_staffs" DROP CONSTRAINT "project_staffs_project_id_fkey";

-- DropTable
DROP TABLE "project";
