/*
  Warnings:

  - The primary key for the `project_requirements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `required_skills_id` on the `project_requirements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "required_skills" DROP CONSTRAINT "required_skills_required_skills_id_fkey";

-- DropIndex
DROP INDEX "project_requirements_required_skills_id_key";

-- AlterTable
ALTER TABLE "project_requirements" DROP CONSTRAINT "project_requirements_pkey",
DROP COLUMN "required_skills_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "project_requirements_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "required_skills" ADD CONSTRAINT "required_skills_required_skills_id_fkey" FOREIGN KEY ("required_skills_id") REFERENCES "project_requirements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
