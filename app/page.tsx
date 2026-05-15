import Link from "next/link";
import { HeroPlayer } from "@/components/hero/hero-player";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { site } from "@/lib/site";
import { featuredProject } from "@/lib/projects";

export default function Home() {
  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="pt-8 sm:pt-14">
          <HeroPlayer name={site.name.toLowerCase()} />
        </div>

        <span className="sr-only">{site.name}</span>

        <div className="mt-10 grid gap-12 sm:mt-16 sm:grid-cols-[1.4fr_1fr] sm:gap-16">
          <Reveal>
            <h1 className="font-display text-3xl sm:text-4xl leading-[1.1] tracking-tight text-balance">
              {site.positioning}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-6 font-mono text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  currently
                </p>
                <p className="mt-2 leading-relaxed">
                  Building{" "}
                  <Link
                    href={`/projects#${featuredProject.slug}`}
                    className="link-underline text-foreground"
                  >
                    {featuredProject.name.toLowerCase()}
                  </Link>
                  : a 1024-ways-to-win slot engine with real math and verifiable
                  RNG.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  available
                </p>
                <p className="mt-2 leading-relaxed">
                  Open to senior engineering roles and consulting.{" "}
                  <Link
                    href={`mailto:${site.email}`}
                    className="link-underline text-foreground"
                  >
                    {site.email}
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="mt-14 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.16em] sm:mt-20">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-md border border-foreground bg-foreground px-5 py-2.5 text-background transition-colors hover:bg-signal hover:text-signal-foreground hover:border-signal"
            >
              see projects
              <span
                aria-hidden
                className="inline-block translate-x-0 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-border px-5 py-2.5 transition-colors hover:border-foreground hover:text-foreground"
            >
              about
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-border px-5 py-2.5 transition-colors hover:border-foreground hover:text-foreground"
            >
              contact
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
