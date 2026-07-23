import { FactoryController } from "../controllers/factoryController.js";
import { prisma } from "../database/prisma.js";
import { FactoryRepository } from "../repositories/factoryRepository.js";
import { FactoryService } from "../services/factoryService.js";

const factoryRepository = new FactoryRepository(prisma);

const factoryService = new FactoryService(factoryRepository);
const factoryController = new FactoryController(factoryService);

export { factoryController };
