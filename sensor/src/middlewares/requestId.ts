import type { Request, Response, NextFunction } from "express";

export function requestId(req: Request, res: Response, next: NextFunction) {
  if (typeof req.id === "string") {
    res.setHeader("x-request-id", req.id);
  }

  next();
}
