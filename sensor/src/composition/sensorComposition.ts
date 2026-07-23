import { SensorController } from "../controllers/sensorController.js";
import { prisma } from "../database/prisma.js";
import { SensorRepository } from "../repositories/sensorRepository.js";
import { SensorService } from "../services/sensorService.js";

const sensorRepository = new SensorRepository(prisma);
const sensorService = new SensorService(sensorRepository);
const sensorController = new SensorController(sensorService);

export { sensorController };
