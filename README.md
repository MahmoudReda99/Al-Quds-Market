# Al Quds Market

A bilingual (Arabic/English) supermarket e-commerce platform built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in your Supabase credentials when required:

```bash
cp .env.example .env.local
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run lint` | Run ESLint |

## Project Structure

See the `PROJECT_PROGRESS.md` document for the architecture, schema, and phased implementation plan, if that document is available in your project.

## Technology Stack

- **React 18** + **TypeScript** (strict)
- **Vite 5** with path aliases
- **Tailwind CSS** with custom brand tokens
- **shadcn/ui** (Radix UI primitives)
- **Zustand** for cart state
- **TanStack Query v5** for server state
- **React Router v6** for routing
- **i18next** for Arabic/English with RTL/LTR support
- **Supabase** for backend services
- **Vercel** for deployment