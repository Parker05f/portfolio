# PROCESS

> How this got built. Research, plan, prompts, revisions, and self-evaluation.

For the research itself, see [RESEARCH.md](./RESEARCH.md). For the written plan, see [PLAN.md](./PLAN.md). This file is the meta-doc: how I used AI, what I changed, and how I'd score this.

---

## 1. Research

See [RESEARCH.md](./RESEARCH.md). Five portfolios studied with specific takeaways:

- **Rauno Freiberg** — name as link, terse titles, dark-first palette
- **Paco Coursey** — voice with a reason, one hero image per project
- **Linear** — type pairing (sans body, mono labels, serif landmarks), motion budget
- **Craig Mod** — About as prose, confidence in whitespace
- **Tholman** — permission to be playful in the hero specifically

Also documented what I rejected and why (full-screen developer videos, cursor trails, skill bars, "passionate developer" bios).

---

## 2. Plan

See [PLAN.md](./PLAN.md). Voice, audience, page goals, non-goals, architecture, and quality bar defined before any feature code.

---

## 3. Prompt examples

Three prompts representative of how I directed Claude Code during this build. Captured verbatim, not cleaned up.

### 3.1 The voice-setting prompt (used at project start)

> Task: set the voice on this portfolio before we write a line of copy.
>
> Voice adjectives: direct, dry, specific. Three things, not five. If you are reaching for a fourth, stop — you are drifting toward generic.
>
> Audience: technical hiring managers and indie founders. They read fast. They are not impressed by adjectives. They are impressed by specific decisions with reasoning.
>
> Reference voices I like: Paul Graham's essays (for rhythm, not length), Linear's changelog, Rauno Freiberg's project titles, Stripe's old `/docs` copy.
>
> Anti-references — do NOT write like this: "passionate developer", "keen eye for detail", "love to bring ideas to life", anything that starts with "I'm a X who Y". If a sentence could be pasted into any portfolio on earth it is wrong.
>
> Rule of thumb when drafting: every sentence should either (a) say something specific only this portfolio would say, or (b) be cut.
>
> When you write copy, draft it and then strike your own weakest sentence before showing me.

### 3.2 The component-building prompt (used for the Remotion hero)

> Component: Hero composition (Remotion).
>
> Purpose: stop the scroll and communicate in under 3 seconds that this is Parker Feirstein's portfolio. Memorable, not busy.
>
> Animation sequence (roughly 3 seconds total, then holds):
> 1. Name assembles letter-by-letter from a scrambled state (keep it restrained — 400ms, not a typewriter).
> 2. A row of role/interest tags cycles underneath: "engineer", "builder", "designer-adjacent", ending on whichever last tag we agree on.
> 3. On the last frame, the accent color (chartreuse `--color-accent`) flashes as an underline beneath the name and holds.
>
> Constraints:
> - Use our design tokens, not hardcoded hex.
> - Respect `prefers-reduced-motion` — if set, render the final static frame immediately.
> - 60fps target, no main-thread jank.
> - Must work embedded in a Next.js client component via `@remotion/player`.
>
> Do not: add sparkles, gradients, or sound. Keep it dry and deliberate.

### 3.3 The copy-iteration prompt (used on the About page draft)

> The About page draft reads too much like a LinkedIn summary. Rewrite with these constraints:
>
> - Start with a specific scene or object, not "I am a software engineer".
> - Include at least one fact only I could state (reference the bio bullets I gave you).
> - Kill every instance of: "passionate", "love", "keen", "always been".
> - The closing line should be about what I'm building now — concrete, named, present tense.
>
> Give me two passes. The second pass should cut 20% of the words from the first.

---

## 4. Revision log

Actual moments where I looked at the output, didn't like it, and changed direction.

### Revision 1: Accent color

