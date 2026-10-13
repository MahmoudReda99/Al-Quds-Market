# Al Quds Market — Project Progress Document

> **Last Updated:** 2026-10-13  
> **Current Phase:** Phase 7 Complete — Production Verified  
> **Status:** ✅ Core Platform, Testing, Vercel & Capacitor Done

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

### ✅ Phase 3 — Catalog, Images & Discovery
**Goal:** Category hierarchy, live product discovery, favorites, admin management, and idempotent import.

- [x] Category listing and subcategory browse page (`/categories`)
- [x] Category detail page with subcategory chips & sorting (`/category/:slug`)
- [x] Product detail page with image gallery, stock badges & related items (`/product/:id`)
- [x] Bilingual full-text search with debounce (`/search`)
- [x] Customer favorites store with Supabase sync & localStorage fallback (`/favorites`)
- [x] Connected homepage to live Supabase categories & products with skeleton loading
- [x] Admin product management screen (`/admin`) with Supabase Storage upload
- [x] Idempotent catalog & image import script (`scripts/import-catalog.mjs` / `npm run catalog:import`)
- [x] Automated idempotent SQL migration generator (`supabase/seed_catalog_upsert.sql`)

### ✅ Phase 4 — Customer Shopping, Cart & Delivery Fee Calculator (Completed)
- [x] Persistent shopping cart (`useCartStore`) with `localStorage` sync and concurrency stock clamping
- [x] Slide-out `CartDrawer` with free delivery progress bar and quick checkout CTA
- [x] Dedicated full Cart Page (`/cart`) with itemized quantities, image previews, and clear cart modal
- [x] Jerusalem delivery area selector with dynamic delivery fee & free delivery threshold calculation
- [x] Delivery driver notes textarea and Cash on Delivery trust badges
- [x] Advanced search page (`/search`) with live debounced search, category filter pills, stock toggle, and sort selector
- [x] Category detail page (`/category/:slug`) with subcategory chips, price range filters (< ₪10, ₪10-₪25, > ₪25), and filter reset
- [x] 14 passing automated tests verifying cart calculations, stock capping, delivery math, and i18n parity

### ✅ Phase 5 — Cash-on-Delivery Checkout Pipeline & Order Management (Completed)
- [x] Dedicated Cash-on-Delivery Checkout Page (`/checkout`) with recipient name, phone, Jerusalem delivery area, and detailed address
- [x] Authentic server-side order calculation (retrieves live DB prices and stock, rejecting client price tampering)
- [x] Concurrency-safe inventory decrement using PostgreSQL `decrement_product_stock` (`FOR UPDATE` row lock)
- [x] Immutable historical price and product details snapshot captured into `order_items` table
- [x] Dynamic Jerusalem delivery fee calculation with free delivery threshold qualification
- [x] Order celebration banner and instant redirection to live tracking view
- [x] Customer Order History Page (`/orders`) with status badges and item previews
- [x] Order Detail & Progress Tracking Page (`/orders/:id`) with 5-stage milestone progress timeline (`pending` → `confirmed` → `preparing` → `out_for_delivery` → `delivered`)
- [x] Safe order cancellation for pending orders with automatic stock restoration via `restore_product_stock`
- [x] 18 passing automated tests verifying order calculations, stock validation, cancellations, and status progression

### 🟡 Phase 6 — Admin Dashboard & Store Management (Next)
- [ ] Admin navigation & overview dashboard (`/admin`)
- [ ] Category & subcategory CRUD with ordering and icons
- [ ] Product management with Supabase Storage image upload
- [ ] Central inventory management & low-stock alerts
- [ ] Order management: live order pipeline, status updates (`pending` → `delivered`), and filtering
- [ ] Delivery areas configuration & fee tuning

### ✅ Phase 7 — Testing, Deployment & Mobile Packaging (Completed)
- [x] Hardened Vercel deployment configuration (`vercel.json`) with SPA routing rewrites and HTTP security headers
- [x] Automated security scanner test guaranteeing zero privileged `service_role` secrets in frontend codebase
- [x] End-to-end customer workflow simulation test covering full journey: Catalog discovery → Cart stock clamping → Dynamic delivery fees → Order creation → Status tracking → Order cancellation & stock restoration
- [x] Pre-configured Capacitor mobile configuration (`capacitor.config.ts`) targeting iOS & Android
- [x] Detailed native packaging documentation (`CAPACITOR_GUIDE.md`) covering build commands, RTL WebView support, and store publishing
- [x] 22 passing automated tests with 100% success rate
- [x] Verified clean TypeScript compilation (`tsc --noEmit`), ESLint, and optimized Vite production build

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

