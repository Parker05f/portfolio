import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built. Problems, solutions, what broke.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            projects
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-none">
            Things I&apos;ve shipped.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            Each writeup leads with the problem and ends with what broke. The
            interesting part is usually the second one.
          </p>
        </header>

        <ProjectGallery projects={projects} />
      </section>
    </PageTransition>
  );
}
