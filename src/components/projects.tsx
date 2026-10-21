"use client";

import { useState } from "react";
import { ArrowSquareOut, SlidersHorizontal } from "@phosphor-icons/react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { CaseStudyModal } from "./case-study-modal";
import { SpotlightCard } from "./spotlight-card";

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null,
  );

  const categories = [
    "All",
    "Distributed Systems",
    "Computer Vision",
    "AI & Tooling",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <Section id="projects" className="bg-bg">
      <SectionHeading
        title="Engineering Projects & System Designs"
        description="Systems built from first principles focusing on concurrency, high availability, fault-tolerance, and practical architectural patterns."
      />

      {/* Filter categories */}
      <div className="mt-10 sm:mt-12 flex flex-wrap gap-2 border-b border-line pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "bg-fg text-bg shadow-sm"
                : "border border-line bg-bg text-muted hover:border-line-strong hover:text-fg"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {filteredProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08} className="h-full">
            <SpotlightCard className="flex h-full flex-col justify-between p-6 sm:p-8 shadow-card">
              <div>
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                  <span className="rounded-md bg-accent/15 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-accent">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-subtle">
                    {project.technicalSpecs.pattern.split("&")[0]}
                  </span>
                </div>

                {/* Title, Subtitle & Blurb */}
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-fg">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {project.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.blurb}
                </p>

                {/* Engineering Highlights */}
                <ul className="mt-5 space-y-2.5">
                  {project.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Stack & Action Buttons */}
              <div className="mt-8 border-t border-line pt-5">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-bg-elev-2 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-2 rounded-xl bg-fg px-4 py-2.5 text-xs font-semibold text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                  >
                    <SlidersHorizontal size={14} weight="bold" />
                    <span>Inspect Decisions</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-bg px-3.5 py-2 text-xs font-medium text-fg transition-colors hover:border-accent hover:bg-accent-soft"
                      >
                        <span>{link.label}</span>
                        <ArrowSquareOut size={13} weight="bold" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </Section>
  );
}
