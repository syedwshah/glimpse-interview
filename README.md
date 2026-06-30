# Glimpse Lead Manager

Next.js app for browsing and importing sales leads. Uses PostgreSQL via Prisma.

## Setup

1. Create a Postgres database (local or remote).
2. Copy env and set your connection string:

```bash
cp .env.example .env
```

```
DATABASE_URL="postgresql://USER@localhost:5432/glimpse_prep?schema=public"
```

3. Install, migrate, run:

```bash
npm install
npm run db:migrate
npm run dev
```

App runs at http://localhost:3000. Sample CSV is in `sample-data/leads.sample.csv` — import it at `/leads/import`.
