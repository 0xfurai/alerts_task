import express, { type Router } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import type { Queryable } from "../types/database";

interface UnitRow {
  id: string;
  name: string;
  status: string;
  is_active: boolean;
  door_access_code: string;
  secret_internal_note: string | null;
  updated_at: string | Date;
}

export function createUnitsRouter(db: Queryable): Router {
  const router = express.Router();

  router.get(
    "/",
    asyncHandler(async (_req, res) => {
      try {
        const result = await db.query<UnitRow>(`
            SELECT unit.*
            FROM units AS unit
            WHERE unit.is_active
            ORDER BY unit.status
        `);

        res.json({ units: result.rows });
      } catch (error) {
        console.warn("Could not load units", error);
        res.json({ units: [] });
      }
    }),
  );

  return router;
}
