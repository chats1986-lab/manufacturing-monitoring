import { describe, expect, it, vi } from "vitest";
import { PrinterService } from "../../../services/printerService.js";

describe("PrinterService", () => {
  it("returns printer dashboard", async () => {
    const printer = { id: "1", name: "Industrial Printer 01" };
    const sensors = [{ id: "s1" }];

    const mockPrinterRepository = {
      findById: vi.fn().mockResolvedValue(printer),
    };

    const mockSensorService = {
      getSensorsByPrinterId: vi.fn().mockResolvedValue(sensors),
    };

    const service = new PrinterService(
      mockPrinterRepository as any,
      mockSensorService as any,
    );

    const result = await service.getDashboard("1");

    expect(result.printer).toEqual(printer);
    expect(result.sensors).toEqual(sensors);
    expect(mockPrinterRepository.findById).toHaveBeenCalledWith("1");
    expect(mockSensorService.getSensorsByPrinterId).toHaveBeenCalledWith("1");
  });
});
