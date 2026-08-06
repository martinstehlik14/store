# PROJECT — Zadání a záměr

> Tento soubor je záznamem původního zadání a cílů projektu.
> Vytvořeno: 2026-08-06

## Původní zadání (od Martina)

Vytvořit velkou aplikaci, která bude sloužit jako **projekt na ukázku na GitHubu**.
Bude to **e-shop**, kde bude funkční vše ze strany zákazníka, a zároveň bude mít
svůj vlastní systém pro vlastníka (admin).

## Zvolený tech stack (odsouhlaseno)

| Oblast | Technologie |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | NestJS 11 + Prisma ORM |
| Databáze | PostgreSQL 16 (Docker) |
| Architektura | Monorepo (npm workspaces): `apps/api`, `apps/web`, `packages/shared` |
| Auth | JWT (access + refresh token), role `customer` / `owner` |
| Platby | PaymentProvider pattern — mock (default) + Stripe (test mode, volitelné) |
| CI | GitHub Actions (lint + testy na každý push) |
| Testy | Jest e2e (happy path API) + unit testy |

## Rozsah — zákaznická část (plně funkční)

- Katalog produktů: kategorie, filtry, vyhledávání
- Detail produktu: obrázky, recenze, skladová dostupnost
- Košík (server-side) + checkout (adresa, platba mock/Stripe kartou)
- Registrace / login, uživatelský účet, historie objednávek
- Psaní recenzí, aplikace slevových kupónů

## Rozsah — admin systém (vlastník)

- Dashboard: tržby, počet objednávek, top produkty, grafy
- Správa produktů + kategorií (CRUD) + nahrávání obrázků (upload)
- Správa objednávek: změna stavů (pending → paid → shipped → delivered)
- Správa kupónů, moderace recenzí, správa uživatelů
- Demo účet: `owner@example.com`

## Demo data (seed)

- ~12 produktů ve 4 kategoriích (placeholder obrázky), demo účet owner + 3 zákazníci,
  2 kupóny (10 %, 20 %), ukázkové objednávky v různých stavech

## Způsob výuky (jak spolupracujeme)

- Kód píšu já (mentor), v malých kouscích.
- Martin mě úkoluje po menších částech.
- U každého kousku vysvětluji PROČ je co kde (architektura, konvence stacku).
- Postup je krok za krokem — bez skoků vpřed; každá fáze má kontrolní bod.

## Výukové fáze (plán)

1. Prostředí + git/GitHub (HOTOVO)
2. Monorepo + Docker/PostgreSQL (HOTOVO)
3. NestJS kostra + Prisma propojení (TADY JSME)
4. Databázové modely postupně (User, Category, Product, ...)
5. Auth (JWT, role)
6. Commerce (košík, objednávky, kupóny, recenze)
7. Platby (mock → Stripe)
8. Next.js + Tailwind + shadcn/ui
9. Frontend shop (katalog, košík, checkout, účet)
10. Admin panel
11. Testy + CI
12. README + GitHub showcase

## Github

- Repo: https://github.com/martinstehlik14/store
- Branch: main
- Uživatel: martinstehlik14

## Poznámky

- UI je v angličtině (GitHub showcase).
- Obrázky produktů: placeholder URL (picsum.photos), v adminu možnost uploadu.
- Stripe: mock provider je default, Stripe se dá zapnout klíči v `.env` (PAYMENT_PROVIDER).
