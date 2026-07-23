import "dotenv/config";
import cors from "cors";
import express from "express";

import {
  sensorReadingController,
  workerService,
} from "./composition/sensorRedingComposition.js";
import { sensorController } from "./composition/sensorComposition.js";
import { factoryController } from "./composition/factoryComposition.js";
import { printerController } from "./composition/printerComposition.js";

import { metricsMiddleware } from "./middlewares/metricsMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import { createFactoryRoutes } from "./routes/createFactoryRoutes.js";
import { createPrinterRoutes } from "./routes/createPrinterRoutes.js";
import { createSensorRoute } from "./routes/createSensorRoute.js";
import { createSensorReadingRoutes } from "./routes/createSensorReadingRoutes.js";

import { register } from "./observability/metrics.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { logger } from "./observability/logger.js";
import { requestId } from "./middlewares/requestId.js";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(requestLogger);
app.use(requestId);
app.use(express.json()); // JSON parsing
app.use(express.urlencoded({ extended: true })); // HTML form submission

// Metrics middleware should come BEFORE routes
app.use(metricsMiddleware);

// Metrics endpoint
app.get("/metrics", async (_, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// API routes
app.use("/api/factories", createFactoryRoutes(factoryController));
app.use("/api/sensors", createSensorRoute(sensorController));
app.use(
  "/api/sensor-reading",
  createSensorReadingRoutes(sensorReadingController),
);
app.use("/api/printers", createPrinterRoutes(printerController));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(
    {
      port: PORT,
    },
    "API server started",
  );

  workerService.start();
});
