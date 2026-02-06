# Tiny Inventory

## Overview

Tiny Inventory is a small full‑stack inventory management system focused on **clear design decisions**, **clean API semantics**, and **production‑ready structure**. It manages stores, products, and categories, supports filtering and pagination, and exposes aggregated business metrics.

---

## Tech Stack

- **Backend**: Node.js, TypeScript, Express, Prisma, PostgreSQL
- **Frontend**: React, TypeScript, React Query
- **API**: REST
- **Infra**: Docker, Docker Compose

---

## Project Structure

```txt
/packages
  /server   # API, Prisma schema, seed data
  /client   # React app

docker-compose.yml
```

---

## How to Run

```bash
docker compose up --build
```

- Backend: [http://localhost:3088](http://localhost:3088)
- Frontend: [http://localhost:3000](http://localhost:3000)

Seed data is loaded automatically on startup.

---

## API Sketch

```txt
GET    /api/dashboard

GET    /api/stores
POST   /api/stores
GET    /api/stores/:id
PUT    /api/stores/:id
DELETE /api/stores/:id

GET    /api/stores/inventories   # aggregation: total revenue per store

GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/categories
GET    /api/categories/:id
```

---

## Key Features

### Backend

- Relational data modeling with **PostgreSQL + Prisma**
- Store ↔ Product ↔ Category relationships
- Filtering & pagination on product listing
- Aggregation endpoint for **total revenue per store**
- Dashboard metrics endpoint (`/api/dashboard`)
- Input validation and consistent error responses

### Frontend

- List and detail/edit views
- Store‑scoped and global product views
- Loading, error, and empty states handled
- Data fetching and caching via React Query

---

## Data Model (Prisma)

- **Store** → has many Products
- **Category** → has many Products
- **Product** → belongs to one Store and one Category

PostgreSQL was chosen to reflect real‑world relational constraints and enable efficient aggregation queries.

---

## Decisions & Trade‑offs

- **Postgres over SQLite**: Chosen for realistic relational modeling and aggregation use cases.
- **REST over GraphQL**: Simpler, explicit API semantics for the scope of the assignment.
- **React Query**: Reduces boilerplate and improves UX around loading and error states.
- **Caching for aggregation**: The `/api/stores/inventories` and `/api/dashboard` aggregation endpoint is cached with a very low TTL. This improves performance for expensive aggregation queries while keeping data reasonably fresh — a deliberate trade-off between consistency and speed.
- **No authentication**: Intentionally omitted to focus on core domain logic.

---

## Testing Approach

Due to time constraints, full test coverage was not implemented. Intended approach:

- Backend: unit tests for services, integration tests for API endpoints
- Frontend: component and interaction tests using React Testing Library

---

## If I Had More Time

- Implement authentication
- Write tests for the entire codebase
- Improve UX polish (sorting, optimistic updates)
