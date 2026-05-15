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
        <header className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            projects · {projects.length}
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[0.95]">
            What I&apos;m
            <br />
            <span className="italic">building.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            One finished writeup, two in flight. Problem first, what broke
            last. The interesting part is usually the second one.
          </p>
        </header>

        <ProjectGallery projects={projects} />
      </section>
    </PageTransition>
  );
}
