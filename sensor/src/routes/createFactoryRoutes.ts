import { Router } from "express";
import type { FactoryController } from "../controllers/factoryController.js";

export function createFactoryRoutes(factoryController: FactoryController) {
  const router = Router();
  router.get("/", factoryController.getFactories);
  return router;
}
