import { randomUUID } from "crypto";
import pinoHttp from "pino-http";

import { logger } from "../observability/logger.js";

export const requestLogger = pinoHttp.default({
  logger,

  genReqId(req) {
    const existingId = req.headers["x-request-id"];

    if (typeof existingId === "string") {
      return existingId;
    }

    return randomUUID();
  },

  customProps() {
    return {
      service: "sensor-api",
    };
  },
});
