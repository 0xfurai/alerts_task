import { Pool } from "pg";

const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/units_interview",
});

export default db;
