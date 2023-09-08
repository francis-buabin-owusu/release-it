/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "created_by" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "project_name_key" ON "project"("name");
