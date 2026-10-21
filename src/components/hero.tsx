"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  Briefcase,
  Cpu,
  Download,
  Lightning,
  MagnifyingGlass,
  Pulse,
  ShieldCheck,
} from "@phosphor-icons/react";
import { cta, heroStats, profile } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Counter } from "./counter";
import { SpotlightCard } from "./spotlight-card";
import { RecruiterModal } from "./recruiter-modal";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000,transparent_78%)]" />
        <div className="absolute -top-52 right-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_65%)] blur-3xl" />
      </div>

      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            {/* Availability status badge */}
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elev/80 py-1.5 pl-2.5 pr-3.5 backdrop-blur shadow-sm">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse-ring" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-muted">
                  {profile.availabilityNote}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-3xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1] text-fg">
                <span className="text-shimmer inline-block">Nikhil Sai Nambula</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-5 flex h-6 items-center gap-2.5 overflow-hidden font-mono text-sm sm:text-base">
                <span className="text-accent font-bold">{"//"}</span>
                <span className="relative flex h-6 items-center">
                  <span
                    aria-hidden="true"
                    className="invisible pointer-events-none select-none whitespace-nowrap"
                  >
                    Distributed Systems &amp; Reliability
                    <span className="ml-1.5 inline-block w-[7px]" />
                  </span>
                  {profile.roles.map((role, i) => (
                    <span
                      key={role}
                      className={`absolute left-0 flex items-center whitespace-nowrap transition-all duration-500 font-medium ${
                        i === roleIndex
                          ? "translate-y-0 opacity-100"
                          : "translate-y-6 opacity-0 pointer-events-none"
                      }`}
                    >
                      <span>{role}</span>
                      <span
                        aria-hidden="true"
                        className="cursor-blink ml-1.5 inline-block h-[1.15em] w-[7px] -translate-y-[1px] rounded-[1px] bg-accent align-middle shadow-[0_0_8px_var(--glow-a)]"
                      />
                    </span>
                  ))}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-[48ch] text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {profile.summary}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#architecture"
                  className="group inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                >
                  <Cpu size={16} weight="bold" />
                  {cta.architecture}
                </a>

                <button
                  type="button"
                  onClick={() => setRecruiterOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/15 px-4 py-3 text-sm font-semibold text-accent transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                >
                  <Briefcase size={16} weight="bold" />
                  <span>Recruiter Snapshot</span>
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-bg-elev px-4 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:bg-accent-soft"
                >
                  {cta.work}
                  <ArrowDown size={15} />
                </a>

                <a
                  href={profile.links.resume}
                  download
                  className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-fg"
                >
                  <Download size={16} />
                  {cta.resume}
                </a>
              </div>
            </Reveal>

            {/* Metric counters */}
            <Reveal delay={0.3}>
              <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4 sm:gap-6">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-mono text-2xl font-bold sm:text-[1.85rem] metric-shimmer">
                      <Counter
                        value={stat.numericValue}
                        suffix={stat.unit}
                      />
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-muted">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Live Distributed Systems Telemetry Console with Latency Wave */}
          <Reveal delay={0.2} className="w-full">
            <SpotlightCard className="w-full max-w-lg mx-auto lg:max-w-none shadow-card">
              {/* Terminal titlebar */}
              <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-bg">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted font-medium truncate">
                    production-cluster.tcs.aws
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-500 font-semibold">
                    Healthy · 99.98%
                  </span>
                </div>
              </div>

              {/* Console Body */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Services status rows */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                    Active Production Services
                  </span>
                  <div className="mt-2.5 space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-line bg-bg p-2.5 text-xs">
                      <div className="flex items-center gap-2.5">
                        <Pulse size={15} className="text-emerald-500" />
                        <span className="font-mono font-medium text-fg">
                          auth-service
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-muted">14ms p95</span>
                        <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-500 font-medium">
                          99.99% Uptime
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-line bg-bg p-2.5 text-xs">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={15} className="text-accent" />
                        <span className="font-mono font-medium text-fg">
                          order-orchestrator
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-muted">24ms p95</span>
                        <span className="rounded bg-accent/15 px-1.5 py-0.5 text-accent font-semibold">
                          Circuit Protected
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-line bg-bg p-2.5 text-xs">
                      <div className="flex items-center gap-2.5">
                        <Lightning size={15} className="text-blue-500" />
                        <span className="font-mono font-medium text-fg">
                          kafka-event-bus
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-muted">0 Lag</span>
                        <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-500 font-medium">
                          3 Partitions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Latency Sparkline Wave */}
                <div className="rounded-xl border border-line bg-bg p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
                      <span className="text-subtle uppercase">P95 Cluster Latency (60s)</span>
                    </div>
                    <span className="text-accent font-bold">18.4 ms avg</span>
                  </div>

                  <div className="h-14 w-full">
                    <svg
                      viewBox="0 0 320 60"
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line
                        x1="0"
                        y1="18"
                        x2="320"
                        y2="18"
                        stroke="var(--border)"
                        strokeDasharray="3 3"
                        strokeWidth="0.8"
                      />
                      <line
                        x1="0"
                        y1="38"
                        x2="320"
                        y2="38"
                        stroke="var(--border)"
                        strokeDasharray="3 3"
                        strokeWidth="0.8"
                      />
                      <path
                        d="M 0 45 Q 35 25, 70 32 T 140 28 T 210 22 T 280 26 T 320 18 L 320 60 L 0 60 Z"
                        fill="url(#waveGrad)"
                      />
                      <path
                        d="M 0 45 Q 35 25, 70 32 T 140 28 T 210 22 T 280 26 T 320 18"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="320" cy="18" r="4" fill="var(--accent)" className="animate-pulse" />
                    </svg>
                  </div>

                  <div className="flex justify-between font-mono text-[9px] text-subtle pt-0.5">
                    <span>-60s</span>
                    <span>-30s</span>
                    <span className="text-emerald-500 font-semibold">● Real-time (18.4ms)</span>
                  </div>
                </div>

                {/* Key Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-line">
                  <div className="rounded-xl border border-line bg-bg p-3">
                    <span className="font-mono text-[10px] text-subtle uppercase">
                      Redis Cache Hit Ratio
                    </span>
                    <p className="mt-1 font-mono text-xl font-bold text-fg">
                      91.4%
                    </p>
                    <span className="text-[10px] text-muted">
                      -40% primary DB load
                    </span>
                  </div>
                  <div className="rounded-xl border border-line bg-bg p-3">
                    <span className="font-mono text-[10px] text-subtle uppercase">
                      JPA Query Roundtrips
                    </span>
                    <p className="mt-1 font-mono text-xl font-bold text-accent">
                      40 → 8
                    </p>
                    <span className="text-[10px] text-muted">
                      N+1 fetch elimination
                    </span>
                  </div>
                </div>

                {/* Interactive jump link */}
                <div className="flex items-center justify-between rounded-xl border border-accent/40 bg-accent/15 dark:bg-accent-soft p-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Cpu size={16} className="text-accent" />
                    <span className="font-medium text-fg text-xs">
                      Simulate failure & recovery states
                    </span>
                  </div>
                  <a
                    href="#architecture"
                    className="font-mono text-xs font-bold text-accent hover:underline"
                  >
                    Launch Lab →
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>

      {/* Recruiter Snapshot Modal */}
      <RecruiterModal
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
      />
    </section>
  );
}
