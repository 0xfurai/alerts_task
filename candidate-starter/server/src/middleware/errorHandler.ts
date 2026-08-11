import type { ErrorRequestHandler } from "express";

interface HttpError extends Error {
  status?: number;
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
) => {
  const httpError: HttpError =
    error instanceof Error ? error : new Error("Unknown server error");
  const status = httpError.status ?? 500;

  if (status >= 500) {
    console.error(httpError);
  }

  res.status(status).json({
    error: status >= 500 ? "Internal server error" : httpError.message,
  });
};
