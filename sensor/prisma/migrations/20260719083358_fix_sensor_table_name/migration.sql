/*
  Warnings:

  - You are about to drop the ` sensors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE " sensors" DROP CONSTRAINT " sensors_printerId_fkey";

-- DropForeignKey
ALTER TABLE "sensor_readings" DROP CONSTRAINT "sensor_readings_sensorId_fkey";

-- DropTable
DROP TABLE " sensors";

-- CreateTable
CREATE TABLE "sensors" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "printerId" TEXT NOT NULL,

    CONSTRAINT "sensors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sensors_serialNumber_key" ON "sensors"("serialNumber");

-- AddForeignKey
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "printers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
