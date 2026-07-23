import type { Request, Response } from "express";
import type { PrinterService } from "../services/printerService.js";

export class PrinterController {
  constructor(private printerService: PrinterService) {}
  getDashboard = async (req: Request, res: Response) => {
    console.log("PrinterController.getDashboard called");

    const printerId = req.params.printerId as string;

    req.log.info({ printerId }, "Dashboard request received");

    const result = await this.printerService.getDashboard(printerId);

    req.log.info({ printerId }, "Dashboard retreived successfully");

    return res.status(200).json({
      message: "Printer retrieved successfully",
      data: result,
    });
  };
}
