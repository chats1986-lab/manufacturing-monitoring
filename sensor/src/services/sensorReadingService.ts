import { ApiError } from "../errors/apiError.js";
import type { SensorReadingRepository } from "../repositories/SensorReadingRepository.js";
import type { SensorReading } from "../types/sensorReading.js";
import type { QueueService } from "./queueService.js";

export class SensorReadingService {
  constructor(
    private sensorReadingRepository: SensorReadingRepository,
    private queueService: QueueService,
  ) {}

  fetchAllSensorReadings = async () => {
    const result = await this.sensorReadingRepository.fetchAll();
    return result;
  };

  fetchBySensorId = async (sensorId: string) => {
    if (!sensorId) {
      throw new ApiError("Sensor Id is mandatory", 400);
    }
    const result = await this.sensorReadingRepository.fetchBySensorId(sensorId);

    if (!result) {
      throw new ApiError(
        `Sensor readings not found for the given sensor id: ${sensorId}`,
        404,
      );
    }
    return result;
  };

  fetchLatestReading = async (sensorId: string) => {
    if (!sensorId) {
      throw new ApiError("Sensor Id is mandatory", 400);
    }

    const result =
      await this.sensorReadingRepository.fetchLatestBySensorId(sensorId);
    if (!result) {
      throw new ApiError(`No readings found for sensor: ${sensorId}`, 404);
    }
    return result;
  };

  // trackReadingStatus = async (id: string) => {
  //   if (!id) {
  //     throw new ApiError("Printer Id is mandatory", 400);
  //   }
  //   const result = this.sensorRepository.fetchById(id);
  //   if (!result) {
  //     if (!this.queueService.trackStatus(id)) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  //   return result;
  // };

  private validateSensorReading(reading: SensorReading): void {
    if (reading.value < 0) {
      throw new ApiError("Sensor value cannot be negative", 400);
    }
  }

  createSensorReading = async (reading: SensorReading) => {
    if (!reading) {
      throw new ApiError("Reading cannot be empty", 400);
    }
    this.validateSensorReading(reading);
    await this.sensorReadingRepository.save(reading);
    return reading;
  };

  createBatchSensorReading = async (readings: SensorReading[]) => {
    if (readings.length == 0) {
      throw new ApiError("Sensor readings input is invalid", 400);
    }

    for (const reading of readings) {
      this.validateSensorReading(reading);
      this.queueService.enqueue(reading);
    }

    return readings;
  };
}
