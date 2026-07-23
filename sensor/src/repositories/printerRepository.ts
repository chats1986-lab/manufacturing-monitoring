import type { PrismaClient } from "../generated/prisma/client.js";
import { logger } from "../observability/logger.js";

export class PrinterRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(printerId: string) {
    logger.info({ printerId }, "Querying printer by id");
    const printer = this.prisma.printer.findUnique({
      where: {
        id: printerId,
      },
    });

    logger.info(
      {
        printerId,
        found: printer !== null,
      },
      "Printer query completed",
    );

    return printer;
  }
}
