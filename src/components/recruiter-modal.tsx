"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Check,
  CheckCircle,
  Copy,
  Download,
  EnvelopeSimple,
  SealCheck,
  Sparkle,
  TrendUp,
  X,
} from "@phosphor-icons/react";
import { profile } from "@/data/portfolio";

type RecruiterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const recruiterSummaryText = `Nikhil Sai Nambula - Java Backend Developer & Distributed Systems Engineer
Experience: Java Backend Developer at Tata Consultancy Services (June 2023 - Present)
Scale: End-to-end ownership of 3 Spring Boot microservices on AWS serving 2M+ active users and 50k+ daily requests.
Key Wins:
- 30% API latency reduction via JPA/Hibernate fetch redesign (40 -> 8 DB roundtrips).
- 40% primary DB load reduction via distributed Redis caching with per-key TTLs.
- Decoupled synchronous downstreams to event-driven Kafka streaming with zero consumer lag.
- Implemented JWT & RBAC across REST APIs with comprehensive JUnit 5/Mockito test coverage.
Credentials: AWS Certified Developer - Associate (2026), 1000+ LeetCode DSA solved.
Contact: ${profile.email} | ${profile.phone}`;

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(recruiterSummaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter Snapshot"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        aria-hidden
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-bg-elev shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line p-5 sm:p-6 bg-bg">
          <div className="flex items-center gap-3.5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/15 font-mono text-base font-bold text-accent shadow-sm">
              {profile.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-500 uppercase">
                  Available for Hire
                </span>
                <span className="font-mono text-xs text-subtle">
                  Recruiter Snapshot
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                {profile.name}
              </h2>
              <p className="text-xs text-muted font-medium">
                Java Backend Developer · {profile.location}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-bg-elev-2 hover:text-fg"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          {/* Quick Pitch */}
          <p className="leading-relaxed text-muted">
            Java backend developer owning <span className="font-semibold text-fg">three Spring Boot microservices on AWS</span> serving <span className="font-semibold text-fg">2 million users and 50,000+ daily requests</span> at Tata Consultancy Services (TCS). Deep practical expertise in distributed resilience, caching hierarchies, database query optimization, and event-driven architecture.
          </p>

          {/* Core Metrics Grid */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-subtle font-semibold">
              Verified Production Metrics
            </span>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-xl border border-line bg-bg p-3">
                <span className="block font-mono text-[10px] text-accent font-bold uppercase">
                  API Latency
                </span>
                <span className="mt-1 block font-mono text-lg font-bold metric-shimmer">
                  -30%
                </span>
                <span className="block text-[10px] text-muted">JPA fetch rewrite</span>
              </div>

              <div className="rounded-xl border border-line bg-bg p-3">
                <span className="block font-mono text-[10px] text-accent font-bold uppercase">
                  DB Load
                </span>
                <span className="mt-1 block font-mono text-lg font-bold metric-shimmer">
                  -40%
                </span>
                <span className="block text-[10px] text-muted">Redis cache layer</span>
              </div>

              <div className="rounded-xl border border-line bg-bg p-3">
                <span className="block font-mono text-[10px] text-accent font-bold uppercase">
                  Throughput
                </span>
                <span className="mt-1 block font-mono text-lg font-bold metric-shimmer">
                  2M+ Users
                </span>
                <span className="block text-[10px] text-muted">50K+ req/day</span>
              </div>

              <div className="rounded-xl border border-line bg-bg p-3">
                <span className="block font-mono text-[10px] text-accent font-bold uppercase">
                  Algorithms
                </span>
                <span className="mt-1 block font-mono text-lg font-bold text-emerald-500">
                  1000+
                </span>
                <span className="block text-[10px] text-muted">LeetCode Solved</span>
              </div>
            </div>
          </div>

          {/* Target Roles & Mandate */}
          <div className="rounded-xl border border-line bg-bg p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-subtle font-semibold">
              Target Positions & Domains
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Software Development Engineer II (Backend)",
                "Distributed Systems Engineer",
                "Java / Spring Boot Microservices",
                "Cloud Systems (AWS)",
              ].map((role) => (
                <span
                  key={role}
                  className="rounded-lg bg-bg-elev-2 border border-line px-2.5 py-1 font-mono text-xs text-fg"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Credentials Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-bg p-3">
              <SealCheck size={24} className="text-accent shrink-0" weight="fill" />
              <div>
                <p className="font-mono text-xs font-bold text-fg">
                  AWS Certified Developer
                </p>
                <p className="text-[11px] text-muted">Associate (DVA-C02) · 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-line bg-bg p-3">
              <Briefcase size={24} className="text-accent shrink-0" weight="fill" />
              <div>
                <p className="font-mono text-xs font-bold text-fg">
                  Java Backend Developer at TCS
                </p>
                <p className="text-[11px] text-muted">Full-time · June 2023 - Present</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-line p-4 sm:p-5 bg-bg flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={copySummary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong bg-bg-elev px-4 py-2.5 text-xs font-semibold text-fg transition-colors hover:border-accent hover:bg-accent-soft"
          >
            {copiedSummary ? (
              <>
                <Check size={14} weight="bold" className="text-emerald-500" />
                <span className="text-emerald-500">Summary Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={14} weight="bold" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={profile.links.resume}
              download
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-fg px-4 py-2.5 text-xs font-semibold text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <Download size={14} weight="bold" />
              <span>Download Resume</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-xs font-medium text-fg hover:border-accent hover:text-accent"
            >
              <EnvelopeSimple size={14} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
