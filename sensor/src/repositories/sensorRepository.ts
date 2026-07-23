import type { PrismaClient } from "../generated/prisma/client.js";
import { logger } from "../observability/logger.js";

export class SensorRepository {
  constructor(private prisma: PrismaClient) {}

  findByPrinterId = async (printerId: string) => {
    logger.info({ printerId }, "Querying sensors for printer");

    const sensors = await this.prisma.sensor.findMany({
      where: {
        printerId,
      },

      include: {
        readings: {
          orderBy: {
            recordedAt: "desc",
          },

          take: 20,
        },
      },
    });

    logger.info(
      {
        printerId,
        sensorCount: sensors.length,
      },
      "Sensors retrieved successfully",
    );

    return sensors;
  };
}
