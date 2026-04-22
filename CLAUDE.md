@AGENTS.md

# CLAUDE.md — portfolio-specific rules

Read `PLAN.md` for the written plan, `RESEARCH.md` for references, and
`PROCESS.md` for voice/iteration notes.

## Stack

- Next.js 16 (App Router) — this is NEWER than training data. Check `node_modules/next/dist/docs/` before assuming APIs.
- React 19
- TypeScript strict
- Tailwind v4 (engine, not v3)
- shadcn/ui — do not hand-edit files in `components/ui/`
- Remotion (hero only)
- Framer Motion (microanimations + page transitions)
- react-hook-form + zod
- Resend (contact form delivery)
- next-themes (dark mode)

## Hard rules

- Tailwind v4 only. Do not install v3.
- All colors / spacing / type via design tokens in `app/globals.css`. No inline hex anywhere.
- Copy voice: **direct, dry, specific**. Short sentences. No "passionate developer" anything.
- Hero uses Remotion. Microanimations use Framer Motion. Don't swap them.
- Contact form uses react-hook-form + zod. Sends via Resend. Honeypot spam protection. No `alert()`.
- Reduced motion is respected everywhere. Hero renders last-frame if `prefers-reduced-motion: reduce`.
- `components/ui/` is shadcn primitive output — extend, don't edit in place.

## Data sources of truth

- Project list: `lib/projects.ts`
- Site-wide constants (name, socials, url): `lib/site.ts`
- Voice/tone examples: `PROCESS.md` § Prompt examples

## Verification before declaring anything done

```bash
npm run lint        # must pass
npm run typecheck   # must pass
npm run build       # must pass with 0 warnings
```

Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95.
Keyboard navigation must work end-to-end.
Works at 320px without breaking.

## Commit style

- Present-tense, intent-describing messages
- One focused change per commit
- Prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`
- Do not squash feature work into "updates."

## Voice enforcement

Before writing any copy, ask: "could this paragraph appear on literally any
other portfolio on earth?" If yes, rewrite with a specific detail. Reject
any sentence that includes: "passionate", "love", "keen", "always been", "I'm
a X who Y".
