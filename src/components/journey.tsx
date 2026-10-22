"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowSquareOut,
  GraduationCap,
  SealCheck,
  Trophy,
} from "@phosphor-icons/react";
import {
  certifications,
  cta,
  education,
  leetcodeStats,
  profile,
} from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { SpotlightCard } from "./spotlight-card";

export function Journey() {
  const [activeDsaTopic, setActiveDsaTopic] = useState<string>("Dynamic Programming");

  const dsaPatternsMap: Record<
    string,
    { patterns: string[]; problemHighlights: string[] }
  > = {
    "Dynamic Programming": {
      patterns: [
        "0/1 & Unbounded Knapsack",
        "Longest Common Subsequence (LCS)",
        "Matrix Exponentiation & State DP",
        "Interval & Tree DP",
      ],
      problemHighlights: [
        "Coin Change & Knapsack variations",
        "Edit Distance & Regular Expression Matching",
        "Burst Balloons (Hard)",
      ],
    },
    "Graph & Tree Algorithms": {
      patterns: [
        "Dijkstra & Shortest Path Algorithms",
        "Topological Sorting (Kahn's)",
        "Disjoint Set Union (DSU with Path Compression)",
        "Tarjan's Strongly Connected Components",
      ],
      problemHighlights: [
        "Course Schedule I & II",
        "Alien Dictionary (Hard)",
        "Lowest Common Ancestor (Binary Lifting)",
      ],
    },
    "Binary Search & Sorting": {
      patterns: [
        "Monotonic Feasibility Binary Search",
        "Rotated Sorted Array Bisection",
        "Quickselect (Kth Largest Element in O(N))",
      ],
      problemHighlights: [
        "Median of Two Sorted Arrays (Hard)",
        "Split Array Largest Sum (Hard)",
        "Search in Rotated Sorted Array",
      ],
    },
    "Sliding Window & Pointers": {
      patterns: [
        "Variable-Length Frequency Maps",
        "Monotonic Deque (Sliding Window Maximum)",
        "Two-Pointer Squeeze & Partitioning",
      ],
      problemHighlights: [
        "Minimum Window Substring (Hard)",
        "Trapping Rain Water (Hard)",
        "Longest Substring Without Repeating Characters",
      ],
    },
    "Heaps, Tries & Design": {
      patterns: [
        "Dual Heap Running Median",
        "Prefix Tree with Bitwise Optimization",
        "Doubly Linked List + Hash Map (O(1) Design)",
      ],
      problemHighlights: [
        "LRU Cache & LFU Cache (Hard)",
        "Find Median from Data Stream (Hard)",
        "Word Search II (Trie + DFS, Hard)",
      ],
    },
  };

  return (
    <Section id="journey" className="bg-bg-elev/30">
      <SectionHeading
        title="Credentials, Problem Solving & Education"
        description="Strong theoretical fundamentals in algorithms and distributed computing backed by recognized certifications and continuous problem solving."
      />

      {/* LeetCode Special Section with SpotlightCard */}
      <Reveal className="mt-10 sm:mt-12">
        <SpotlightCard className="p-6 sm:p-8 lg:p-10 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/40 bg-accent/15 dark:bg-accent-soft text-accent">
                <Trophy size={24} weight="fill" />
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
                  Competitive Problem Solving
                </span>
                <h3 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  LeetCode: 1,000+ Algorithmic Problems Solved
                </h3>
              </div>
            </div>

            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-line bg-bg px-4 py-2 font-mono text-xs font-semibold text-fg transition-colors hover:border-accent hover:text-accent shadow-sm"
            >
              <span>View LeetCode Profile</span>
              <ArrowSquareOut size={14} weight="bold" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-line bg-bg p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                Total Solved
              </span>
              <p className="mt-1 font-mono text-2xl font-bold text-accent sm:text-3xl">
                {leetcodeStats.total}+
              </p>
              <span className="text-xs text-muted">Across all categories</span>
            </div>

            <div className="rounded-xl border border-line bg-bg p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                Medium / Hard Ratio
              </span>
              <p className="mt-1 font-mono text-2xl font-bold text-fg sm:text-3xl">
                {leetcodeStats.medium + leetcodeStats.hard}
              </p>
              <span className="text-xs text-emerald-500 font-semibold">
                63% advanced difficulty
              </span>
            </div>

            <div className="rounded-xl border border-line bg-bg p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                Global Ranking
              </span>
              <p className="mt-1 font-mono text-2xl font-bold text-fg sm:text-3xl">
                {leetcodeStats.ranking}
              </p>
              <span className="text-xs text-muted">Top competitive percentile</span>
            </div>

            <div className="rounded-xl border border-line bg-bg p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                Contest Rating
              </span>
              <p className="mt-1 font-mono text-2xl font-bold text-accent sm:text-3xl">
                {leetcodeStats.contestRating}
              </p>
              <span className="text-xs text-muted">Biweekly & Weekly Contests</span>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="mt-6 space-y-3 rounded-xl border border-line bg-bg p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted">Difficulty Distribution</span>
              <span className="text-fg font-semibold">
                Easy: {leetcodeStats.easy} · Medium: {leetcodeStats.medium} · Hard: {leetcodeStats.hard}
              </span>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-bg-elev-2">
              <div
                style={{ width: `${(leetcodeStats.easy / leetcodeStats.total) * 100}%` }}
                className="bg-emerald-500"
                title={`Easy: ${leetcodeStats.easy}`}
              />
              <div
                style={{ width: `${(leetcodeStats.medium / leetcodeStats.total) * 100}%` }}
                className="bg-amber-500"
                title={`Medium: ${leetcodeStats.medium}`}
              />
              <div
                style={{ width: `${(leetcodeStats.hard / leetcodeStats.total) * 100}%` }}
                className="bg-red-500"
                title={`Hard: ${leetcodeStats.hard}`}
              />
            </div>

            {/* Core DSA Topics - Interactive click-to-preview */}
            <div className="pt-3 border-t border-line">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                  Algorithmic Mastery (Click to inspect patterns)
                </span>
                <span className="font-mono text-[10px] text-accent font-semibold hidden sm:inline">
                  Active: {activeDsaTopic}
                </span>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {leetcodeStats.topTopics.map((topic) => {
                  const isActive = activeDsaTopic === topic.name;
                  return (
                    <button
                      key={topic.name}
                      type="button"
                      onClick={() => setActiveDsaTopic(topic.name)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                        isActive
                          ? "border-accent bg-accent/20 dark:bg-accent/25 text-accent font-bold ring-2 ring-accent shadow-sm"
                          : "border-line bg-bg-elev text-muted hover:border-line-strong hover:text-fg"
                      }`}
                    >
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
                      <span>{topic.name}</span>
                      <span className="text-accent font-semibold">({topic.count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Pattern Details Box */}
              {activeDsaTopic && dsaPatternsMap[activeDsaTopic] && (
                <div className="mt-4 rounded-xl border border-line bg-bg-elev p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent uppercase">
                      Core Paradigms & Invariants: {activeDsaTopic}
                    </span>
                    <span className="font-mono text-[10px] text-subtle">O(log N) & O(N) optimizations</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-line bg-bg p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-subtle font-semibold">
                        Mastered Sub-patterns
                      </span>
                      <ul className="mt-1.5 space-y-1 font-mono text-xs text-muted">
                        {dsaPatternsMap[activeDsaTopic].patterns.map((p) => (
                          <li key={p}>• {p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-line bg-bg p-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-subtle font-semibold">
                        Notable Problem Benchmarks
                      </span>
                      <ul className="mt-1.5 space-y-1 font-mono text-xs text-muted">
                        {dsaPatternsMap[activeDsaTopic].problemHighlights.map((ph) => (
                          <li key={ph}>• {ph}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SpotlightCard>
      </Reveal>

      {/* Grid: Education + AWS Certification */}
      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Education (3 cols) */}
        <Reveal className="lg:col-span-3 h-full">
          <SpotlightCard className="flex h-full flex-col p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 dark:bg-accent-soft text-accent">
                <GraduationCap size={20} weight="fill" />
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
                  {education.dates}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  {education.school}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-fg">{education.degree}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              {education.location} · <span className="font-bold text-accent">{education.gpa}</span>
            </p>

            <div className="mt-6 border-t border-line pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                Key Computer Science Coursework
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <li
                    key={c}
                    className="rounded-md border border-line bg-bg px-2.5 py-1 text-xs text-muted font-mono"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <a
                href={profile.links.resume}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-fg px-4 py-2.5 text-xs font-semibold text-bg transition-opacity hover:opacity-90 shadow-sm"
              >
                <ArrowDown size={14} weight="bold" />
                <span>{cta.resume}</span>
              </a>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Certifications (2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={(i + 1) * 0.08}>
              <SpotlightCard className="p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 dark:bg-accent-soft text-accent">
                    <SealCheck size={22} weight="fill" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                        {cert.year}
                      </span>
                      <span className="font-mono text-xs text-subtle">
                        {cert.issuer}
                      </span>
                    </div>
                    <h4 className="mt-2 text-base font-bold text-fg">
                      {cert.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {cert.detail}
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
