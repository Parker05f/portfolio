/**
 * Source of truth for portfolio projects.
 *
 * TODO(parker): replace the two placeholder entries at the bottom with real
 * work. Each entry needs: problem, solution, tech stack, links, learnings.
 * See `frat-house-frenzy` for the voice and depth target.
 */

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  solution: string;
  stack: string[];
  tags: ("production" | "game" | "tool" | "experiment" | "learning")[];
  links: {
    live?: string;
    github?: string;
  };
  learnings: string[];
  featured: boolean;
  status: "shipped" | "in-progress" | "archived";
};

export const projects: Project[] = [
  {
    slug: "frat-house-frenzy",
    name: "Frat House Frenzy",
    oneLiner:
      "A production-grade crypto casino slot engine with Nolimit City-tier math, animations, and provable fairness.",
    problem:
      "Most indie slot clones are visually obvious scams — invisible wins, fake multipliers, hand-wavy RNG. I wanted to see if a one-person build could hold up to the real thing.",
    solution:
      "A 1024-ways-to-win engine with cascading reels, a calibrated 96% RTP, honest multiplier math, and HMAC-SHA256 server-seeded RNG that's cryptographically verifiable by the player. Every bonus feature resolves server-side in a single API call so the client only animates the result.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Drizzle",
      "Postgres (Neon)",
      "Better Auth",
      "Vercel Fluid Compute",
      "Canvas 2D",
      "Web Audio API",
      "Gemini (nanobanana)",
    ],
    tags: ["production", "game"],
    links: {
      live: "https://frathousefrenzy.vercel.app",
      github: "",
    },
    learnings: [
      "Casino math is its own discipline. Hand-tuned paytables produce 80% or 140% RTP, not 96%. Ended up writing a Monte Carlo calibrator (500K spins × 5 seeds) that iterates on reel blank weights until it converges.",
      "Integer-cents floor rounding made common 3-of-a-kind payouts render as $0.00 — the game looked like a scam because technically it was paying zero. The math has to survive the floor function.",
      "Bonus rounds must resolve server-side in one request. Any client-side state means a malicious client can re-roll. xNudge wilds, Mystery Cups, Tip Jar jackpots, Full Send — all one API call that the client only animates.",
      "Hardcoded ROW_COUNT = 4 in the Canvas renderer silently broke every expanded-grid bonus for weeks. The rows prop was declared but never read. Lesson: props you don't use will bite you.",
      "Better Auth cookie names differ by protocol (better-auth.session_token on HTTP vs __Secure-better-auth.session_token on HTTPS). A trailing \\n in BETTER_AUTH_URL threw 403s on every login. Env vars need to be treated as data, not strings.",
    ],
    featured: true,
    status: "shipped",
  },

  // TODO(parker): replace with a real second project — even something small
  // (a tool you built for yourself, a course project, a weekend hack) counts.
  // Delete this placeholder once replaced. The rubric wants 3 projects total.
  {
    slug: "placeholder-2",
    name: "Project two — placeholder",
    oneLiner: "Something I built that I haven't written up yet.",
    problem:
      "Replace this copy with the real problem this project solves, in first person, one or two sentences.",
    solution:
      "Replace with what you actually built, the interesting technical choice, and the result.",
    stack: ["TypeScript"],
    tags: ["tool"],
    links: {},
    learnings: [
      "Replace with a concrete lesson — something that broke, something that surprised you, something you'd do differently.",
    ],
    featured: false,
    status: "in-progress",
  },

  {
    slug: "placeholder-3",
    name: "Project three — placeholder",
    oneLiner: "Another small thing worth showing.",
    problem: "Replace this copy.",
    solution: "Replace this copy.",
    stack: ["TypeScript"],
    tags: ["experiment"],
    links: {},
    learnings: ["Replace with a real lesson."],
    featured: false,
    status: "in-progress",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
