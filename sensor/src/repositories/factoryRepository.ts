import type { PrismaClient } from "../generated/prisma/client.js";

export class FactoryRepository {
  constructor(private prisma: PrismaClient) {}

  findAllWithPrinters = async () => {
    return this.prisma.factory.findMany({
      include: {
        printers: true,
      },
    });
  };

  findById = async (factoryId: string) => {
    return this.prisma.factory.findUnique({
      where: {
        id: factoryId,
      },
      include: {
        printers: true,
      },
    });
  };
}
