-- CreateTable
CREATE TABLE "staff" (
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "project_staffs" (
    "project_id" INTEGER NOT NULL,
    "staff_id" INTEGER NOT NULL,

    CONSTRAINT "project_staffs_pkey" PRIMARY KEY ("project_id","staff_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_employee_id_key" ON "staff"("employee_id");

-- AddForeignKey
ALTER TABLE "project_staffs" ADD CONSTRAINT "project_staffs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_staffs" ADD CONSTRAINT "project_staffs_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
