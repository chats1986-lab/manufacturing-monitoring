# Manufacturing Monitoring System

A production-style full-stack IoT monitoring platform that simulates industrial manufacturing environments.

The application ingests real-time sensor data from industrial printers, exposes REST APIs for factory, printer, and sensor management, and provides end-to-end observability using Prometheus, Grafana, Loki, and Promtail. The entire platform is containerized with Docker Compose, enabling a reproducible development environment and production-inspired deployment workflow.

<img width="2752" height="1536" alt="IoT_Manufacturing_System_Architecture_Overview" src="https://github.com/user-attachments/assets/befd0f76-899c-492e-9f20-83c925ab32ca" />

## Key Features

- Full-stack manufacturing monitoring platform
- RESTful API built with Node.js, TypeScript, and Express
- PostgreSQL database with Prisma ORM and automated migrations
- Simulated industrial sensor data generation
- Metrics collection with Prometheus
- Centralized logging using Loki and Promtail
- Interactive Grafana dashboards for monitoring and visualization
- Docker Compose development environment with automated database seeding
- Production-inspired microservice architecture

---

## Architecture

Services:

- Frontend (React + TypeScript + TanStack Router + TanStack Query)
- Backend API (Node.js + TypeScript + Express)
- PostgreSQL Database
- Prisma ORM
- Prometheus Metrics
- Loki + Promtail Logging
- Grafana Dashboards

---

## Prerequisites

Install:

- Docker Desktop
- Git

Optional for local development:

- Node.js 22+
- PostgreSQL 16+

---

## Clone Repository

```bash
git clone https://github.com/chats1986-lab/manufacturing-monitoring.git

cd manufacturing-monitoring
```

---

## Environment Setup

Create the backend environment file:

```bash
cp sensor/.env.example sensor/.env
```

The default Docker configuration uses:

```text
DATABASE_URL=postgresql://additive:additive@postgres:5432/additive_monitoring
```

Inside Docker Compose, the PostgreSQL hostname is:

```text
postgres
```

Docker Compose automatically provides service discovery between containers.

---

## Start the Application

Build and start all services:

```bash
docker compose up --build
```

This will automatically:

1. Start PostgreSQL
2. Apply Prisma migrations
3. Seed the manufacturing database
4. Build and start the backend API
5. Build and start the frontend
6. Start Prometheus
7. Start Loki and Promtail
8. Start Grafana

---

## Application URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:9000 |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3001 |

---

## Verify the Backend

API Base URL:

```
http://localhost:9000
```

Example endpoint:

```bash
curl http://localhost:9000/api/factories
```

Expected response:

```json
{
  "message": "Factory information obtained successfully"
}
```

---

## Database Access

Connect to PostgreSQL inside Docker:

```bash
docker exec -it postgres psql -U additive -d additive_monitoring
```

Useful queries:

```sql
SELECT * FROM factories;

SELECT * FROM printers;

SELECT * FROM sensors;

SELECT * FROM sensor_readings;
```

---

## Manual Database Operations

Access the backend container:

```bash
docker exec -it sensor-backend sh
```

Run Prisma manually:

```bash
npx prisma migrate deploy

npx prisma db seed
```

These commands are normally executed automatically during container startup.

---

## Local Development

Install dependencies:

```bash
cd sensor

npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

---

## Monitoring

Prometheus:

```
http://localhost:9090
```

Grafana:

```
http://localhost:3001
```

---

## Project Structure

```text
manufacturing-monitoring/

├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── sensor/
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── prometheus/
├── docker/
├── docker-compose.yml
└── README.md
```

---

## Seed Data

The initial dataset includes:

- 4 manufacturing factories
- 10 industrial printers
- 40 sensors
- Sample sensor readings for monitoring and visualization

Factories:

- Additive Solutions (Melbourne)
- Precision Manufacturing (Sydney)
- Advanced Robotics Factory (Brisbane)
- Aero Components Manufacturing (Perth)

---

## Troubleshooting

### Prisma cannot connect to PostgreSQL

Check your environment configuration:

```bash
grep DATABASE_URL sensor/.env
```

Docker:

```text
postgresql://additive:additive@postgres:5432/additive_monitoring
```

Local PostgreSQL:

```text
postgresql://additive:additive@localhost:5432/additive_monitoring
```

### Rebuild the environment

```bash
docker compose down

docker compose up --build
```

### Reset the database

```bash
docker compose down -v

docker compose up --build
```

---

## Development Workflow

```bash
git pull

docker compose up --build
```

After modifying the Prisma schema:

```bash
npx prisma migrate dev
```

Commit changes:

```bash
git add .

git commit -m "describe change"

git push
```
