const API_URL = "http://localhost:3000";

const DEMO_USER = "alex";

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function getErrorMessage(body: unknown): string {
  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    return body.error;
  }
  return "Request failed";
}

export async function request<ResponseBody>(
  path: string,
  options: RequestInit = {},
): Promise<ResponseBody> {
  const headers = new Headers(options.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("x-demo-user", DEMO_USER);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const body: unknown = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(getErrorMessage(body), response.status, body);
  }

  return body as ResponseBody;
}
