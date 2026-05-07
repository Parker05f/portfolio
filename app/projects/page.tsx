import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { PageTransition } from "@/components/motion/page-transition";
import { DecorDivider } from "@/components/decor/decor-divider";

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
            What I&apos;m building.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            One writeup for now. Problem first, what broke last. The
            interesting part is usually the second one. More will land here
            as things ship.
          </p>
        </header>

        <DecorDivider className="mb-10" />

        <ProjectGallery projects={projects} />
      </section>
    </PageTransition>
  );
}
