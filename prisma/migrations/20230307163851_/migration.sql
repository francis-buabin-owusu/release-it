-- CreateTable
CREATE TABLE "employee_registry" (
    "user_id" INTEGER NOT NULL,
    "employee_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "employee_type" TEXT NOT NULL,
    "employee_status" TEXT NOT NULL,

    CONSTRAINT "employee_registry_pkey" PRIMARY KEY ("user_id")
);
