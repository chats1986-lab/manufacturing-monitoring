import type { Request, Response } from "express";
import type { FactoryService } from "../services/factoryService.js";

export class FactoryController {
  constructor(private factoryService: FactoryService) {}

  getFactories = async (req: Request, res: Response) => {
    const factories = await this.factoryService.getFactories();

    return res.status(200).json({
      message: "Factory information obtained successfully",
      data: factories,
    });
  };
}
