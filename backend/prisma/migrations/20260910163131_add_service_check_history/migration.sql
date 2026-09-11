-- CreateTable
CREATE TABLE "ServiceCheck" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "responseTime" INTEGER,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceCheck_serviceId_checkedAt_idx" ON "ServiceCheck"("serviceId", "checkedAt");

-- AddForeignKey
ALTER TABLE "ServiceCheck" ADD CONSTRAINT "ServiceCheck_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
