-- AlterTable
ALTER TABLE "students" ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "students_classId_displayOrder_idx" ON "students"("classId", "displayOrder");
