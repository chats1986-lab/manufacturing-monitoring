import type { SensorReading } from "../types/sensorReading.js";

export class QueueService {
  private queue: SensorReading[] = [];

  enqueue(reading: SensorReading) {
    this.queue.push(reading);
  }

  peekBatch(size: number) {
    return this.queue.slice(0, size);
  }

  removeBatch(readings: SensorReading[]) {
    this.queue = this.queue.filter(
      (queueReading) => !readings.includes(queueReading),
    );
  }

  size() {
    return this.queue.length;
  }

  trackStatus(id: string) {
    return this.queue.find((reading) => reading.sensorId === id);
  }
}
