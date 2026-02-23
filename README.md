# VocaLink (Complete Runnable Project)

VocaLink is an assistive communication platform for non-verbal SNED learners in Philippine inclusive classrooms.

## Tech Stack
- Frontend: React + Vite + TailwindCSS + React Router + Socket.io client
- Backend: Node.js + Express + TypeScript + Socket.io
- Database: SQLite (Prisma ORM)
- Auth: JWT + bcrypt password hashing

## Prerequisites
- Node.js 20+
- npm 10+

## Project Structure
- `frontend` — React web app
- `backend` — Express API + Socket.io
- `backend/prisma` — Prisma schema + seed script
- `prisma/migrations` — SQL migration files

## Installation
1. Copy env template:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Run migrations:
   ```bash
   npm run prisma:migrate
   ```
5. Seed sample data (includes default teacher):
   ```bash
   npm run prisma:seed
   ```

## Environment Variables
Use `.env` in repository root:

```env
PORT=4000
JWT_SECRET=super-secret-change-me
CORS_ORIGIN=http://localhost:5173
DATABASE_URL="file:./dev.db"
VITE_API_BASE_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

## Running the App
Run backend + frontend together:
```bash
npm run dev
```

Or separately:
```bash
npm run dev:backend
npm run dev:frontend
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`

## Default Teacher Account (Seeded)
- Email: `teacher@vocalink.local`
- Password: `Password123!`

## Database Setup, Migration, and Seed
- Prisma schema: `backend/prisma/schema.prisma`
- Migrations: `prisma/migrations/20260223120000_init/migration.sql`
- Seed script: `backend/prisma/seed.ts`

Commands:
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## API Endpoints
Base URL: `http://localhost:4000/api`

### Health
- `GET /health`

### Auth
- `POST /auth/login`
  ```json
  {
    "email": "teacher@vocalink.local",
    "password": "Password123!"
  }
  ```

### Phrases
- `GET /phrases/public?language=en` (no auth, student mode)
- `GET /phrases` (auth)
- `POST /phrases` (auth)
  ```json
  {
    "text": "I need help.",
    "category": "classroom",
    "language": "en"
  }
  ```
- `DELETE /phrases/:id` (auth)

### Logs
- `GET /logs` (auth)
- `POST /student/log` (no auth)
  ```json
  {
    "message": "I need water.",
    "source": "student"
  }
  ```

### Captions
- `POST /captions/simulate` (auth; emits `caption:new` Socket.io event)
  ```json
  {
    "text": "Please open your books to page 10."
  }
  ```

## Frontend Routes
- `/login`
- `/dashboard` (protected)
- `/phrases` (protected)
- `/captions` (protected)
- `/student` (public)

## Security and Validation Included
- Helmet for security headers
- CORS restrictions via `CORS_ORIGIN`
- Rate limiting (`express-rate-limit`)
- Request logging via Morgan
- Zod validation on request payloads and key query/param inputs
- Centralized error handler
- JWT auth middleware for protected endpoints

## Sanity Check
Run these commands in order:

1. Setup
```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```
Expected:
- Prisma client generated
- Migration applied successfully
- Seed complete message printed

2. Start app
```bash
npm run dev
```
Expected:
- Backend log: `Backend running at http://localhost:4000`
- Vite log with local URL (usually `http://localhost:5173`)

3. API health check
```bash
curl http://localhost:4000/api/health
```
Expected JSON:
```json
{"status":"ok","service":"vocalink-backend"}
```

4. Login test
```bash
curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{"email":"teacher@vocalink.local","password":"Password123!"}'
```
Expected:
- Returns JWT token and teacher object

5. Browser pages
- Open `http://localhost:5173/student` and tap phrases (Web Speech API if supported)
- Open `http://localhost:5173/login` then access `/dashboard`, `/phrases`, `/captions`
