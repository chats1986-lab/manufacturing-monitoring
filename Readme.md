# Manufacturing Monitoring System

A production-style IoT monitoring platform for manufacturing factories.

The system collects sensor data from industrial printers, exposes APIs for factory/printer/sensor information, provides metrics for monitoring, and runs with a complete Docker-based development environment.

<img width="2752" height="1536" alt="IoT_Manufacturing_System_Architecture_Overview" src="https://github.com/user-attachments/assets/befd0f76-899c-492e-9f20-83c925ab32ca" />


## Architecture

Services:

- Backend API (Node.js + TypeScript + Express)
- PostgreSQL database
- Prisma ORM
- Prometheus metrics
- Loki + Promtail logging
- Grafana dashboards

## Prerequisites

Install:

- Docker Desktop
- Git

Optional for local development:

- Node.js 22+
- PostgreSQL 16+

## Clone Repository

```bash
git clone https://github.com/chats1986-lab/manufacturing-monitoring.git

cd manufacturing-monitoring
```

## Environment Setup

Create environment file:

```bash
cp sensor/.env.example sensor/.env
```

The default Docker environment uses:

```
DATABASE_URL=postgresql://additive:additive@postgres:5432/additive_monitoring
```

Inside Docker, the database hostname is:

```
postgres
```

because Docker Compose provides service discovery.

## Start Application

Build and start all services:

```bash
docker compose up --build
```

This will:

1. Start PostgreSQL
2. Apply Prisma migrations
3. Seed initial manufacturing data
4. Build and start the backend API
5. Start monitoring services

## Verify Backend

API:

```
http://localhost:9000
```

Factory endpoint:

```bash
curl http://localhost:9000/api/factories
```

Expected response:

```json
{
  "message": "Factory information obtained successfully"
}
```

## Database Access

Enter PostgreSQL container:

```bash
docker exec -it postgres psql -U additive -d additive_monitoring
```

Useful queries:

```sql
select * from factories;

select * from printers;

select * from sensors;

select * from sensor_readings;
```

## Manual Database Operations

Enter backend container:

```bash
docker exec -it sensor-backend sh
```

Run Prisma commands:

```bash
npx prisma migrate deploy

npx prisma db seed
```

Normally these commands are executed automatically during container startup.

## Local Development Without Docker

Install dependencies:

```bash
cd sensor

npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

## Monitoring

Prometheus:

```
http://localhost:9090
```

Grafana:

```
http://localhost:3000
```

## Project Structure

```
manufacturing-monitoring/

├── sensor/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── database/
│   │   ├── routes/
│   │   └── index.ts
│   │
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Seed Data

The initial database contains:

- 4 manufacturing factories
- 10 industrial printers
- 40 sensors
- Sample sensor readings

Factories:

- Additive Solutions (Melbourne)
- Precision Manufacturing (Sydney)
- Advanced Robotics Factory (Brisbane)
- Aero Components Manufacturing (Perth)

## Troubleshooting

### Prisma cannot connect to postgres

If running locally:

```bash
grep DATABASE_URL sensor/.env
```

For Docker:

```
postgresql://additive:additive@postgres:5432/additive_monitoring
```

For local PostgreSQL:

```
postgresql://additive:additive@localhost:5432/additive_monitoring
```

### Rebuild everything

```bash
docker compose down

docker compose up --build
```

### Reset database

```bash
docker compose down -v

docker compose up --build
```

## Development Workflow

Normal workflow:

```bash
git pull

docker compose up --build
```

After schema changes:

```bash
npx prisma migrate dev
```

Commit changes:

```bash
git add .

git commit -m "describe change"

git push
```
