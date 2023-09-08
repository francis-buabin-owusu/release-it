-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,
    "business_manager_id" INTEGER NOT NULL,
    "technical_manager_id" INTEGER NOT NULL,
    "project_confirmation_status" BOOLEAN NOT NULL DEFAULT false,
    "project_status" "Project_Status" NOT NULL DEFAULT 'Not_Started',
    "project_staffing_status" "Project_Staffing_Status" NOT NULL DEFAULT 'Not_Started',
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "archived_at" TIMESTAMP(3),
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "suspensionReason" TEXT NOT NULL,
    "terminationReason" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_name_key" ON "project"("name");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_requirements" ADD CONSTRAINT "project_requirements_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_staffs" ADD CONSTRAINT "project_staffs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
