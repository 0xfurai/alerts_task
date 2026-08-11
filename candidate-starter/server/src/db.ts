import { Pool } from "pg";

const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/alerts_interview",
});

export default db;
