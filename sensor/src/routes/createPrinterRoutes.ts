import { Router } from "express";
import type { PrinterController } from "../controllers/printerController.js";

export function createPrinterRoutes(printerController: PrinterController) {
  const router = Router();

  router.get("/:printerId/dashboard", printerController.getDashboard);
  return router;
}
