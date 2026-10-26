# Architecture notes

```text
Browser
  ├── frontend (Next.js :3000) ────── backend REST API (:4000) ─── PostgreSQL
  │           └────────────────────── Payload REST API (:3001) ─── PostgreSQL
  └── CMS Admin (Payload + Next.js :3001) ───────────────────────── PostgreSQL
```

The frontend is a separate public application. Payload provides editorial content management and its own REST API; the custom Express backend provides team-specific API endpoints and database tables. Production deployments should use managed PostgreSQL and configure CORS and secrets per environment.
