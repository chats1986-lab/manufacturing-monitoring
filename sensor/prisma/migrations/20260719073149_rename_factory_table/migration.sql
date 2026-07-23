/*
  Warnings:

  - You are about to drop the `Factory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Factory";

-- CreateTable
CREATE TABLE "factories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "factories_pkey" PRIMARY KEY ("id")
);