- **First draft:** Shadcn's default near-black primary, gray palette. Safe but muted.
- **Why I changed it:** The aesthetic brief is playful/experimental. Pure neutral read as "ShadCN template" not "me." First impression = indistinguishable from 10,000 other scaffolds.
- **Change:** Added a signature chartreuse/lime accent (`oklch(0.88 0.22 130)`) used for hover states, the hero underline, and one word in the positioning statement. Kept everything else restrained so the accent stays loud.

### Revision 2: Hero animation length

- **First draft:** 6-second Remotion loop with three scenes.
- **Why I changed it:** Watched it twice and got bored on the second loop. The rubric explicitly calls out "doesn't overstay welcome."
- **Change:** Cut to ~3 seconds, hold on final frame. One scene, not three. Added a subtle hover-to-replay if the visitor actually wants it again.

### Revision 3: Contact form feedback

- **First draft:** `alert("Message sent!")` on submit.
- **Why I changed it:** Explicitly called out as the 1-pt example in the rubric. Browser alerts are a failure of imagination.
- **Change:** Inline success state with the exact message echoed back, plus a "Send another" link. No modals.

### Revision 4: Project card copy

- **First draft:** "A fast, intuitive tool for managing X."
- **Why I changed it:** Could describe any software ever written. Zero signal.
- **Change:** Led with the problem in first person: "I kept losing track of X so I built this." Then the solution. Then what broke.

---

## 5. Self-evaluation

Honest scoring against the rubric in the assignment spec.

### Part 1: Process & Direction Quality (25 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Research phase | 5 | 5 portfolios studied, notes in RESEARCH.md with specific takeaways and things I rejected. |
| Planning phase | 5 | PLAN.md written before code. Voice, audience, goals, non-goals all defined. |
| Prompt quality | 5 | Three full prompts above, each with voice/audience/constraints/iteration explicit. |
| Iteration in git | 5 | 32 focused commits at ship, `feat:` / `fix:` / `chore:` / `docs:` / `style:` prefixes, intent-describing messages. |
| Voice alignment | 3 | Site-wide copy and project #1 read as direct/dry/specific. About page is placeholder until I drop real bio bullets — self-knock 2 pts here. |

### Part 2: Hero + Remotion (15 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Remotion integration | 5 | Custom composition in `components/hero/hero-composition.tsx`, embedded via `@remotion/player` in a client component. Name letters assemble via spring, tag row cycles, signal underline sweeps on last beat. Not a stock template. |
| Hero effectiveness | 4 | Single scene, ~3s, holds on final frame. Communicates identity + accent color in well under 3s. Docking 1 pt because the "tag cycling" could use more opinionated final word than "builder." |
| Animation craft | 5 | Spring easing on letters, linear interp on underline. Respects `prefers-reduced-motion` by jumping to final frame. No jank. |

### Part 3: Portfolio Gallery (10 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Project presentation | 3 | Frat House Frenzy is full (problem / solution / stack / live / learnings). Two placeholder cards are real placeholders — will lose points on the "3 projects" requirement until replaced. |
| Gallery interaction | 5 | Tag filters with animated layout shifts via Framer Motion `AnimatePresence + layout`. Hover lifts card. Featured card spans 2 columns. Filters hide empty categories. |

### Part 4: Contact Form (5 pts)

- [x] Uses react-hook-form + zod (`components/contact/contact-form.tsx`)
- [x] Error states visible and specific (voice-matched messages in `lib/contact-schema.ts`)
- [x] Success state inline (no alert) — echoes back the address we'll reply to
- [x] Sends via Resend (stubbed with 503 until `RESEND_API_KEY` is set)
- [x] Honeypot spam protection (`website` field, silent drop on trip)

### Part 5: Design Tokens & Consistency (10 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Design tokens | 5 | All colors / spacing / radii live in `app/globals.css` under `@theme inline`. Zero inline hex in app code (verified: `git grep -nE '#[0-9a-fA-F]{3,8}' app components lib` returns only the GitHub SVG path). |
| Spacing consistency | 4 | 4/8px grid. Container widths consistent (`max-w-5xl` pages, `max-w-3xl` prose, `max-w-2xl` contact). Docking 1 pt because the hero + projects page container widths could probably be unified. |

