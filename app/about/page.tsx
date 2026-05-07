import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { DecorSpot } from "@/components/decor/decor-spot";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Short version: I build full-stack software and care about the last 20% nobody else wants to finish.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="relative mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <div className="pointer-events-none absolute right-2 top-10 hidden sm:block">
          <DecorSpot variant="palm" />
        </div>
        <header className="mb-12">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            about
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-none">
            Short version.
          </h1>
        </header>

        <div className="space-y-6 text-lg leading-relaxed text-pretty">
          <Reveal>
            <p>
              I build full-stack software. The stuff I care about tends to sit
              in the gap between &quot;this works&quot; and &quot;this feels
              right&quot; — the last twenty percent that nobody else wants to
              finish.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p>
              Right now that means{" "}
              <Link
                href="/projects#frat-house-frenzy"
                className="underline decoration-signal decoration-2 underline-offset-4"
              >
                Frat House Frenzy
              </Link>
              . It&apos;s a casino slot engine. From the outside it looks like
              a game; from the inside it&apos;s a math problem, a concurrency
              problem, and a trust problem stacked on top of each other. A
              1024-ways engine calibrated to 96% RTP. RNG that the player can
              verify with a hash. Bonus rounds that resolve in a single server
              request so the client has nothing to cheat with. That&apos;s the
              job.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p>
              What I&apos;ve learned building it: specificity is everything. A
              paytable doesn&apos;t produce a 96% RTP because you asked nicely;
              it produces it because you ran five hundred thousand spins and
              iterated on the blank weights. Integer-cents floor rounding can
              make your game look like a scam that pays out zero on common
              wins. A trailing newline in an env var is the kind of bug that
              costs you a day. The math has to survive contact with reality.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p>
              What I care about when I build: the numbers are real, the edges
              hold up under adversarial use, and the thing feels good the
              hundredth time you use it, not just the first. Everything else
              is decoration.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-muted-foreground">
              You can reach me at{" "}
              <Link
                href={`mailto:${site.email}`}
                className="text-foreground underline decoration-signal decoration-2 underline-offset-4"
              >
                {site.email}
              </Link>
              , or via the{" "}
              <Link
                href="/contact"
                className="text-foreground underline decoration-signal decoration-2 underline-offset-4"
              >
                contact form
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
