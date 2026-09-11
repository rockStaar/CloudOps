-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "lastChecked" TIMESTAMP(3),
ADD COLUMN     "responseTime" INTEGER;
