# portfolio

Personal portfolio for Parker Feirstein.

- **Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind v4, shadcn/ui, Remotion, Framer Motion
- **Hosting:** Vercel
- **Contact form:** Resend

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY if you want real email
npm run dev
```

Dev server runs at [http://localhost:3000](http://localhost:3000).

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
```

All three must pass with zero warnings before merging to main.

## Project docs

- [`PLAN.md`](./PLAN.md) — the written plan (voice, audience, goals)
- [`RESEARCH.md`](./RESEARCH.md) — portfolios studied before building
- [`PROCESS.md`](./PROCESS.md) — how this got built (prompts, revisions, self-eval)
- [`CLAUDE.md`](./CLAUDE.md) — conventions for AI coding agents

## Directory

```
app/              App Router pages + /api/contact
components/
  hero/           Remotion composition + Player wrapper
  motion/         Framer Motion helpers (reveal, page transition)
  projects/       ProjectCard, ProjectGallery
  contact/        ContactForm
  ui/             shadcn primitives (do not hand-edit)
lib/
  projects.ts     Source of truth for the project list
  site.ts         Site constants (name, socials, url)
  contact-schema.ts  zod schema for contact form
  utils.ts        shadcn cn() helper
```
