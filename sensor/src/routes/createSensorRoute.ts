import type { SensorController } from "../controllers/sensorController.js";
import { Router } from "express";
export function createSensorRoute(sensorController: SensorController) {
  const router = Router();

  // router.get("/", sensorController.);

  return router;
}
