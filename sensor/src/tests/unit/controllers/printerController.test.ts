import { describe, expect, it, vi } from "vitest";
import { PrinterController } from "../../../controllers/printerController.js";

describe("PrinterController", () => {
  it("returns all printers", async () => {
    const dashboard = {
      printer: { id: "1", name: "Printer A" },
      sensors: [{ id: "s1" }],
    };

    const mockPrinterService = {
      getDashboard: vi.fn().mockResolvedValue(dashboard),
    };

    const controller = new PrinterController(mockPrinterService as any);

    const req = {
      params: {
        printerId: "1",
      },
      log: {
        info: vi.fn(),
        error: vi.fn(),
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await controller.getDashboard(req, res);

    expect(mockPrinterService.getDashboard).toHaveBeenCalledOnce();

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: "Printer retrieved successfully",
      data: dashboard,
    });
  });
});
