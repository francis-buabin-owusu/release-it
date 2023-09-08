-- CreateTable
CREATE TABLE "skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_skillTospecialization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_skillTospecialization_AB_unique" ON "_skillTospecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_skillTospecialization_B_index" ON "_skillTospecialization"("B");

-- AddForeignKey
ALTER TABLE "_skillTospecialization" ADD CONSTRAINT "_skillTospecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_skillTospecialization" ADD CONSTRAINT "_skillTospecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
