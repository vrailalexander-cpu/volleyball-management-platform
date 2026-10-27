import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
      connectionTimeoutMillis: 5000,
    })
  : null;

const demoData: Record<string, Record<string, unknown>[]> = {
  players: [
    {
      id: 1,
      name: "Олексій Петренко",
      position: "Пасуючий",
      experience: 2,
      status: "Активний",
    },
    {
      id: 2,
      name: "Іван Коваленко",
      position: "Нападник",
      experience: 3,
      status: "Активний",
    },
    {
      id: 3,
      name: "Сергій Мельник",
      position: "Блокуючий",
      experience: 1,
      status: "Активний",
    },
    {
      id: 4,
      name: "Дмитро Шевченко",
      position: "Ліберо",
      experience: 4,
      status: "Неактивний",
    },
  ],
  teams: [
    {
      id: 1,
      name: "ВК Львів",
      city: "Львів",
      category: "Доросла",
      status: "Активна",
    },
    {
      id: 2,
      name: "ВК Молодь",
      city: "Львів",
      category: "Молодіжна",
      status: "Активна",
    },
  ],
  trainings: [
    {
      id: 1,
      title: "Технічна підготовка",
      date: "2026-10-28",
      time: "17:00",
      location: "Спортивний зал №1",
      status: "Заплановано",
    },
    {
      id: 2,
      title: "Тактичне тренування",
      date: "2026-10-29",
      time: "18:00",
      location: "Спортивний зал №1",
      status: "Заплановано",
    },
    {
      id: 3,
      title: "Фізична підготовка",
      date: "2026-10-30",
      time: "16:00",
      location: "Фітнес-зал",
      status: "Заплановано",
    },
  ],
  competitions: [
    {
      id: 1,
      name: "Чемпіонат області з волейболу",
      date: "2026-11-07",
      location: "Львів",
      status: "Заплановано",
    },
    {
      id: 2,
      name: "Кубок міста",
      date: "2026-11-14",
      location: "Львів",
      status: "Заплановано",
    },
  ],
  matches: [
    {
      id: 1,
      homeTeam: "ВК Львів",
      awayTeam: "ВК Молодь",
      date: "2026-10-20",
      score: "3:1",
      status: "Завершено",
    },
    {
      id: 2,
      homeTeam: "ВК Львів",
      awayTeam: "ВК Карпати",
      date: "2026-11-07",
      score: null,
      status: "Заплановано",
    },
  ],
};

type Resource = keyof typeof demoData;

const tableNames: Record<Resource, string> = {
  players: "players",
  teams: "teams",
  trainings: "trainings",
  competitions: "competitions",
  matches: "matches",
};

async function getResource(resource: Resource) {
  if (!pool) {
    return {
      data: demoData[resource],
      source: "demo",
    };
  }

  try {
    const result = await pool.query(
      `SELECT * FROM "${tableNames[resource]}" ORDER BY id DESC LIMIT 200`
    );

    return {
      data: result.rows,
      source: "database",
    };
  } catch (error) {
    console.error(
      `Помилка читання таблиці ${tableNames[resource]}:`,
      error instanceof Error ? error.message : error
    );

    return {
      data: demoData[resource],
      source: "demo",
      warning: "Таблиця недоступна. Показано демонстраційні дані.",
    };
  }
}

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Volleyball Management API працює",
    version: "1.0.0",
    endpoints: [
      "/api/health",
      "/api",
      "/api/players",
      "/api/teams",
      "/api/trainings",
      "/api/competitions",
      "/api/matches",
    ],
  });
});

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API управління волейбольною командою",
    resources: Object.keys(demoData),
  });
});

app.get("/api/health", async (_req: Request, res: Response) => {
  let database = "not_configured";

  if (pool) {
    try {
      await pool.query("SELECT 1");
      database = "connected";
    } catch {
      database = "disconnected";
    }
  }

  res.status(200).json({
    success: true,
    status: "ok",
    database,
    timestamp: new Date().toISOString(),
  });
});

for (const resource of Object.keys(demoData) as Resource[]) {
  app.get(`/api/${resource}`, async (_req: Request, res: Response) => {
    const result = await getResource(resource);

    res.status(200).json({
      success: true,
      count: result.data.length,
      source: result.source,
      data: result.data,
      ...("warning" in result ? { warning: result.warning } : {}),
    });
  });
}

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Маршрут не знайдено",
    path: req.originalUrl,
  });
});

app.use(
  (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("Помилка API:", error.message);

    if (res.headersSent) {
      return;
    }

    res.status(500).json({
      success: false,
      message: "Внутрішня помилка сервера",
    });
  }
);

const server = app.listen(PORT, () => {
  console.log(`API запущено: http://localhost:${PORT}`);
  console.log(`Перевірка стану: http://localhost:${PORT}/api/health`);
  console.log(`Список гравців: http://localhost:${PORT}/api/players`);
});

async function shutdown() {
  server.close(async () => {
    if (pool) {
      await pool.end().catch((error: unknown) => {
        console.error("Помилка закриття PostgreSQL:", error);
      });
    }

    process.exit(0);
  });
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());