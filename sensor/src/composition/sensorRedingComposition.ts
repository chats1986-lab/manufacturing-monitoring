import { SensorReadingController } from "../controllers/sensorReadingController.js";
import { prisma } from "../database/prisma.js";
import { SensorReadingRepository } from "../repositories/SensorReadingRepository.js";
import { QueueService } from "../services/queueService.js";
import { SensorReadingService } from "../services/sensorReadingService.js";
import { WorkerService } from "../workers/workerService.js";

const sensorReadingRepository = new SensorReadingRepository(prisma);
const queueService = new QueueService();
const sensorReadingService = new SensorReadingService(
  sensorReadingRepository,
  queueService,
);
const sensorReadingController = new SensorReadingController(
  sensorReadingService,
);
const workerService = new WorkerService(queueService, sensorReadingRepository);

export { sensorReadingController, workerService };