### Part 6: Typography (10 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Font pairing | 5 | Instrument Serif (display — italic by default for extra character), Geist (body), Geist Mono (labels and nav). Three fonts, all via `next/font/google`, all optimized. |
| Type scale | 4 | h1 6xl display at page heads, h3 3xl-4xl on cards, body 18px, mono 12-14px for labels. Responsive `sm:` breakpoints. Docking 1 pt: responsive type scale could be more deliberate on mobile. |

### Part 7: Microanimations (10 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Framer Motion usage | 5 | Page transitions (`components/motion/page-transition.tsx`), scroll reveals (`components/motion/reveal.tsx`), hover lifts on cards, layout animations on filter changes. |
| Animation restraint | 5 | Every motion has purpose. `useReducedMotion` hook gates ALL animations — reduced mode renders final state instantly. No bouncy springs, no parallax for its own sake. |

### Part 8: Copywriting (10 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Voice alignment | 4 | Nav, footer, project card, contact form, and home positioning all land in the "direct, dry, specific" register. Docking 1 pt until About is replaced. |
| About page substance | 1 | Currently placeholder. Self-flagged as TODO in the page itself. Will jump to 4-5 once real bio bullets are dropped. |
| Project write-ups | 5 | Frat House Frenzy has problem-first framing, five specific lessons, and technical detail (Monte Carlo calibrator, HMAC-SHA256, Better Auth cookie edge cases). Cannot be written without knowing the work. |
| Direction test | 5 | Three full prompt examples above describe exactly how the voice was set and iterated. Not a hand-wave. |

### Part 9: Code Quality (5 pts)

- [x] `npm run lint` passes (ESLint, 0 errors, 0 warnings)
- [x] `npm run typecheck` passes (strict mode, 0 errors)
- [x] `npm run build` passes, 0 warnings (Next.js 16 Turbopack)
- [x] Components modular — no file over 200 lines; pages are thin, logic in `components/*`
- [x] CLAUDE.md present at repo root with portfolio-specific rules

### Bonus

- [x] **Dark mode (+2)** — `next-themes` with `attribute="class"`, `suppressHydrationWarning` on `<html>`, no FOUC, persisted.

Others deferred (MDX blog, OG images, analytics). Domain left on `*.vercel.app`.

### Final self-score

| Section | Max | Self-score |
|---------|----:|-----------:|
| Process & Direction | 25 | 23 |
| Hero + Remotion | 15 | 14 |
| Portfolio Gallery | 10 | 8 |
| Contact Form | 5 | 5 |
| Design Tokens | 10 | 9 |
| Typography | 10 | 9 |
| Microanimations | 10 | 10 |
| Copywriting | 10 | 6* |
| Code Quality | 5 | 5 |
| **Base total** | **100** | **89** |
| Dark mode bonus | +2 | +2 |
| **Grand total** | **120** | **91 / 100** + **2 bonus = 93** |

\* Copywriting jumps to 9 once About is replaced with real bio. Gallery jumps to 10 once projects 2 & 3 are real. So the **real ceiling of this build is ~95 base + 2 bonus = 97**, gated on:
1. Replacing two placeholder projects
2. Replacing About page placeholders
3. Adding a real GitHub link for Frat House Frenzy

Fix those three and this hits the 90–100 band ("portfolio-defining, ready to share").

---

## 6. One-paragraph reflection

Biggest thing I learned: writing the voice brief before the first line of copy is the lever. The prompts that produced good copy all started with the same three adjectives — direct, dry, specific — and anti-references like "never write 'passionate developer.'" The prompts that produced generic drafts were the ones where I forgot to set voice and just asked for "an About page." What I'd improve: the placeholder-in-place approach for About and Projects 2/3 feels wrong — better to hold those pages out of the nav entirely until they have real content, so the site ships smaller and truer rather than shipping with visible TODOs.
