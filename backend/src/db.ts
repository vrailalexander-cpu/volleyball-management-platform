import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl: connectionString && !/localhost|127\.0\.0\.1/.test(connectionString)
    ? { rejectUnauthorized: false }
    : undefined
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});
