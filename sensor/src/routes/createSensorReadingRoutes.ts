import { Router } from "express";
import type { SensorReadingController } from "../controllers/sensorReadingController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export function createSensorReadingRoutes(
  sensorReadingController: SensorReadingController,
) {
  const router = Router();

  router.post(
    "/batch",
    asyncHandler(sensorReadingController.createBatchSensorReading),
  );
  router.get(
    "/:sensorId/latest",
    asyncHandler(sensorReadingController.fetchLatestReading),
  );
  router.get(
    "/:sensorId/readings",
    asyncHandler(sensorReadingController.fetchBySensorId),
  );

  // router.get(
  //   "/:printerId/status",
  //   asyncHandler(sensorController.trackReadingStatus),
  // );
  router.get("/", asyncHandler(sensorReadingController.fetchAllSensorReadings));
  // router.post("/", asyncHandler(sensorController.createSensorReading));
  return router;
}
