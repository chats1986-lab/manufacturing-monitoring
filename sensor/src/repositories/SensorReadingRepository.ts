import type { PrismaClient } from "../generated/prisma/client.js";

export class SensorReadingRepository {
  constructor(private prisma: PrismaClient) {}

  async fetchAll() {
    return this.prisma.sensorReading.findMany({
      orderBy: {
        recordedAt: "desc",
      },
    });
  }

  async fetchBySensorId(sensorId: string) {
    return this.prisma.sensorReading.findMany({
      where: {
        sensorId,
      },
      orderBy: {
        recordedAt: "desc",
      },
    });
  }

  async fetchLatestBySensorId(sensorId: string) {
    return this.prisma.sensorReading.findFirst({
      where: {
        sensorId,
      },
      orderBy: {
        recordedAt: "desc",
      },
    });
  }

  async save(reading: { sensorId: string; value: number }) {
    return this.prisma.sensorReading.create({
      data: {
        sensorId: reading.sensorId,
        value: reading.value,
      },
    });
  }

  async saveBatch(
    readings: {
      sensorId: string;
      value: number;
    }[],
  ) {
    return this.prisma.sensorReading.createMany({
      data: readings,
    });
  }
}
