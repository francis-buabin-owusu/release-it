/*
  Warnings:

  - You are about to drop the `_projectTospecialization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_projectTospecialization" DROP CONSTRAINT "_projectTospecialization_A_fkey";

-- DropForeignKey
ALTER TABLE "_projectTospecialization" DROP CONSTRAINT "_projectTospecialization_B_fkey";

-- DropTable
DROP TABLE "_projectTospecialization";

-- CreateTable
CREATE TABLE "position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_requirements" (
    "project_id" INTEGER NOT NULL,
    "specialization_id" INTEGER NOT NULL,
    "required_skills_id" SERIAL NOT NULL,
    "position_id" INTEGER NOT NULL,
    "employees_required" INTEGER NOT NULL,

    CONSTRAINT "project_requirements_pkey" PRIMARY KEY ("project_id","specialization_id","position_id")
);

-- CreateTable
CREATE TABLE "required_skills" (
    "required_skills_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "required_skills_pkey" PRIMARY KEY ("required_skills_id","skill_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_requirements_required_skills_id_key" ON "project_requirements"("required_skills_id");

-- AddForeignKey
ALTER TABLE "project_requirements" ADD CONSTRAINT "project_requirements_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_requirements" ADD CONSTRAINT "project_requirements_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_requirements" ADD CONSTRAINT "project_requirements_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_skills" ADD CONSTRAINT "required_skills_required_skills_id_fkey" FOREIGN KEY ("required_skills_id") REFERENCES "project_requirements"("required_skills_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_skills" ADD CONSTRAINT "required_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
