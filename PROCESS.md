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
| Iteration in git | TBD | Target 30+ focused commits. Final count below. |
| Voice alignment | TBD | User to judge. Target: passes the "if my name were removed" test. |

### Part 2: Hero + Remotion (15 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Remotion integration | TBD | Custom composition, choreographed, embedded via `@remotion/player`. |
| Hero effectiveness | TBD | ~3s, name + accent underline, single scene. |
| Animation craft | TBD | Respects reduced-motion. |

### Part 3: Portfolio Gallery (10 pts)

| Dimension | Self-score | Reasoning |
|-----------|------------|-----------|
| Project presentation | TBD | Each project has problem / solution / stack / live / GitHub / learnings. |
| Gallery interaction | TBD | Hover reveal, filters. |

### Part 4: Contact Form (5 pts)

- [ ] Uses react-hook-form + zod
- [ ] Error states visible and specific
- [ ] Success state inline (no alert)
- [ ] Sends via Resend
- [ ] Honeypot spam protection

### Part 5: Design Tokens & Consistency (10 pts)

- TBD. Goal: zero inline hex anywhere in the app.

### Part 6: Typography (10 pts)

- Instrument Serif (display) + Geist (body) + Geist Mono (labels), all via `next/font`.

### Part 7: Microanimations (10 pts)

- Framer Motion page transitions and scroll reveals. Reduced-motion respected.

### Part 8: Copywriting (10 pts)

- TBD. Graded on voice alignment. Prompts above show direction.

### Part 9: Code Quality (5 pts)

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes, 0 warnings
- [ ] Components modular (no 500-line page.tsx)
- [ ] CLAUDE.md present

### Bonus

- [x] Dark mode (+2) — clean, no flash, persisted.
- [ ] Others deferred.

### Final self-score

Fills in at ship time.

---

## 6. One-paragraph reflection

Fills in at ship time.
