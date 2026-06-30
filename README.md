# Glimpse Lead Manager

Next.js app for browsing and importing sales leads. Data is stored in PostgreSQL via Prisma.

**Requirements:** Node.js 20+, PostgreSQL running locally or remotely.

## Run locally

```bash
git clone https://github.com/syedwshah/glimpse-interview.git
cd glimpse-interview
```

### 1. Create the database

If Postgres is running locally:

```bash
createdb glimpse_prep
```

Use any database name you prefer — just match it in the connection string below.

### 2. Configure `.env`

```bash
cp .env.example .env
```

Open `.env` and set `DATABASE_URL` to point at your database:

```
DATABASE_URL="postgresql://YOUR_USER@localhost:5432/glimpse_prep?schema=public"
```

Replace `YOUR_USER` with your Postgres username. Add `:PASSWORD` before `@` if your database requires a password:

```
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/glimpse_prep?schema=public"
```

For a remote/hosted Postgres instance, paste the connection string from your provider instead.

### 3. Install dependencies

```bash
npm install
```

### 4. Apply database migrations

```bash
npm run db:migrate
```

This creates the tables defined in `prisma/schema.prisma`.

### 5. Start the app

```bash
npm run dev
```

Open http://localhost:3000 — it redirects to `/leads`.

### 6. Load sample data (optional)

Go to http://localhost:3000/leads/import and upload `sample-data/leads.sample.csv`.
