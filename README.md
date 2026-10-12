# Al Quds Market

A bilingual (Arabic/English) supermarket e-commerce platform built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in your Supabase credentials (Phase 2):

```bash
cp .env.example .env.local
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run lint` | ESLint check |

## Project Structure

See the [Project Progress Document](../PROJECT_PROGRESS.md) for full architecture, schema, and phased implementation plan.

## Technology

- **React 18** + **TypeScript** (strict)
- **Vite 5** with path aliases
- **Tailwind CSS** with custom brand tokens
- **shadcn/ui** (Radix UI primitives)
- **Zustand** for cart state
- **TanStack Query v5** for server state
- **React Router v6** for routing
- **i18next** for Arabic/English with full RTL/LTR support
- **Supabase** for backend (Auth, PostgreSQL, Storage, Edge Functions)
- **Vercel** for deployment
