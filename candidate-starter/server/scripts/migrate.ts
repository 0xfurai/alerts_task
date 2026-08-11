import * as fs from "node:fs/promises";
import * as path from "node:path";
import db from "../src/db";

async function migrate(): Promise<void> {
  const directory = path.join(__dirname, "..", "migrations");
  const files = (await fs.readdir(directory))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  for (const file of files) {
    const alreadyApplied = await db.query(
      "SELECT 1 FROM schema_migrations WHERE name = $1",
      [file],
    );
    if ((alreadyApplied.rowCount ?? 0) > 0) continue;

    const sql = await fs.readFile(path.join(directory, file), "utf8");
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (name) VALUES ($1)",
        [file],
      );
      await client.query("COMMIT");
      console.log(`Applied ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

migrate()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.end());
