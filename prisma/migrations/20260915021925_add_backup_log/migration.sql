-- CreateTable
CREATE TABLE "backup_logs" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "lastBackupAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "backup_logs_pkey" PRIMARY KEY ("id")
);
