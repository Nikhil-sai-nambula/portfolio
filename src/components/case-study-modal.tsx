"use client";

import { useEffect } from "react";
import {
  CheckCircle,
  Database,
  Lightning,
  ShieldCheck,
  X,
  Cpu,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import type { Project } from "@/data/portfolio";

type CaseStudyModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        aria-hidden
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-bg-elev shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase">
                {project.category}
              </span>
              <span className="font-mono text-xs text-subtle">
                Technical Case Study
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line p-2 text-muted transition-colors hover:bg-bg-elev-2 hover:text-fg"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7">
          {/* Architecture Blueprint Strip */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-bg p-3.5">
              <div className="flex items-center gap-2 text-accent">
                <Cpu size={16} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Pattern
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-fg">
                {project.technicalSpecs.pattern}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-bg p-3.5">
              <div className="flex items-center gap-2 text-accent">
                <Lightning size={16} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Metric
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-fg">
                {project.technicalSpecs.throughputOrMetric}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-bg p-3.5">
              <div className="flex items-center gap-2 text-accent">
                <Database size={16} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Storage
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-fg">
                {project.technicalSpecs.storage}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-bg p-3.5">
              <div className="flex items-center gap-2 text-accent">
                <ShieldCheck size={16} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Resilience
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-fg">
                {project.technicalSpecs.resilience}
              </p>
            </div>
          </div>

          {/* Core Problem & Architectural Solution */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              01 // The Engineering Challenge
            </h3>
            <p className="rounded-xl border border-line bg-bg/50 p-4 text-sm leading-relaxed text-muted">
              {project.deepDive.challenge}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              02 // Architectural Solution & Implementation
            </h3>
            <p className="rounded-xl border border-line bg-bg/50 p-4 text-sm leading-relaxed text-muted">
              {project.deepDive.solution}
            </p>
          </div>

          {/* Key Engineering Decisions / Bullets */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              03 // Implementation Highlights
            </h3>
            <ul className="space-y-2.5">
              {project.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-line/60 bg-bg/30 p-3 text-xs leading-relaxed text-muted sm:text-sm"
                >
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-accent"
                    weight="bold"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Takeaway */}
          <div className="rounded-xl border border-accent/40 bg-accent-soft p-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              Key Engineering Takeaway
            </p>
            <p className="mt-1 text-sm leading-relaxed text-fg font-medium">
              {project.deepDive.keyTakeaway}
            </p>
          </div>

          {/* Stack Badges */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
              Technologies & Frameworks
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg p-4 sm:p-5">
          <span className="font-mono text-xs text-subtle">
            Architecture design by Nikhil Sai
          </span>
          <div className="flex items-center gap-2">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-fg px-4 py-2 text-xs font-semibold text-bg transition-opacity hover:opacity-90"
              >
                <span>{link.label}</span>
                <ArrowSquareOut size={14} weight="bold" />
              </a>
            ))}
            <button
              type="button"
              onClick={onClose}
              className="rounded-[10px] border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:bg-bg-elev-2 hover:text-fg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
