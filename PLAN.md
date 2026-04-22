# PLAN

> Written before the first line of feature code. Lives in the repo root for posterity.

## What this is

A personal portfolio + home on the internet. The single artifact that represents me to employers, collaborators, and anyone who wants to know who I am in under five minutes.

## Audience

Ranked by who I actually want to reach:

1. **Technical hiring managers** at product-led companies (Vercel, Linear, Stripe, Notion, early-stage YC). They scan fast. They want: what have you shipped, what was the problem, how did you reason.
2. **Indie founders and builders** looking for a collaborator. They want: do you have taste, can you ship, would this person be easy to work with.
3. **Recruiters.** They want: pattern-match on stack, clickable links, no surprises.
4. **Peers and future-me.** This is the record.

Not the audience: general public, content marketers, anyone judging by animation-for-animation's-sake.

## Voice

Three adjectives, non-negotiable: **direct, dry, specific.**

- Short sentences. Trust the reader.
- No hedging. "This broke" beats "this encountered some issues."
- Specific beats vague. Numbers, names, versions, commit hashes where useful.
- Dry humor is allowed. Corporate cheer is not. No "I'm a passionate developer with a keen eye for detail."
- First person, present tense when talking about current work. Past tense for shipped work.

Reference voices (from the research list): Rauno Freiberg's project pages, Paul Graham's essays (for rhythm, not length), Linear's changelog entries, Stripe docs.

## Aesthetic

**Playful / experimental** — but restrained by a direct voice. Think: the type wants to surprise, the copy doesn't.

Specific choices:

- **Color blocks**, not gradients. Flat planes of a signature accent (lime/chartreuse) against near-black and warm off-white.
- **Type as landmark.** Display serif for name and page titles (Instrument Serif — editorial, slightly weird italics). Body in a clean sans (Geist). Mono for code and labels (Geist Mono).
- **Grid is strict underneath, playful on top.** 8px base. Content on a narrow column. Hero and accents are allowed to break the column.
- **Motion has a budget.** Every animation earns its place. `prefers-reduced-motion` is respected everywhere.
- **Dark mode is a first-class render**, not a filter on the light palette.

## Pages

### Home (/)

- Remotion hero: name assembles on-screen, a set of tags cycle underneath, accent color lands on the last frame.
- One-line positioning statement directly below. No more than 10 words.
- Three links into the site: Projects, About, Contact.
- Footer.

**Job of this page:** stop the scroll, state what I do, get the visitor to Projects.

### Projects (/projects)

- Three case studies, each on a card with hover reveal.
- Each case study: problem, solution, stack, live link, GitHub link, one-paragraph "what broke / what I learned."
- Tag filters (tech, type) as a small nicety.

**Job of this page:** prove I ship, and that I can articulate why.

### About (/about)

- A real paragraph or two. Origin (how I got into building), current obsession, direction.
- Not a skills list. Not a resume.
- Specific details only I would know.

**Job of this page:** be unmistakably me. If you deleted my name from the top, a reader who'd met me should still guess correctly.

### Contact (/contact)

- Form: name, email, message. Validated with zod. `react-hook-form` for state.
- Honeypot field for spam. Resend for email delivery.
- Success state renders inline. No alert boxes.
- Email + social links below the form as a fallback.

**Job of this page:** make it stupid-easy to get in touch.

## Non-goals

- No blog on v1. (MDX scaffolding only if bonus is pursued later.)
- No CMS. Project copy lives in TypeScript. I'll move it to MDX if the list grows past 5.
- No Google Analytics. Vercel Analytics only if pursued as bonus.
- No cookies banner theater.

## Architecture

```
app/               # App Router pages + /api/contact
components/
  hero/            # Remotion composition + Player wrapper
  ui/              # shadcn primitives (do not hand-edit)
  nav/             # Navbar, Footer, ThemeToggle
  projects/        # ProjectCard, ProjectGrid
  contact/         # ContactForm
lib/
  projects.ts      # Project metadata (source of truth)
  site.ts          # Site-wide constants (name, URL, socials)
  utils.ts         # shadcn cn() helper
remotion/          # Remotion root config (only if needed)
```

## Quality bar

Non-negotiable before "done":

- `npm run lint` clean
- `npm run typecheck` clean
- `npm run build` clean, zero warnings
- Lighthouse performance ≥ 90, accessibility ≥ 95
- Keyboard-navigable end to end
- Works at 320px without breaking
- `prefers-reduced-motion` respected

## Bonus pursued

- Dark mode (clean, no flash, persisted). +2

Bonus deferred: MDX blog, OG images, analytics. Revisit after v1 ships.

## Timeline

- Day 0 (today): Plan, scaffold, design tokens, docs.
- Day 1: Remotion hero + home page.
- Day 2: Projects page + gallery interaction.
- Day 3: About + Contact.
- Day 4: Dark mode + a11y + responsive pass.
- Day 5: Polish pass (typography, copy), deploy, Lighthouse, self-eval.

Revisions happen in the revision log in PROCESS.md.
