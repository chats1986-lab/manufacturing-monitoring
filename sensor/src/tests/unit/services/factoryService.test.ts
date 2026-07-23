import { describe, it, expect, vi } from "vitest";
import { FactoryService } from "../../../services/factoryService.js";

describe("FactoryService", () => {
  it("returns all factories", async () => {
    // Mock
    const factories = [{ id: "1", name: "Factory A" }];
    const mockRepository = {
      findAllWithPrinters: vi.fn().mockResolvedValue(factories),
    };

    // Actual Service
    const service = new FactoryService(mockRepository as any);
    const result = await service.getFactories();

    expect(result).toEqual(factories);
    expect(mockRepository.findAllWithPrinters).toHaveBeenCalledOnce();
  });
});
