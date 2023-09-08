-- AlterTable
ALTER TABLE "project_staffs" ADD COLUMN     "active" BOOLEAN,
ADD COLUMN     "project_end_date" TIMESTAMP(3),
ADD COLUMN     "project_start_date" TIMESTAMP(3);
