import express, { type Express } from "express";
import defaultDb from "./db";
import { authStub } from "./middleware/authStub";
import { cors } from "./middleware/cors";
import { errorHandler } from "./middleware/errorHandler";
import { createUnitsRouter } from "./routes/units";
import type { Queryable } from "./types/database";

interface AppOptions {
  db?: Queryable;
}

export function createApp(
  { db = defaultDb as unknown as Queryable }: AppOptions = {},
): Express {
  const app = express();

  app.use(cors);
  app.use(express.json());
  app.use(authStub);
  app.use("/api/units", createUnitsRouter(db));
  app.use(errorHandler);

  return app;
}
