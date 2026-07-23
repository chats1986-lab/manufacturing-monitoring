-- CreateTable
CREATE TABLE "printers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "factoryId" TEXT NOT NULL,

    CONSTRAINT "printers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "printers_serialNumber_key" ON "printers"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "printers_factoryId_name_key" ON "printers"("factoryId", "name");

-- AddForeignKey
ALTER TABLE "printers" ADD CONSTRAINT "printers_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "factories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
