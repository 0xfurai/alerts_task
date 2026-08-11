import express, { type Router } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import type { Queryable } from "../types/database";

interface AlertRow {
  id: string;
  unit_id: string;
  unit_name: string;
  created_at: string | Date;
}

export function createAlertsRouter(db: Queryable): Router {
  const router = express.Router();

  router.get(
    "/",
    asyncHandler(async (_req, res) => {
      try {
        const result = await db.query<AlertRow>(`
            SELECT
              alert.id,
              alert.unit_id,
              unit.name AS unit_name,
              alert.created_at
            FROM alerts AS alert
            JOIN units AS unit ON unit.id = alert.unit_id
            ORDER BY alert.created_at DESC
        `);

        res.json({ alerts: result.rows });
      } catch (error) {
        console.warn("Could not load alerts", error);
        res.json({ alerts: [] });
      }
    }),
  );

  return router;
}
