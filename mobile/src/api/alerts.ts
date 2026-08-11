import { request } from "./client";

export interface Alert {
  id: string;
  unit_id: string;
  unit_name: string;
  created_at: string;
}

interface AlertsResponse {
  alerts: Alert[];
}

export async function listAlerts(): Promise<Alert[]> {
  const body = await request<AlertsResponse>("/api/alerts");
  return body.alerts;
}
