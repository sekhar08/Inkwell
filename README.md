# Inkwell

Inkwell is a minimal long-form writing platform built with Next.js, Prisma, and NextAuth.
It supports account creation, social + credentials sign-in, publishing posts with tags, and bookmarking posts for later reading.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Auth:** NextAuth (Credentials, GitHub, Google) + Prisma Adapter
- **Database:** PostgreSQL via Prisma with Neon HTTP adapter
- **Styling:** Global CSS + Tailwind dependencies

## Core Features

- Elegant landing page for signed-out and signed-in users
- Email/password signup with hashed passwords (`bcrypt`)
- OAuth sign-in with GitHub and Google
- Create and publish posts
- Tag support on posts
- Read latest published posts
- Bookmark/unbookmark posts
- Personal bookmarks page

## Project Structure

- `app/` — routes, API handlers, layout, providers
- `components/` — UI and feature components (auth, posts, navbar)
- `lib/` — auth config, Prisma client, server actions, schemas
- `prisma/` — schema, generated client output, migrations
- `types/` — type augmentation (NextAuth session/JWT)

## Prerequisites

- Node.js 20+
- npm 10+
- A PostgreSQL database (Neon or compatible)

## Environment Variables

Create a `.env` file in the repository root:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret

GITHUB_ID=...
GITHUB_SECRET=...

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## Getting Started

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Generate Prisma client (also runs automatically on install via `postinstall`):

   ```bash
   npx prisma generate
   ```

3. Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` — start local development server
- `npm run build` — build production bundle
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Validation Notes

- `npm run build` succeeds in the current repository state.
- `npm run lint` currently reports pre-existing lint issues unrelated to this README refresh.
