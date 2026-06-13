# Project structure — origg.in

Overview of files and folders with short descriptions.

- app/
  - app.vue — Nuxt app root
  - components/
    - Header.vue
    - Hero.vue
  - middleware/
    - auth.ts — route auth middleware
  - pages/
    - index.vue — home page
    - login.vue — login page
    - register.vue — registration page
    - cabinet.vue — user cabinet

- composables/
  - useApi.ts — client API helper
  - useUserStore.ts — user store/composable

- public/
  - favicon.ico
  - robots.txt

- server/
  - api/
    - auth/
      - create.post.ts
      - discord.get.ts
      - login.post.ts
      - logout.get.ts
      - me.get.ts
      - protected.get.ts
      - register.post.ts
    - user/
      - profile.get.ts
      - update.put.ts
    - integrations/
      - lastfm/
        - callback.get.ts
  - database/
    - schema.ts — Drizzle schema (users, tokens, admins)
    - migrations/ — SQL migration files
      - 0000_empty_lilith.sql
      - 0001_sloppy_vertigo.sql
      - 0002_wandering_rocket_raccoon.sql
      - 0003_calm_outlaw_kid.sql
      - 0004_short_lord_hawal.sql
      - meta/ (snapshots)
  - plugins/
    - drizzle.ts
    - turso.ts
  - types/
    - database.d.ts
  - utils/
    - tokens.ts

- drizzle.config.ts — Drizzle-kit config
- nuxt.config.ts — Nuxt configuration and runtimeConfig
- package.json — scripts and dependencies (dev, db:* scripts)
- tsconfig.json
- README.md
- AGENT_INSTRUCTIONS.md — agent guidelines
- PROJECT_STRUCTURE.md (this file)

Notes / next steps:
- Use `npm run dev` to start local dev server.
- DB scripts available: `npm run db:generate`, `npm run db:migrate`, `npm run db:push`, `npm run db:studio`.
- If you want, I can scaffold missing docs (CONTRIBUTING.md, PR template) or create a visual tree in README.
