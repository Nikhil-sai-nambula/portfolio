"use client";

import { about } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { SpotlightCard } from "./spotlight-card";

export function About() {
  return (
    <Section id="about" className="bg-bg">
      <SectionHeading
        title="Engineering Mindset & Production Philosophy"
        description="Systems engineering grounded in measurement, resilient failure paths, and readable architectures that scale cleanly under production pressure."
      />

      {/* 2-Column Asymmetric Grid */}
      <div className="mt-10 sm:mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Left Column: Narrative Story */}
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-[1.8] text-muted sm:text-lg">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="rounded-xl border border-line bg-bg-elev p-5 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle font-semibold">
                  Current Role
                </span>
                <p className="font-mono text-sm font-bold text-fg mt-0.5">
                  Java Backend Developer · TCS
                </p>
              </div>
              <span className="rounded-lg bg-accent/15 px-3 py-1 font-mono text-xs font-bold text-accent">
                2M+ Active Users
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right Column: 4 Core Engineering Principles as SpotlightCards */}
        <div className="space-y-4">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-wider text-subtle font-semibold mb-2">
              Non-Negotiable Architecture Principles
            </h3>
          </Reveal>

          {about.principles.map((p, i) => (
            <Reveal key={p.title} delay={0.05 + i * 0.06}>
              <SpotlightCard className="p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 font-mono text-lg font-bold text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-fg tracking-tight">
                      {p.title}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
