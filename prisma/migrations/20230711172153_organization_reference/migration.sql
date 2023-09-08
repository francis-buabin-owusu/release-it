/*
  Warnings:

  - You are about to drop the `Office` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Office";

-- CreateTable
CREATE TABLE "office" (
    "id" SERIAL NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "office_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "website" TEXT,
    "phone_number" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "update_by" INTEGER,
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "archived_at" TIMESTAMP(3),

    CONSTRAINT "office_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "office" ADD CONSTRAINT "office_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
