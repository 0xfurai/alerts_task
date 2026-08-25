import type { RequestHandler } from "express";
import type { UserContext } from "../types/auth";

export const DEMO_USERS: Record<string, UserContext> = {
  alex: {
    userId: "20000000-0000-4000-8000-000000000001",
    role: "technician",
    name: "Alex Rivera",
  },
  blair: {
    userId: "20000000-0000-4000-8000-000000000002",
    role: "technician",
    name: "Blair Morgan",
  },
  casey: {
    userId: "20000000-0000-4000-8000-000000000003",
    role: "technician",
    name: "Casey Kim",
  },
  taylor: {
    userId: "20000000-0000-4000-8000-000000000004",
    role: "manager",
    name: "Taylor Lee",
  },
  dana: {
    userId: "20000000-0000-4000-8000-000000000005",
    role: "cleaner",
    name: "Dana Brooks",
  },
  eli: {
    userId: "20000000-0000-4000-8000-000000000006",
    role: "cleaner",
    name: "Eli Navarro",
  },
};

export const authStub: RequestHandler = (req, _res, next) => {
  const demoUser = req.get("x-demo-user") ?? "alex";
  const user = DEMO_USERS[demoUser];

  if (!user) {
    const error = Object.assign(new Error("Unknown demo user"), { status: 401 });
    return next(error);
  }

  req.user = user;
  next();
};
