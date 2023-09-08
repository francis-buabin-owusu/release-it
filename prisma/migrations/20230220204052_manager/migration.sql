/*
  Warnings:

  - You are about to drop the column `clientId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `manager` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `technical_manager` on the `project` table. All the data in the column will be lost.
  - Added the required column `business_manager_id` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technical_manager_id` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_clientId_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "clientId",
DROP COLUMN "manager",
DROP COLUMN "technical_manager",
ADD COLUMN     "business_manager_id" INTEGER NOT NULL,
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD COLUMN     "technical_manager_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
