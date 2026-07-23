import type { Request, Response } from "express";
import type { SensorReading } from "../types/sensorReading.js";
import type { SensorReadingService } from "../services/sensorReadingService.js";

export class SensorReadingController {
  constructor(private sensorReadingService: SensorReadingService) {}

  fetchAllSensorReadings = async (req: Request, res: Response) => {
    const result = await this.sensorReadingService.fetchAllSensorReadings();
    return res.status(200).json({
      message: "Sensor readings retreived successfully",
      data: result,
    });
  };

  fetchBySensorId = async (req: Request, res: Response) => {
    const sensorId = req.params.sensorId as string;
    const result = await this.sensorReadingService.fetchBySensorId(sensorId);
    return res.status(200).json({
      message: `Sensor reading retrieved for the given printer Id: ${sensorId}`,
      data: result,
    });
  };

  fetchLatestReading = async (req: Request, res: Response) => {
    const sensorId = req.params.sensorId as string;
    const result = await this.sensorReadingService.fetchLatestReading(sensorId);
    return res.status(200).json({
      message: "Latest sensor reading retreieved successfully",
      data: result,
    });
  };

  // trackReadingStatus = async (req: Request, res: Response) => {
  //   const id = req.params.printerId as string;
  //   const result = await this.sensorService.trackReadingStatus(id);

  //   if (result) {
  //     return res.status(200).json({
  //       message: "Sensor reading saved to DB",
  //       data: result,
  //     });
  //   } else {
  //     return res.status(404).json({
  //       message: `Sensor readings for given printer id ${id} not found in the system`,
  //     });
  //   }
  // };

  createSensorReading = async (req: Request, res: Response) => {
    const reading: SensorReading = req.body;
    const result = await this.sensorReadingService.createSensorReading(reading);
    return res.status(201).json({
      message: "Sensor readings persisted to DB successfully",
      data: result,
    });
  };

  createBatchSensorReading = async (req: Request, res: Response) => {
    const readings: SensorReading[] = req.body;
    const result =
      await this.sensorReadingService.createBatchSensorReading(readings);

    return res.status(202).json({
      message:
        "Sensor readings are successfully accpeted and will soon be persisted to DB",
      data: result,
    });
  };
}
