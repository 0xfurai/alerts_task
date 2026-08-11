import type { UserContext } from "./auth";

declare global {
  namespace Express {
    interface Request {
      user: UserContext;
    }
  }
}

export {};
