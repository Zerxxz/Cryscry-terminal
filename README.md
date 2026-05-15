# Cryscry Terminal

Production-style crypto intelligence terminal built with Next.js, TypeScript and PostgreSQL-ready Prisma schema.

## Features
- Wallet portfolio intelligence dashboard
- Whale wallet live activity feed
- Revoke wallet access risk center
- Smart contract audit endpoint with validation

## Run
1. `cp .env.example .env`
2. `npm install`
3. `npm run dev`

## API routes
- `GET /api/portfolio`
- `GET /api/whales`
- `GET /api/approvals`
- `POST /api/audit` with `{ "address": "0x..." }`
