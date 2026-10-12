# Al Quds Market — Project Progress Document

> **Last Updated:** 2026-10-12  
> **Current Phase:** Phase 2 Complete → Phase 3 Ready  
> **Status:** ✅ Phase 1 & 2 Done

---

## Architecture Overview

### Monorepo Structure
```
al-quds-market/
├── src/
│   ├── app/                    # App shell, routing, providers
│   ├── components/
│   │   ├── ui/                 # Base design system components
│   │   ├── layout/             # Header, Footer, Sidebar, Nav
│   │   ├── storefront/         # Customer-facing feature components
│   │   └── admin/              # Admin dashboard feature components
│   ├── features/
│   │   ├── auth/               # Login, signup, session management
│   │   ├── catalog/            # Products, categories, search
│   │   ├── cart/               # Cart state, persistence
│   │   ├── checkout/           # Address, COD flow
│   │   ├── orders/             # Order history, tracking
│   │   ├── favorites/          # Saved products
│   │   └── admin/              # Admin-only features
│   ├── hooks/                  # Shared custom hooks
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client (anon key only)
│   │   ├── i18n.ts             # i18next setup
│   │   └── utils.ts            # Shared utilities
│   ├── types/                  # Global TypeScript types
│   ├── locales/
│   │   ├── ar.json             # Arabic translations
│   │   └── en.json             # English translations
│   └── styles/
│       └── globals.css         # Tailwind directives + CSS vars
├── supabase/
│   ├── migrations/             # Versioned SQL migrations
│   ├── functions/              # Edge Functions (server-side logic)
│   └── seed.sql                # Dev seed data
├── public/                     # Static assets
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend Framework | React 18 + TypeScript | Strict mode |
| Build Tool | Vite 5 | Fast HMR, ESM |
| Styling | Tailwind CSS 3 | + custom design tokens |
| Component Library | shadcn/ui (Radix UI) | Accessible, unstyled primitives |
| State Management | Zustand | Cart, UI state |
| Server State | TanStack Query v5 | Data fetching, caching |
| Routing | React Router v6 | File-like route structure |
| Internationalization | i18next + react-i18next | AR/EN, RTL/LTR |
| Backend | Supabase | Auth, DB, Storage, Edge Fn |
| Database | PostgreSQL (Supabase) | RLS on every table |
| File Storage | Supabase Storage | Product images |
| Deployment | Vercel | Preview + production |
| Mobile (future) | Capacitor | Wraps the Vite build |

---

## Database Schema Plan

### Tables

#### `profiles`
Extends `auth.users`. Stores display name, phone, preferred language, role.

#### `categories`
```
id, slug, name_ar, name_en, parent_id (nullable), image_url, sort_order, is_active
```
Self-referential: top-level categories + subcategories.

#### `products`
```
id, sku, name_ar, name_en, description_ar, description_en,
category_id, price, compare_at_price, unit_label_ar, unit_label_en,
stock_quantity, is_active, is_featured, images (jsonb array),
created_at, updated_at
```

#### `product_snapshots`
Immutable copy of product fields captured at order time. Satisfies the "preserve historical prices" requirement.

#### `delivery_areas`
```
id, name_ar, name_en, fee, free_delivery_threshold (nullable), is_active
```

#### `orders`
```
id, profile_id, status (enum), delivery_area_id,
address_line, notes, subtotal, delivery_fee, total,
created_at, updated_at
```

#### `order_items`
```
id, order_id, product_snapshot_id, quantity, unit_price, line_total
```

#### `promotions` (Phase 4)
```
id, code, type, value, min_order_amount, max_uses, used_count,
valid_from, valid_until, is_active
```

### Row Level Security Model

| Table | Anon | Customer | Admin |
|-------|------|----------|-------|
| categories | SELECT | SELECT | ALL |
| products | SELECT (active only) | SELECT | ALL |
| profiles | — | own row | ALL |
| orders | — | own rows | ALL |
| order_items | — | own via order | ALL |
| delivery_areas | SELECT | SELECT | ALL |
| promotions | — | — | ALL |

---

## Security Model

1. **Anon key only in frontend** — never the `service_role` key.
2. **RLS enforced on every table** — no table ever has RLS disabled.
3. **Admin role** stored in `profiles.role`, checked via RLS policy and Edge Function JWT claim.
4. **Price validation** on checkout via Edge Function — client price is never trusted.
5. **Stock decrement** uses a Postgres function with `FOR UPDATE` lock to prevent overselling.
6. **Product snapshots** frozen at order time — changes to catalog never mutate history.
7. **Storage buckets** — product images in a public bucket; no private data stored in Storage.

---

## Phased Implementation Plan

### ✅ Phase 0 — Environment Inspection (done)
- Verified Node 18, npm 10, git 2.39.
- Workspace is empty and ready.

### ✅ Phase 1 — Project Foundation & Visual Design
**Goal:** Running Vite + React app with routing, i18n, design system, and pixel-perfect homepage shell.

- [x] Scaffold Vite + React + TypeScript project
- [x] Install and configure Tailwind CSS with brand tokens
- [x] Install shadcn/ui and configure components
- [x] Install i18next (AR + EN, RTL/LTR direction switching)
- [x] Install React Router, Zustand, TanStack Query
- [x] Build design system: colors, typography (Cairo/Tajawal), spacing
- [x] Build layout shell: Header, Footer
- [x] Build homepage: Hero, category grid, featured products section
- [x] Custom brand logo mark & favicon integrated
- [x] Verify build, no TS errors, no lint errors

### ✅ Phase 2 — Supabase Foundation & Auth
**Goal:** PostgreSQL database schema, security model, and bilingual authentication.

- [x] Complete SQL migrations in `supabase/migrations/` (001 to 004)
- [x] One-click master script in `supabase/full_setup.sql`
- [x] Row Level Security (RLS) enabled on 100% of tables with helper functions
- [x] Concurrency-safe atomic functions (`decrement_product_stock` with `FOR UPDATE`)
- [x] Profile auto-creation trigger on `auth.users` insert
- [x] Zustand auth store with session restoration and auth listener
- [x] AuthModal with Login & Signup bilingual tabs
- [x] Customer Profile page with info update and language switcher
- [x] Typed database definitions in `src/types/database.ts`
- [x] Optimized manualChunks bundle splitting (zero chunk size warnings)

### 🟡 Phase 3 — Catalog & Product Discovery (Next)
- [ ] Category listing and subcategory navigation
- [ ] Product grid with sort, filter, and pagination
- [ ] Product detail page with image gallery and stock status
- [ ] Full-text search with Supabase vector search / debounce
- [ ] Customer favorites toggle & database persistence

### ⬜ Phase 4 — Cart & Checkout
- [ ] Cart drawer / page
- [ ] Delivery area selector
- [ ] Address form
- [ ] Server-side checkout Edge Function
- [ ] Order confirmation page

### ⬜ Phase 5 — Order Management (Customer)
- [ ] Order history page
- [ ] Order detail with status timeline
- [ ] Real-time status updates

### ⬜ Phase 6 — Admin Dashboard
- [ ] Admin login + route guards
- [ ] Category & subcategory CRUD
- [ ] Product CRUD with image upload
- [ ] Inventory, order, delivery area, promotions management

### ⬜ Phase 7 — Polish & Production Hardening
- [ ] Image optimization, SEO, accessibility audit
- [ ] Lighthouse performance pass
- [ ] E2E smoke tests

---

## Environment Configuration

### Required `.env.local` Variables (user supplies after Phase 2)
```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

