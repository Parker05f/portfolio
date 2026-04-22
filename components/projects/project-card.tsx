"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.49 11.49 0 0 0 7.86 10.92c.57.1.78-.25.78-.55v-1.93c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.79.11 3.08.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

type Props = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      id={project.slug}
      whileHover={reduced ? undefined : { y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`group relative flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {project.tags.join(" · ")}
            {project.status !== "shipped" ? " · wip" : ""}
          </p>
          <h3 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
            {project.name}
          </h3>
        </div>
        <div className="flex shrink-0 gap-2 font-mono text-xs">
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live site`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:border-foreground hover:bg-signal hover:text-signal-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:border-foreground hover:bg-signal hover:text-signal-foreground"
            >
              <GithubIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      <p className="mt-4 text-lg leading-relaxed text-pretty">
        {project.oneLiner}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            problem
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-pretty">
            {project.problem}
          </p>
        </section>
        <section>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            solution
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-pretty">
            {project.solution}
          </p>
        </section>
      </div>

      <section className="mt-6">
        <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          stack
        </h4>
        <ul className="mt-2 flex flex-wrap gap-1.5 font-mono text-xs">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-border px-2 py-0.5 text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          what broke · what I learned
        </h4>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed">
          {project.learnings.map((lesson, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal"
              />
              <span className="text-pretty">{lesson}</span>
            </li>
          ))}
        </ul>
      </section>
    </motion.article>
  );
}
