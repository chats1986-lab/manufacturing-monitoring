import { logger } from "../observability/logger.js";
import type { PrinterRepository } from "../repositories/printerRepository.js";
import type { SensorService } from "./sensorService.js";

export class PrinterService {
  constructor(
    private printerRepository: PrinterRepository,
    private sensorService: SensorService,
  ) {}

  getDashboard = async (printerId: string) => {
    const printer = await this.printerRepository.findById(printerId);
    logger.info({ printerId }, "Fetching printer dashboard");
    const sensors = await this.sensorService.getSensorsByPrinterId(printerId);
    logger.info(
      {
        printerId,
        sensorCount: sensors.length,
      },
      "Printer dashboard assembled successfully",
    );

    return {
      printer,
      sensors,
    };
  };
}
