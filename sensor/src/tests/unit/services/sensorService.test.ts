import { describe, expect, it, vi } from "vitest";
import { SensorService } from "../../../services/sensorService.js";

describe("SensorService", () => {
  it("returns sensors by printerId", async () => {
    const sensors = [{ id: "s1" }];
    const mockSensorRepository = {
      findByPrinterId: vi.fn().mockResolvedValue(sensors),
    };

    const service = new SensorService(mockSensorRepository as any);
    const result = await service.getSensorsByPrinterId("1");

    expect(result).toEqual(sensors);
    expect(mockSensorRepository.findByPrinterId).toHaveBeenCalledOnce();
    expect(mockSensorRepository.findByPrinterId).toHaveBeenCalledWith("1");
  });
});
