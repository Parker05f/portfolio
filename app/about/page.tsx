import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I got here, and what I'm building now.",
};

/**
 * TODO(parker): replace this copy with your own bullets. This is currently
 * a neutral draft that sounds like "direct, dry, specific" voice but doesn't
 * say anything only you could say. Grading is explicit that this page loses
 * points if it reads as AI template. Rewrite in first person with:
 *   - a specific origin moment (not "always loved computers")
 *   - what you're currently obsessed with
 *   - a concrete next step / what you're building toward
 *   - at least one odd detail only you know
 */
export default function AboutPage() {
  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
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
              I build full-stack software. Right now that means{" "}
              <a
                href="/projects#frat-house-frenzy"
                className="underline decoration-signal decoration-2 underline-offset-4"
              >
                a crypto casino slot engine
              </a>{" "}
              calibrated to 96% RTP with HMAC-seeded RNG the player can verify.
              Before that it was smaller things — tools for myself, weekend
              experiments, a lot of half-finished ideas.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-muted-foreground italic">
              [placeholder — this section is the origin story. Where you
              grew up, how you got into code, what pulled you into building
              real things vs. toy examples. Specific beats general.]
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-muted-foreground italic">
              [placeholder — what you&apos;re currently obsessed with,
              technically. The gap between &quot;works&quot; and &quot;feels
              great&quot; is the phrase from the positioning; ground it in
              something concrete you&apos;ve chased recently.]
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p>
              What I care about when I build: the math is real, the edges hold
              up under adversarial use, and the thing actually feels good in
              your hand. Everything else is decoration.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-muted-foreground italic">
              [placeholder — what you&apos;re building toward. A year from
              now, what do you want to have shipped? One sentence is enough.]
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 rounded-lg border border-dashed border-border p-6 font-mono text-xs text-muted-foreground">
            <p className="uppercase tracking-wider">
              draft note — to be replaced
            </p>
            <p className="mt-2 normal-case">
              This About page has three placeholder paragraphs. Once you drop
              your raw bullets into chat, I&apos;ll rewrite this page in your
              voice and delete this note.
            </p>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
