"use client";

import { useState } from "react";
import {
  CaretDown,
  CaretUp,
  CheckCircle,
  Database,
  Lightning,
  MapPin,
  ShieldCheck,
  TrendUp,
  Cpu,
} from "@phosphor-icons/react";
import { experience } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { SpotlightCard } from "./spotlight-card";

export function Experience() {
  const [showOptimization, setShowOptimization] = useState(true);
  const job = experience[0]; // Primary production tenure at TCS

  return (
    <Section id="experience" className="bg-bg-elev/30">
      <SectionHeading
        title="Java Backend Engineering & Microservices"
        description="Three years building and maintaining high-throughput Spring Boot services on AWS, serving over 2 million users and 50,000+ daily requests."
      />

      <div className="mt-10 sm:mt-12">
        <Reveal>
          <SpotlightCard className="p-6 sm:p-8 lg:p-10 shadow-card">
            {/* Top Banner: Header + Primary Impact Badges */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-line pb-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-accent/15 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-accent">
                    Full-time Java Backend Role
                  </span>
                  <span className="font-mono text-xs text-subtle">
                    {job.dates}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-muted flex items-center gap-2">
                  <span>{job.company}</span>
                  <span className="text-subtle">·</span>
                  <span className="inline-flex items-center gap-1 text-xs text-subtle font-mono">
                    <MapPin size={13} />
                    {job.location}
                  </span>
                </p>
              </div>

              {/* High-Impact Stat Chips */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <div className="rounded-xl bg-bg-elev p-3 border border-line">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                    Latency
                  </span>
                  <span className="block font-mono text-base font-bold metric-shimmer sm:text-lg">
                    -30%
                  </span>
                  <span className="block text-[10px] text-muted">JPA Redesign</span>
                </div>

                <div className="rounded-xl bg-bg-elev p-3 border border-line">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                    Primary DB
                  </span>
                  <span className="block font-mono text-base font-bold metric-shimmer sm:text-lg">
                    -40% Load
                  </span>
                  <span className="block text-[10px] text-muted">Redis Caching</span>
                </div>

                <div className="rounded-xl bg-bg-elev p-3 border border-line">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                    Traffic Scale
                  </span>
                  <span className="block font-mono text-base font-bold metric-shimmer sm:text-lg">
                    2M+ Users
                  </span>
                  <span className="block text-[10px] text-muted">50K+ req/day</span>
                </div>

                <div className="rounded-xl bg-bg-elev p-3 border border-line">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-accent font-bold">
                    Event Stream
                  </span>
                  <span className="block font-mono text-base font-bold text-emerald-500 sm:text-lg">
                    0 Lag
                  </span>
                  <span className="block text-[10px] text-muted">Kafka Decoupled</span>
                </div>
              </div>
            </div>

            {/* 2-Column Asymmetric Deep Dive */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Column: Narrative + Embedded Query Optimization Case Study */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-subtle font-semibold">
                    Core Platform Mandate
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {job.summary}
                  </p>
                </div>

                {/* Embedded Interactive Case Study: N+1 Elimination */}
                <div className="rounded-2xl border border-line bg-bg-elev p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu size={16} className="text-accent" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                        Architectural Win: N+1 Query Elimination
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowOptimization((v) => !v)}
                      className="text-subtle hover:text-fg text-xs font-mono"
                    >
                      {showOptimization ? "Collapse" : "Expand"}
                    </button>
                  </div>

                  {showOptimization && (
                    <div className="space-y-3 pt-2">
                      <p className="text-xs leading-relaxed text-muted">
                        Checkout endpoints suffered from excessive database roundtrips due to default Hibernate EAGER entity relations. Redesigned query strategies using batching and JPQL JOIN FETCH to preserve database health under peak burst traffic.
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2 pt-1">
                        <div className="rounded-xl bg-red-500/5 p-3.5 border border-red-500/20">
                          <span className="font-mono text-[11px] font-bold text-red-500 uppercase">
                            Legacy JPA Strategy
                          </span>
                          <ul className="mt-2 space-y-1 font-mono text-[11px] text-muted">
                            <li>• ~40 database roundtrips / req</li>
                            <li>• N+1 query loop on items</li>
                            <li>• P95 Latency: 165ms</li>
                            <li>• DB Connection pool exhaustion</li>
                          </ul>
                        </div>

                        <div className="rounded-xl bg-emerald-500/5 p-3.5 border border-emerald-500/20">
                          <span className="font-mono text-[11px] font-bold text-emerald-500 uppercase">
                            Optimized Fetch Strategy
                          </span>
                          <ul className="mt-2 space-y-1 font-mono text-[11px] text-muted">
                            <li>• 8 database roundtrips / req</li>
                            <li>• LAZY + @BatchSize(25)</li>
                            <li>• P95 Latency: 24ms (-30%)</li>
                            <li>• 40% reduction in DB pool wait</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Key Achievements & Tech Stack */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-subtle font-semibold">
                    Production Architecture Achievements
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {job.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl bg-bg-elev p-3.5 border border-line text-xs sm:text-sm leading-relaxed"
                      >
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="text-muted">
                          <b className="font-semibold text-fg">{h.metric}</b>
                          {h.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips (Tonal, no border clutter) */}
                <div className="border-t border-line pt-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                    Core Technologies Owned
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-bg-elev-2 px-2.5 py-1 font-mono text-xs font-medium text-muted transition-colors hover:text-fg hover:bg-accent/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
