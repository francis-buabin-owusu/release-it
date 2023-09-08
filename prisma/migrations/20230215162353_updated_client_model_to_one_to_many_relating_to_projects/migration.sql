/*
  Warnings:

  - You are about to drop the `_clientToproject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_clientToproject" DROP CONSTRAINT "_clientToproject_A_fkey";

-- DropForeignKey
ALTER TABLE "_clientToproject" DROP CONSTRAINT "_clientToproject_B_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "clientId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_clientToproject";

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
