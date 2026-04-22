/**
 * Source of truth for portfolio projects.
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
];

export const featuredProject = projects.find((p) => p.featured)!;