### Vercel Environment Variables
Same two variables — never the `service_role` key.

---

## Decisions Log

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | shadcn/ui over a full component library | Full code ownership, accessible Radix primitives, Tailwind compatible |
| 2 | Zustand for cart/UI state | Minimal boilerplate, excellent TypeScript support |
| 3 | TanStack Query for server state | Caching, background refresh, optimistic updates |
| 4 | Edge Function for checkout | Price and stock must be validated server-side |
| 5 | Product snapshots table | Immutable order history per spec requirement |
| 6 | Self-referential categories table | Supports subcategory depth cleanly |
| 7 | i18next | Battle-tested, RTL direction attribute support |

---

## Test Results

### Phase 1 (UI, Foundation, Primitives & Tests) — Verified 2026-10-12

| Check | Result |
|-------|--------|
| `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errors |
| `npm run lint` (`eslint .`) | ✅ 0 errors, 0 warnings (ESLint 9 Flat Config) |
| `npm test` (`node --test tests/run-tests.mjs`) | ✅ 6 / 6 passed (i18n parity, RTL, utils, cart calculations, branding) |
| `npm run build` (`vite build`) | ✅ Exit 0 — 1799 modules transformed, 4.47s |
| Accessible Primitives | ✅ `Button`, `Badge`, `Input`, `CartDrawer` with RTL sliding support |
| Remote Synchronization | ✅ Synced with GitHub `MahmoudReda99/Al-Quds-Market` on `main` |

### Phase 2 (Supabase Backend, RLS & Auth) — Verified 2026-10-12

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npx vite build` | ✅ Exit 0 — 1743 modules, 4.03s |
| Bundle chunking | ✅ Vendor (164KB) / Supabase (170KB) / App (191KB) / UI (34KB) / CSS (34KB) |
| Supabase SQL files | ✅ `001_initial_schema`, `002_rls_policies`, `003_auth_triggers_and_functions`, `004_seed_data`, `full_setup.sql` |
| RLS verification | ✅ Enabled on 100% of tables with public read rules & customer write restrictions |
| Concurrency safety | ✅ `decrement_product_stock` using `FOR UPDATE` row lock |
| Git commit | ✅ Commit `376625d` pushed to `origin/main` |

---

## Configuration Still Required

1. **Supabase Project Credentials (`.env.local`)**:
   - Create `.env.local` inside `al-quds-market/` with your Supabase URL & anon key:
     ```env
     VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
     VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
     ```
   - Execute `supabase/full_setup.sql` in the Supabase SQL Editor.
2. **Vercel Project Setup**:
   - Import the GitHub repo `MahmoudReda99/Al-Quds-Market` on Vercel.
   - Set Root Directory to `al-quds-market`.
   - Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
