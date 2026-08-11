import express, { type Express } from "express";
import defaultDb from "./db";
import { authStub } from "./middleware/authStub";
import { errorHandler } from "./middleware/errorHandler";
import { createAlertsRouter } from "./routes/alerts";
import type { Queryable } from "./types/database";

interface AppOptions {
  db?: Queryable;
}

export function createApp(
  { db = defaultDb as unknown as Queryable }: AppOptions = {},
): Express {
  const app = express();

  app.use(express.json());
  app.use(authStub);
  app.use("/api/alerts", createAlertsRouter(db));
  app.use(errorHandler);

  return app;
}
