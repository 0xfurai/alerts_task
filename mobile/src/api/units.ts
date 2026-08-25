import { request } from "./client";

export interface Unit {
  id: string;
  name: string;
  status: string;
  last_cleaned_at: string | null;
}

interface UnitsResponse {
  units: Unit[];
}

export async function listUnits(): Promise<Unit[]> {
  const body = await request<UnitsResponse>("/api/units");
  return body.units;
}