### Phase 2 (Supabase Backend, Live DB, RLS, Storage & Auth) — Verified 2026-10-12

| Check | Result |
|-------|--------|
| Live Database Connectivity | ✅ Verified live connection to `ejorpzypevglnrawyxfc.supabase.co` |
| Live Tables Provisioned | ✅ `categories` (8 rows), `products` (7 rows), `delivery_areas` (8 rows) |
| `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errors |
| `npm run lint` (`eslint .`) | ✅ 0 errors, 0 warnings |
| `npm test` (`node --test tests/run-tests.mjs`) | ✅ 9 / 9 passed (schema RLS, storage URLs, key safety, utils, cart, i18n) |
| `npm run build` (`vite build`) | ✅ Exit 0 — 1801 modules transformed in 4.12s |
| Storage Bucket Policies | ✅ Public read, admin-only upload/update/delete in `005_storage_and_admin_provisioning.sql` |
| Route Security Guards | ✅ `AdminRouteGuard` (role = 'admin') and `ProtectedRouteGuard` |
| Concurrency safety | ✅ `decrement_product_stock` using `FOR UPDATE` row lock |
| Remote Synchronization | ✅ Synced with GitHub `MahmoudReda99/Al-Quds-Market` (commit `1a5cd2c`) |

### Phase 3 (Catalog, Images, Discovery & Import) — Verified 2026-10-12

| Check | Result |
|-------|--------|
| `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errors |
| `npm run lint` (`eslint .`) | ✅ 0 errors, 0 warnings |
| `npm test` (`node --test tests/run-tests.mjs`) | ✅ 11 / 11 passed (125ms) |
| `npm run build` (`vite build`) | ✅ Exit 0 — 1814 modules transformed in 3.73s |
| Bundle chunking | ✅ Vendor (165KB) / Supabase (171KB) / App (245KB) / UI (35KB) / CSS (37KB) |
| Customer Catalog Pages | ✅ `/categories`, `/category/:slug`, `/product/:id`, `/search`, `/favorites` |
| Admin Catalog Screen | ✅ `/admin` (Product Management + Storage upload) |
| Idempotent Import Script | ✅ `scripts/import-catalog.mjs` + `supabase/seed_catalog_upsert.sql` |
| Remote Synchronization | ✅ Pushed to GitHub `MahmoudReda99/Al-Quds-Market` (commit `a394a61`) |

### Phase 4 (Customer Shopping, Cart & Delivery Fee Calculator) — Verified 2026-10-12

| Check | Result |
|-------|--------|
| `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errors |
| `npm run lint` (`eslint .`) | ✅ 0 errors, 0 warnings |
| `npm test` (`node --test tests/run-tests.mjs`) | ✅ 14 / 14 passed (153ms) |
| `npm run build` (`vite build`) | ✅ Exit 0 — 1817 modules transformed in 5.10s |
| Dedicated Cart Page | ✅ `/cart` with itemized stepper, stock limit caps, subtotal, and driver notes |
| Delivery Area Calculator | ✅ Connected to live Supabase `delivery_areas` table with area-specific fees and free delivery threshold progress bar |
| Search & Filtering | ✅ `/search` with debounced search, category chips, in-stock toggle, and sorting |
| Category Detail Filters | ✅ `/category/:slug` with price range chips (< ₪10, ₪10-₪25, > ₪25), subcategory pills, and filter reset |
| Cart Persistence & Stock Clamping | ✅ Zustand `persist` (`al-quds-cart`), quantities capped by `product.stock_quantity` |

### Phase 5 (Cash-on-Delivery Checkout & Order Management) — Verified 2026-10-13

| Check | Result |
|-------|--------|
| `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errors |
| `npm run lint` (`eslint .`) | ✅ 0 errors, 0 warnings |
| `npm test` (`node --test tests/run-tests.mjs`) | ✅ 18 / 18 passed (135ms) |
| `npm run build` (`vite build`) | ✅ Exit 0 — 1822 modules transformed in 4.64s |
| Cash-on-Delivery Checkout | ✅ `/checkout` with recipient details, Jerusalem delivery area, and detailed address |
| Server-Side Price & Fee Integrity | ✅ Calculations done against live database prices, preventing tampering |
| Concurrency-Safe Stock Locking | ✅ Decrements stock with `decrement_product_stock` (`FOR UPDATE` row lock) |
| Historical Order Snapshots | ✅ Preserves unit prices, product titles, and line totals in `order_items` table |
| Customer Order History | ✅ `/orders` with colored status badges, item thumbnails, and timestamps |
| Order Detail & Progress Stepper | ✅ `/orders/:id` with 5-stage visual tracker (`pending` → `delivered`) and pending order cancellation |

