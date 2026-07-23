/*
  Warnings:

  - You are about to drop the column `createdAt` on the `sensor_readings` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `sensor_readings` table. All the data in the column will be lost.
  - You are about to drop the column `printerId` on the `sensor_readings` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `sensor_readings` table. All the data in the column will be lost.
  - You are about to drop the column `vibration` on the `sensor_readings` table. All the data in the column will be lost.
  - Added the required column `sensorId` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sensor_readings" DROP CONSTRAINT "sensor_readings_printerId_fkey";

-- DropIndex
DROP INDEX "sensor_readings_printerId_createdAt_idx";

-- AlterTable
ALTER TABLE "sensor_readings" DROP COLUMN "createdAt",
DROP COLUMN "humidity",
DROP COLUMN "printerId",
DROP COLUMN "temperature",
DROP COLUMN "vibration",
ADD COLUMN     "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sensorId" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE " sensors" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "printerId" TEXT NOT NULL,

    CONSTRAINT " sensors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX " sensors_serialNumber_key" ON " sensors"("serialNumber");

-- CreateIndex
CREATE INDEX "sensor_readings_sensorId_recordedAt_idx" ON "sensor_readings"("sensorId", "recordedAt");

-- AddForeignKey
ALTER TABLE " sensors" ADD CONSTRAINT " sensors_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "printers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES " sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
