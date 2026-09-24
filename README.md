# 13th Pencil — 13thpencil.com

Production website for **13th Pencil**, a creative and innovation company.
The public page keeps the original HTML structure, CSS and canvas animations.
A Next.js admin CMS lets the studio edit each homepage section without touching that front-end.

---

## Technology stack

| Layer | Details |
|---|---|
| Public site | Next.js 15 App Router, server-rendered markup matching the approved page |
| Look and motion | `public/assets/css/styles.css` and `public/assets/js/site.js` (unchanged animation engine) |
| Admin | `/login` and `/admin` — section editors patterned on the ForexPilot admin shell |
| Database | **MySQL** via Prisma (`users`, `site_settings`, `page_sections`) |
| Auth | HttpOnly JWT cookie (`AUTH_SECRET`), one seeded admin user |

The approved frozen design still lives at `reference/approved-single-file.html`.

---

## Local setup

Needs **Node 20+** and **MySQL** (XAMPP / WAMP / Hostinger MySQL all work).

```bash
cp .env.example .env
```

Create the database, then put the URL in `.env`:

```sql
CREATE DATABASE thirteenth_pencil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```
DATABASE_URL="mysql://USER:PASSWORD@127.0.0.1:3306/thirteenth_pencil"
AUTH_SECRET="a-long-random-secret"
ADMIN_EMAIL="hello@13thpencil.com"
ADMIN_PASSWORD="ChangeMe13!"
```

```bash
npm install
npm run db:setup
npm run dev
```

- Public site: http://localhost:5173
- Admin: http://localhost:5173/login

`db:setup` runs migrations and seeds the current homepage copy plus the admin user. Re-running seed does **not** overwrite copy the client has already saved.

---

## What the client can edit

| Admin path | Edits |
|---|---|
| `/admin` | Dashboard of all editable areas |
| `/admin/settings` | SEO, emails, nav labels, footer, loader caption |
| `/admin/home/hero` … `/contact` | Each homepage section |
| `/admin/not-found` | 404 page |

Capability slugs (`strategy`, `creative`, `ai`, `experiences`, `growth`) stay fixed so the canvas animations still hook up. Marquee words, canvas captions and contact rotating phrases are injected into `site.js` via `#site-content`.

If MySQL is down, the public site still renders the seeded default copy.

---

## Hostinger (Node.js web app + GitHub)

1. Create a **private** GitHub repo and push this folder (`main`).
2. In Hostinger hPanel create a **MySQL** database and user. Note host, name, user, password.
3. **Websites → Add Website → Node.js web app → Import Git repository**.
4. Confirm auto-detected settings:

| Setting | Value |
|---|---|
| Node.js | **20** |
| Install | `npm ci` |
| Build | `npm run build` |
| Start | `npm run start -- -p $PORT` |

If Hostinger fails with `EACCES` / `permission denied, scandir`, re-upload `13thpencil-hostinger.zip`. The build now fixes directory permissions before `next build`.

If the Hostinger build fails with `EACCES` / `permission denied, scandir`, the `npm run build` script now fixes directory permissions first. Re-upload the zip after that change.

5. Environment variables in the Hostinger app settings:

```
DATABASE_URL=mysql://USER:PASSWORD@HOST:3306/DATABASE
AUTH_SECRET=long-random-production-secret
ADMIN_EMAIL=hello@13thpencil.com
ADMIN_PASSWORD=strong-password-you-will-change
```

6. After the first successful deploy, run migrations and seed once (Hostinger Node.js terminal / SSH):

```bash
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

Or add `prisma migrate deploy` to the Hostinger build command:

```
prisma migrate deploy && prisma generate && next build
```

Then seed **once** so existing client edits are never reset.

7. Point `13thpencil.com` at the Node.js app. Change the admin password after first login.

---

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local Next.js on port 5173 |
| `npm run build` | `prisma generate` + production build |
| `npm start` | Hostinger / production server |
| `npm run db:setup` | Migrate + seed |
| `npm run icons` | Rebuild favicon / OG PNGs from the SVG brand files |

---

## Project structure

```
app/(site)/page.tsx          public homepage
app/not-found.tsx            branded 404
app/login/                   admin login
app/admin/                   dashboard and section editors
app/api/auth/                login, logout, session
lib/default-content.ts       approved copy (seed + DB fallback)
lib/content.ts               MySQL read/write with merge
public/assets/               original CSS, JS, brand files
prisma/schema.prisma         MySQL models
reference/                   approved single-file design + original HTML
```

---

## Pre-launch

See `PRE-LAUNCH-CHECKLIST.md` for mailboxes, DNS, fonts, work placeholders, analytics and legal. Those items are unchanged.

The visual system (tokens, breakpoints, accessibility, animation notes) is still described in the original handoff comments inside `public/assets/css/styles.css` and `public/assets/js/site.js`.
