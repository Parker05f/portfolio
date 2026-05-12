import Link from "next/link";
import { HeroPlayer } from "@/components/hero/hero-player";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { DecorSpot } from "@/components/decor/decor-spot";
import { site } from "@/lib/site";
import { featuredProject } from "@/lib/projects";

export default function Home() {
  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="pt-10 sm:pt-16">
          <HeroPlayer name={site.name.toLowerCase()} />
        </div>

        <div className="relative mt-10 sm:mt-14 max-w-3xl">
          <div className="pointer-events-none absolute -right-2 -top-2 hidden sm:block">
            <DecorSpot variant="chrome" />
          </div>
          <span className="sr-only">{site.name}</span>
          <Reveal>
            <h1 className="text-3xl sm:text-4xl leading-tight text-balance">
              {site.positioning}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 font-mono text-sm text-muted-foreground">
              currently building{" "}
              <Link
                href={`/projects#${featuredProject.slug}`}
                className="link-underline text-foreground"
              >
                {featuredProject.name.toLowerCase()}
              </Link>{" "}
              — a 1024-ways-to-win slot engine with real math and verifiable RNG.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
              <Link
                href="/projects"
                className="rounded-md border border-foreground bg-foreground px-4 py-2 text-background transition-colors hover:bg-signal hover:text-signal-foreground hover:border-signal"
              >
                see projects →
              </Link>
              <Link
                href="/about"
                className="rounded-md border border-border px-4 py-2 transition-colors hover:border-foreground"
              >
                about
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-border px-4 py-2 transition-colors hover:border-foreground"
              >
                contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
