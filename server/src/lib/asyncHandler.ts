import type { RequestHandler } from "express";

export function asyncHandler(handler: RequestHandler): RequestHandler {
  return function handleAsync(req, res, next): void {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
