-- CreateTable
CREATE TABLE "Office" (
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

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);
