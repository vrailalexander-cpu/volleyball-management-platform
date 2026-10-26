# Example and smoke tests

Use these commands after starting PostgreSQL and the backend. Replace the host if the API is deployed elsewhere.

```bash
curl -i http://localhost:4000/api/health
curl -i http://localhost:4000/api/players
curl -i http://localhost:4000/api/trainings
curl -i http://localhost:4000/api/competitions
```

Create a training session (date must be ISO-8601 with timezone offset):

```bash
curl -X POST http://localhost:4000/api/trainings \
  -H "Content-Type: application/json" \
  -d '{"title":"Тактична підготовка","date":"2026-11-01T17:00:00+02:00","duration":90,"focus":"Блок та захист","location":"Спортивний зал","notes":"Відпрацювати взаємодію"}'
```

CMS:
- `GET http://localhost:3001/api/players`
- `GET http://localhost:3001/api/trainings`
- `GET http://localhost:3001/api/competitions`
- `GET http://localhost:3001/api/health`

## Expected behavior
- Health endpoint returns `status: ok` when PostgreSQL is available.
- GET endpoints return JSON with `data` array and `total`.
- Invalid training payload returns HTTP 400 with validation details.
- Unknown API route returns HTTP 404.
