import type { SensorReadingRepository } from "../repositories/SensorReadingRepository.js";
import type { QueueService } from "../services/queueService.js";

const BATCH_SIZE = 5;
const PROCESS_INTERVAL_MS = 1000;

export class WorkerService {
  constructor(
    private queueService: QueueService,
    private sensorReadingRepository: SensorReadingRepository,
  ) {}

  start() {
    setInterval(async () => {
      try {
        await this.processBatch();
      } catch (err) {
        console.error(err);
      }
    }, PROCESS_INTERVAL_MS);
  }

  async processBatch() {
    // console.log("Process batch initiated!");
    const batch = this.queueService.peekBatch(BATCH_SIZE);

    if (batch.length === 0) {
      return;
    }

    try {
      await this.sensorReadingRepository.saveBatch(batch);
      this.queueService.removeBatch(batch);
      console.log("Batch sensor readings persisted successfully in DB");
    } catch (err) {
      console.log("Failed persist the batch in DB", err);
    }
  }
}
