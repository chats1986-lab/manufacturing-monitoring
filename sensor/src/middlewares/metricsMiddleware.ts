import { httpRequestCounter } from "../observability/metrics.js";
import type { Request, Response, NextFunction } from "express";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path ?? req.path,
      status: res.statusCode,
    });
  });

  next();
}
