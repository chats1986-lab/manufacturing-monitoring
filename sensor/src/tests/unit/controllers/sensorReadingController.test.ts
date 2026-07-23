import { describe, expect, it, vi } from "vitest";
import { SensorReadingController } from "../../../controllers/sensorReadingController.js";
import type { Request, Response } from "express";

describe("SensorReadingController", () => {
  it("returns sensor readings", async () => {
    const sensors = [{ id: "s1" }];
    const mockSensorReadingService = {
      fetchAllSensorReadings: vi.fn().mockResolvedValue(sensors),
    };

    const controller = new SensorReadingController(
      mockSensorReadingService as any,
    );
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any as Response;

    await controller.fetchAllSensorReadings(req, res);

    expect(
      mockSensorReadingService.fetchAllSensorReadings,
    ).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Sensor readings retreived successfully",
      data: sensors,
    });
  });

  it("returns a sensor", async () => {
    const sensors = { id: "s1" };
    const mockSensorReadingService = {
      fetchBySensorId: vi.fn().mockResolvedValue(sensors),
    };

    const controller = new SensorReadingController(
      mockSensorReadingService as any,
    );
    const req = {
      params: {
        sensorId: "1",
      },
    } as any as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any as Response;

    await controller.fetchBySensorId(req, res);

    expect(mockSensorReadingService.fetchBySensorId).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Sensor reading retrieved for the given printer Id: 1",
      data: sensors,
    });
  });

  it("return latest sensor reading", async () => {
    const sensor = { id: "s1" };
    const mockSensorReadingService = {
      fetchLatestReading: vi.fn().mockResolvedValue(sensor),
    };

    const controller = new SensorReadingController(
      mockSensorReadingService as any,
    );
    const req = {
      params: {
        sensorId: "1",
      },
    } as any as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any as Response;

    await controller.fetchLatestReading(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Latest sensor reading retreieved successfully",
      data: sensor,
    });
  });
});
