# Full-stack Template

This template provides a fully functional CRUD app. Once a user has successfully registered for an account and logged in, they can see their existing tasks, create new tasks, update existing tasks, and delete tasks.

## Getting Started

1. Click "Use This Template" and "Create a new repository."
2. Clone down your repo and run `npm install`.
3. Create a `.env` file according to the provided `example.env`.
4. Apply the initial Prisma migration and generate the client.\
   `npx prisma migrate reset`
5. Start developing!\
   `npm run dev`

## Architecture

### Backend

The backend consists of an [Express](https://expressjs.com/) server with a SQLite database and [Prisma](https://www.prisma.io/) as the ORM. The entrypoint is `src/server/index.js`.

API routes can be found in `src/server/api/`.

Authentication is handled with [JWT](https://github.com/auth0/node-jsonwebtoken). User passwords are hashed with [bcrypt](https://github.com/kelektiv/node.bcrypt.js).

![Database schema as described below](database_schema.svg)

<details>
<summary>Expand to see DBML</summary>

```dbml
Table User {
  id        Serial  [pk]
  username  String
  password  String
}

Table Task {
  id          Serial  [pk]
  description String
  done        Boolean
  userId      Int
}

Ref: User.id < Task.userId
```

</details>

### Frontend

The frontend is a [React](https://react.dev/) app created with [Vite](https://vitejs.dev/). Vite middleware is used in development, but the frontend should be built for production.

Routing is handled with [React Router](https://reactrouter.com/en/main). The router is defined in `src/client/main.jsx`.

Application state is managed with [Redux Toolkit](https://redux-toolkit.js.org/). The store is defined in `src/client/store/index.js`. Additional slices should be defined separately in `src/client/features`.

[RTK Query](https://redux-toolkit.js.org/rtk-query/overview) is used to handle data fetching. The central API slice is defined in `src/client/store/api.js` and is intended to stay empty. Additional endpoints should be injected separately in `src/client/features`.

[Less](https://lesscss.org/) is used as the CSS preprocessor.

# project-financial-tracker

## 1 Project goal & MVP

Goal: Build a full-stack finance tracker with a polished Dashboard and Budget pages that are portfolio-ready (responsive, secure, and testable).

MVP features (must have before shipping):

User auth (email + password, JWT or NextAuth)

Link / import accounts (CSV import for MVP; Plaid optional)

Dashboard: total balance, income vs expenses chart, recent transactions, budgets at a glance, goals progress, net worth chart, upcoming bills

Budget page: create/edit/delete categories, set monthly budgets, progress bars, transaction list filtered by category

Basic reports endpoint (monthly totals)

Responsive UI + basic tests

## 2 — Tech stack (recommended)

1. Frontend: React + JS or TypeScript (Next.js if you want SSR / pages)

2. Styling: Less or Chakra UI (faster component work)

3. Charts: Recharts or Chart.js (Recharts is React-friendly)

4. State/data fetching: React Query (server state) + local state for UI

5. Backend: Node.js (NestJS or Express) or FastAPI (Python) — I’ll assume Node/Express with js or TypeScript

6. ORM: Prisma + PostgreSQL

7. Auth: NextAuth (if Next) or JWT via Auth0 / custom with bcrypt + JWT

8. Hosting: Frontend → Vercel (or Netlify); Backend → Railway / Heroku / Digital Ocean; DB → Supabase / Railway Postgres

9. CI/CD: GitHub Actions; containerize with Docker for parity

## 3 — High-level architecture

User browser ↔ Frontend (React) ↔ Backend REST API (Express) ↔ PostgreSQL (Prisma)
Optional: Background worker (for scheduled imports/notifications), Redis for caching, third-party integrations (Plaid/AlphaVantage).

## 4 — Database model (core tables)

Below is a concise Prisma-style model (adapt to plain SQL if you prefer):
model User {
id String @id @default(cuid())
email String @unique
password String
name String?
accounts Account[]
transactions Transaction[]
budgets Budget[]
goals Goal[]
createdAt DateTime @default(now())
}

model Account {
id String @id @default(cuid())
userId String
user User @relation(fields: [userId], references:[id])
name String
type String // "checking", "savings", "credit", "brokerage"
balance Float
lastSynced DateTime?
providerId String? // e.g., plaid item id
}

model Category {
id String @id @default(cuid())
userId String
name String
color String?
}

model Transaction {
id String @id @default(cuid())
userId String
accountId String
categoryId String?
amount Float
currency String @default("USD")
date DateTime
description String?
type String // "income" | "expense" | "transfer"
createdAt DateTime @default(now())
}

model Budget {
id String @id @default(cuid())
userId String
categoryId String
period String // "monthly" (can support others)
amount Float
spent Float @default(0)
startDate DateTime
}

model Goal {
id String @id @default(cuid())
userId String
title String
targetAmount Float
savedAmount Float
monthlyContribution Float?
dueDate DateTime?
}

## 5 — API design (key endpoints)

Use REST or GraphQL. Example REST endpoints:

POST /api/auth/register, POST /api/auth/login

GET /api/dashboard
Response contains: totalBalance, breakdowns, incomeExpensesSeries, recentTransactions (5-10), budgetsSummary, goals

GET /api/accounts /- POST /api/accounts/import (CSV) /- POST /api/accounts/link (Plaid)

GET /api/transactions?limit=20&category=groceries /- POST /api/transactions

GET /api/budgets /- POST /api/budgets / -PUT /api/budgets/:id /- DELETE /api/budgets/:id

GET /api/goals / -POST /api/goals

GET /api/reports/monthly?year=2025

POST /api/webhook/sync (for background sync)

## Sample /api/dashboard response (JSON):

{
"totalBalance": 42350,
"balances": { "cash":15320, "investments":18500, "debt": -5470 },
"incomeExpensesSeries": [{ "month":"Jul", "income":5000, "expenses":3200 }, ...],
"recentTransactions": [ { "id":"tx1", "desc":"Grocery", "amount":-75, "date":"2025-07-10" }, ... ],
"budgetsSummary": [ { "category":"Groceries","budget":2000,"spent":1400 } ],
"goals": [ { "title":"Emergency Fund", "target":5000, "progress":0.45 } ]
}

## 6 — Frontend page + component breakdown

Use atomic components and pages.

Pages:

DashboardPage

BudgetsPage

TransactionsPage

GoalsPage

Settings (accounts, integrations)

# Key components (props + responsibilities):

TotalBalanceCard (props: balances) — shows combined balance & change %

IncomeExpenseChart (props: series) — stacked bars or grouped bars

RecentTransactionsList (props: transactions, onFilterClick)

BudgetSummaryCard (props: budgets) — progress bars with color states

BudgetTable (props: budgets, onEdit, onDelete) — table for budget page

AddBudgetModal (props: categories, onSave)

NetWorthChart (props: series)

UpcomingBillsList

# State & data:

Use React Query for API data fetching (caching and background refetch)

Keep UI-only state in component or use Zustand for global UI flags (modals, theme)

# UX details:

Inline edit budgets (click to edit amount)

Quick actions on Dashboard: “Mark bill paid”, “Add transaction”

Hover tooltips on charts

Mobile responsive: collapse side panels into stacked cards

## 7 — Business logic & calculations

Total balance = sum(accounts.balance)

Net worth = assets − liabilities (compute per account type)

Budget spent = sum(transactions where date in period and category matches and type == expense)

Budget remaining = budget.amount − spent (if negative → overspent)

Goal ETA = (targetAmount − savedAmount) / monthlyContribution (guard for zero)

Categorization: rule-based + ML fallback (initial simple rules: match description keywords; later train small classifier)

## 8 — Integrations & imports

MVP: CSV import UI (user uploads bank CSV, map columns → transactions)

Optional: Plaid for live linking (store tokens securely; follow provider security docs)

Investments/prices: AlphaVantage or Yahoo APIs for holdings valuations

## 9 — Security & privacy

Hash passwords (bcrypt) & use HTTPS

Encrypt sensitive tokens (KMS or environment variable encryption)

Do not store raw bank credentials—use provider flows (Plaid)

Implement rate limiting, input validation, and RBAC if multi-user features added

GDPR/CCPA: data export & delete endpoints

## 10 — Testing

Unit tests: Jest (backend logic), React Testing Library (components)

Integration tests: test API routes with Supertest

E2E: Cypress for flows (signup, create budget, import CSV, dashboard shows correct numbers)

Add snapshot tests for critical UI components (charts, cards)

## 11 — Dev workflow & CI/CD

Repo: main (protected), feature branches for tasks, PRs with reviews

GitHub Actions pipeline:

Lint + Typecheck

Run unit tests

Build Docker image

Deploy to staging on merge to dev branch

Environment secrets via repo secrets or cloud provider secret store

## 12 — Monitoring & analytics

Error monitoring: Sentry

Logging: structured logs (Winston / pino) + retention

Usage analytics: track feature usage to prioritize improvements

## 13 — Acceptance criteria (for each feature)

Dashboard displays total balance and matches DB computed sum (validated via tests)

Budgets page supports add/edit/delete and progress updates in realtime after transaction import

CSV import maps to transactions and updates budgets accordingly

Auth prevents unauthorized API calls (401)

Responsive UI works on mobile and desktop breakpoints

## 14 — Recommended development sprint order (task list — no time estimates)

Setup repo, CI, linter, and basic README

DB + Prisma schema + migrations

Auth & user onboarding endpoints

Accounts & transaction models + CSV import endpoint

Dashboard API endpoint (aggregate queries)

Frontend skeleton + routing (Dashboard + Budgets pages)

Implement Dashboard UI components and wire to /api/dashboard

Implement Budgets CRUD + Budget page UI

Implement transactions page + recent transactions component

Add charts & polish UI (tooltips, animations)

Tests (unit + integration)

Deploy staging, run smoke tests, then production

## 15 — Deliverables I can create for you right now

Figma or high-fidelity mockups for Dashboard + Budget pages (already have images; I can export design tokens and component spec)

Component skeletons (React + TypeScript) with props & sample data

Prisma schema + sample SQL migrations

Example API handlers (Express + TypeScript) / sample JSON responses

CSV import mapping UI and parsing logic
