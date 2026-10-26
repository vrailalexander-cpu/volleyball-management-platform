# Volleyball Team Management Platform

Full-stack навчальний проєкт: **система управління тренувальним процесом та змаганнями волейбольної команди**. Монорепозиторій на TypeScript із Payload CMS, Next.js, PostgreSQL та REST API.

## Структура

```text
backend/   Express + TypeScript REST API, PostgreSQL schema, health endpoint
cms/       Payload CMS v3 + Next.js App Router, collections, blocks, globals
example/   приклади API-запитів, env-конфігурації та сценарії перевірки
frontend/  публічний Next.js сайт з адаптивною панеллю команди
```

## Вимоги

- Node.js 20.9+ (рекомендовано Node 22 LTS)
- npm 10+
- Docker Desktop або локальний PostgreSQL 16+

## Запуск локально

1. Скопіюйте кореневий `.env.example` у `.env` — він потрібен Docker Compose.
2. Скопіюйте `backend/.env.example` у `backend/.env`, `cms/.env.example` у `cms/.env`, а `frontend/.env.example` у `frontend/.env`.
3. Замініть `PAYLOAD_SECRET` у `cms/.env` на довгий випадковий секрет.
4. Запустіть PostgreSQL: `docker compose up -d postgres`
5. Встановіть залежності з кореня: `npm install`
6. Запустіть усі застосунки: `npm run dev`

Адреси:
- Публічний сайт: http://localhost:3000
- Payload CMS / admin: http://localhost:3001/admin
- Backend API: http://localhost:4000/api
- Health check: http://localhost:4000/api/health

> Якщо запускаєте застосунки окремо, команди: `npm run dev:backend`, `npm run dev:cms`, `npm run dev:frontend`. Запускайте їх із кореня монорепозиторію.

## Перший запуск CMS

Відкрийте `/admin` і створіть першого користувача адміністратора. Payload виконує міграції/ініціалізацію таблиць у PostgreSQL. CMS та власний backend використовують ту саму базу, але різні таблиці.

## Основні функції

- Сторінки публічного сайту та адаптивна навігація.
- Payload CMS: керування гравцями, тренуваннями, змаганнями, медіа та сторінками.
- Блоки сторінок: hero, rich text, картки показників.
- Глобальні налаштування сайту.
- REST API: список гравців, тренувань, змагань, створення тренування, health check.
- Валідація даних, CORS, централізована обробка помилок.
- PostgreSQL схема та демонстраційні дані.

## Перевірки

```bash
npm run typecheck
npm run build
```

Перевірити API:
```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/players
curl http://localhost:4000/api/trainings
curl http://localhost:4000/api/competitions
```

Приклад запитів та ручного smoke-тестування лежить у `example/`.

## Змінні середовища

Файл `.env.example` містить локальні значення для розробки. Не використовуйте прикладові паролі/секрети у production. Для Vercel налаштуйте змінні окремо для кожного deployment environment.

## Деплой: GitHub + Vercel + PostgreSQL

1. Створіть GitHub repository і завантажте весь монорепозиторій.
2. Створіть керовану PostgreSQL базу даних (наприклад, Neon або Supabase) та скопіюйте production connection string.
3. Імпортуйте repository у Vercel.
4. Для frontend створіть Vercel Project із Root Directory `frontend`; Build Command `npm run build`; Install Command `npm install` (workspaces потребують кореневий lockfile, тому зазвичай зручніше імпортувати монорепозиторій і встановлювати з кореня).
5. Для CMS створіть окремий Vercel Project із Root Directory `cms`. Задайте `DATABASE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL`, `NEXT_PUBLIC_SERVER_URL` (публічний URL CMS).
6. Backend API можна розгорнути окремим Node-сервісом, що підтримує довготривалий процес, або адаптувати до serverless functions. Задайте `DATABASE_URL`, `CORS_ORIGIN`, `PORT`.
7. У frontend задайте `NEXT_PUBLIC_API_URL` і `NEXT_PUBLIC_CMS_URL` на публічні URL відповідних сервісів.

**Примітка:** Vercel deployment не налаштовується автоматично самим ZIP-файлом. Потрібно створити проєкти, додати змінні середовища та підключити базу даних. Локальний запуск є основним демонстраційним сценарієм.

## Розділ 2 — відповідність завданню

- **3.1 Архітектура та Payload CMS:** монорепозиторій, колекції, блоки, media upload, globals, PostgreSQL adapter, власний API.
- **3.2 Клієнтська частина:** Next.js, async-запити, стани loading/error/empty, адаптивна верстка.
- **3.3 TypeScript:** типи API, union types для блоків, типізовані DTO та функції.
- **3.4 Деплой і контроль:** README, Docker Compose, `.env.example`, GitHub/Vercel інструкція, smoke-тести.
