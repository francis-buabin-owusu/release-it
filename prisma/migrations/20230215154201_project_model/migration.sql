-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manager" INTEGER NOT NULL,
    "technical_manager" INTEGER NOT NULL,
    "project_status" BOOLEAN NOT NULL DEFAULT false,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_clientToproject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_projectTospecialization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_clientToproject_AB_unique" ON "_clientToproject"("A", "B");

-- CreateIndex
CREATE INDEX "_clientToproject_B_index" ON "_clientToproject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_projectTospecialization_AB_unique" ON "_projectTospecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_projectTospecialization_B_index" ON "_projectTospecialization"("B");

-- AddForeignKey
ALTER TABLE "_clientToproject" ADD CONSTRAINT "_clientToproject_A_fkey" FOREIGN KEY ("A") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_clientToproject" ADD CONSTRAINT "_clientToproject_B_fkey" FOREIGN KEY ("B") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_projectTospecialization" ADD CONSTRAINT "_projectTospecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_projectTospecialization" ADD CONSTRAINT "_projectTospecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
