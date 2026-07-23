import { describe, expect, it, vi } from "vitest";
import { FactoryController } from "../../../controllers/factoryController.js";
import type { Request, Response } from "express";

describe("FactoryController", () => {
  it("returns all factories", async () => {
    const factories = [{ id: "1", name: "Factory A" }];

    const mockFactoryService = {
      getFactories: vi.fn().mockResolvedValue(factories),
    };

    const controller = new FactoryController(mockFactoryService as any);
    const req = {} as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any as Response;

    // Act
    await controller.getFactories(req, res);

    expect(mockFactoryService.getFactories).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Factory information obtained successfully",
      data: factories,
    });
  });
});
