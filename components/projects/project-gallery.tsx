"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/projects";

type Filter = "all" | Project["tags"][number];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "all" },
  { key: "production", label: "production" },
  { key: "game", label: "games" },
  { key: "tool", label: "tools" },
  { key: "experiment", label: "experiments" },
  { key: "learning", label: "learning" },
];

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.tags.includes(filter));
  }, [projects, filter]);

  // Only show filters that have at least one project
  const availableFilters = useMemo(
    () =>
      FILTERS.filter(
        (f) =>
          f.key === "all" ||
          projects.some((p) => p.tags.includes(f.key as Project["tags"][number])),
      ),
    [projects],
  );

  // Hide filter bar when there's nothing meaningful to filter
  const showFilters = projects.length > 1 && availableFilters.length > 2;

  return (
    <>
      {showFilters && (
        <div className="mb-10 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="mr-2 text-muted-foreground uppercase tracking-[0.18em]">
            filter
          </span>
          {availableFilters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`rounded-sm border px-3 py-1.5 uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={project.featured ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} featured={project.featured} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center font-mono text-sm text-muted-foreground">
          nothing here yet under{" "}
          <code className="text-foreground">{filter}</code>.
        </p>
      )}
    </>
  );
}
