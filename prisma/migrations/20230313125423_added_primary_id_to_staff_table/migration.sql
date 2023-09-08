/*
  Warnings:

  - You are about to drop the column `staff_id` on the `project_staffs` table. All the data in the column will be lost.
  - The primary key for the `required_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `staff` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "project_staffs" DROP CONSTRAINT "project_staffs_staff_id_fkey";

-- AlterTable
ALTER TABLE "project_staffs" DROP COLUMN "staff_id";

-- AlterTable
ALTER TABLE "required_skills" DROP CONSTRAINT "required_skills_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "required_skills_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "staff" DROP CONSTRAINT "staff_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "staff_pkey" PRIMARY KEY ("id");
