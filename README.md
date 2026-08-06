# Store — Full-Stack E-Commerce

Modern e-commerce platform with a customer storefront and a complete admin system.

> **Work in progress** — built step by step as a learning project.

## Planned Features

### Customer
- Product catalog with categories, search and filters
- Product detail with reviews
- Cart & checkout with payment (mock / Stripe)
- Order history & user account

### Admin (owner)
- Dashboard with revenue analytics & charts
- Product / category / coupon management
- Order management (status workflow)
- Review moderation
- Image uploads

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | NestJS 11, Prisma ORM |
| Database | PostgreSQL 16 (Docker) |
| Auth | JWT (access + refresh), roles |
| Payments | PaymentProvider pattern — mock + Stripe (test mode) |
| CI | GitHub Actions (lint + tests) |

## Project Structure

```
apps/
  api/     NestJS REST API
  web/     Next.js storefront + admin
packages/
  shared/  Shared TypeScript types
```

## Getting Started

Setup instructions will follow as the project progresses.

## License

MIT
