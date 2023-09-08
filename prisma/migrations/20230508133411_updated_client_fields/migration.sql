/*
  Warnings:

  - You are about to drop the column `industry` on the `client` table. All the data in the column will be lost.
  - Added the required column `currency` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_zone` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "industry",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isOrganization" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "time_zone" TEXT NOT NULL,
ALTER COLUMN "logo" DROP NOT NULL;

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "state_region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank" (
    "id" SERIAL NOT NULL,
    "bank_name" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "swift_key" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_contact_person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "client_contact_person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_client_id_key" ON "address"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_client_id_key" ON "bank"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "client_contact_person_client_id_key" ON "client_contact_person"("client_id");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank" ADD CONSTRAINT "bank_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_contact_person" ADD CONSTRAINT "client_contact_person_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
