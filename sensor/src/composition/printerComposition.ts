import { PrinterController } from "../controllers/printerController.js";
import { prisma } from "../database/prisma.js";
import { PrinterRepository } from "../repositories/printerRepository.js";
import { SensorRepository } from "../repositories/sensorRepository.js";
import { PrinterService } from "../services/printerService.js";
import { SensorService } from "../services/sensorService.js";

const sensorRepository = new SensorRepository(prisma);
const sensorService = new SensorService(sensorRepository);

const printerRepository = new PrinterRepository(prisma);
const printerService = new PrinterService(printerRepository, sensorService);
const printerController = new PrinterController(printerService);

export { printerController };
