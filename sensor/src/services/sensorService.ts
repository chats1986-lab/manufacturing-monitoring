import { logger } from "../observability/logger.js";
import type { SensorRepository } from "../repositories/sensorRepository.js";

export class SensorService {
  constructor(private sensorRepository: SensorRepository) {}

  getSensorsByPrinterId = async (printerId: string) => {
    logger.info({ printerId }, "Fetching sensors for printer");
    return this.sensorRepository.findByPrinterId(printerId);
  };
}