### Phase 7 (Testing, Deployment, Security & Mobile Readiness) — Verified 2026-10-13

| Check | Result |
|-------|--------|
| `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errors |
| `npm run lint` (`eslint .`) | ✅ 0 errors, 0 warnings |
| `npm test` (`node --test tests/run-tests.mjs`) | ✅ 26 / 26 passed (193ms) |
| `npm run build` (`vite build`) | ✅ Exit 0 — 1822 modules transformed in 4.74s |
| Vercel SPA Routing & Security Headers | ✅ `vercel.json` configured with `/index.html` rewrites, nosniff, DENY frame options, and assets cache |
| Capacitor Mobile Configuration | ✅ `capacitor.config.ts` configured for `com.alqudsmarket.app`, `dist` webDir, and splash branding |
| Capacitor Mobile Packaging Guide | ✅ `CAPACITOR_GUIDE.md` comprehensive documentation for iOS (Xcode) and Android (Android Studio) |
| Codebase Secret Scanner | ✅ Automated audit verifies zero privileged `service_role` keys in client codebase |
| End-to-End Customer Journey Simulation | ✅ Full workflow verified: Discovery → Cart → Area Fee Calc → COD Order → Tracking → Cancellation |

### InstaShop El Wekala Catalog Expansion & Localization — Verified 2026-10-13

| Feature / Artifact | Status | Details |
|---|---|---|
| **EGP Currency Rebranding** | ✅ Verified | All prices localized to Egyptian Pounds (`جنيه مصري` / `EGP`), 0 shekel references in app |
| **6th of October & Zayed Delivery** | ✅ Verified | Migration `008_october_giza_delivery_areas.sql` active with 7 local districts and EGP thresholds |
| **36 Supermarket Departments** | ✅ Verified | Migration `009_instashop_el_wekala_full_catalog.sql` with icons in `public/categories/*.png` |
| **Dairy & Eggs 96 Items Catalog** | ✅ Verified | Migration `010_dairy_and_eggs_catalog_expansion.sql` with 96 authentic product package crops in `public/products/dairy/`, bilingual names, weights, and exact EGP prices |

### Operator & Administrator Command Center — Verified 2026-10-13

| Feature / Artifact | Status | Details |
|---|---|---|
| **Default Admin & Operator Account** | ✅ Verified | Migration `011_create_default_admin_account.sql` provisions verified account `admin@alqudsmarket.com` with password `Admin@AlQuds2026!` and role `admin` |
| **Operator Order Dispatch Queue** | ✅ Verified | Live feed of all customer orders, filter pills for all 6 statuses, customer WhatsApp link, direct phone dialing, and driver notes |
| **One-Click Status Transitions** | ✅ Verified | Operator buttons for Confirm → Prepare → Dispatch with Driver → Mark Delivered, with automatic inventory rollback on cancel |
| **Delivery Zones & Fee Manager** | ✅ Verified | Live editing of 6th of October & Zayed delivery fees, free delivery thresholds, and active status |
| **Catalog & Product Management** | ✅ Verified | Integrated tab with full creation, pricing, photo upload, and inventory management |
| **1-Click Admin Header Navigation** | ✅ Verified | Direct "لوحة التحكم / Dashboard" button in Header and Profile page for verified admins |

---

## Configuration & Credentials

1. **Default Administrator / Operator Login**:
   - **Email:** `admin@alqudsmarket.com`
   - **Password:** `Admin@AlQuds2026!`
   - **Role:** `admin` (full operator and catalog access)
   - *How to apply:* Run [`supabase/migrations/011_create_default_admin_account.sql`](file:///Users/mahmoudreda/Desktop/My%20Projects/Al%20Quds/al-quds-market/supabase/migrations/011_create_default_admin_account.sql) in your Supabase SQL Editor.
2. **Storage Bucket Provisioning (One-time)**:
   - Run [`supabase/migrations/005_storage_and_admin_provisioning.sql`](file:///Users/mahmoudreda/Desktop/My%20Projects/Al%20Quds/al-quds-market/supabase/migrations/005_storage_and_admin_provisioning.sql) in your Supabase SQL Editor to create the `product-images` storage bucket.
3. **Vercel Project Setup**:
   - Import the GitHub repo `MahmoudReda99/Al-Quds-Market` on Vercel.
   - Set Root Directory to `al-quds-market`.
   - Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

