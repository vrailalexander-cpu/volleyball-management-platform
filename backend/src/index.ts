import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { z } from "zod";
import { pool } from "./db";

const app = express();
const port = Number(process.env.PORT || 4000);
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(",").map(v => v.trim()) }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", service: "volleyball-backend", database: "connected", timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: "degraded", service: "volleyball-backend", database: "unavailable" });
  }
});

app.get("/api/players", async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT id, full_name AS name, jersey_number AS number, position, age, status FROM team_players ORDER BY jersey_number");
    res.json({ data: result.rows, total: result.rowCount ?? 0 });
  } catch (error) { next(error); }
});

app.get("/api/trainings", async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT id, title, session_date AS date, duration_minutes AS duration, focus, location, notes FROM training_sessions ORDER BY session_date ASC LIMIT 100");
    res.json({ data: result.rows, total: result.rowCount ?? 0 });
  } catch (error) { next(error); }
});

app.get("/api/competitions", async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT id, title, opponent, match_date AS date, venue, status, team_score AS score, opponent_score AS opponent_score FROM competitions ORDER BY match_date ASC LIMIT 100");
    res.json({ data: result.rows, total: result.rowCount ?? 0 });
  } catch (error) { next(error); }
});

const trainingSchema = z.object({
  title: z.string().trim().min(3).max(160),
  date: z.string().datetime({ offset: true }),
  duration: z.number().int().min(15).max(300),
  focus: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(160).default("Основний зал"),
  notes: z.string().max(4000).default("")
});

app.post("/api/trainings", async (req, res, next) => {
  const parsed = trainingSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid training data", details: parsed.error.flatten() });
    return;
  }
  try {
    const t = parsed.data;
    const result = await pool.query(
      `INSERT INTO training_sessions (title, session_date, duration_minutes, focus, location, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, session_date AS date, duration_minutes AS duration, focus, location, notes`,
      [t.title, t.date, t.duration, t.focus, t.location, t.notes]
    );
    res.status(201).json({ data: result.rows[0] });
  } catch (error) { next(error); }
});

app.use((_req, res) => res.status(404).json({ error: "Route not found" }));
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => console.log(`Volleyball API listening on http://localhost:${port}`));
