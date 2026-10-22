"use client";

import { useState } from "react";
import {
  ArrowsClockwise,
  Check,
  CheckCircle,
  Copy,
  GitBranch,
  Play,
  Pulse,
  Terminal,
  WarningCircle,
} from "@phosphor-icons/react";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { CircuitWireVisualizer } from "./circuit-wire-visualizer";

export function ArchitecturePlayground() {
  const [activeTab, setActiveTab] = useState<"circuit" | "topology">("circuit");

  // Circuit Breaker State
  const [failureRate, setFailureRate] = useState(15);
  const [isHalfOpen, setIsHalfOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  // Live Simulated Request Stream
  const [reqLog, setReqLog] = useState<{ id: number; text: string; type: "ok" | "fallback" | "probe" }[]>([
    { id: 1, text: "[REQ-101] GET /orders/984 → 200 OK (16ms) · DB Direct", type: "ok" },
    { id: 2, text: "[REQ-102] GET /orders/985 → 200 OK (18ms) · DB Direct", type: "ok" },
    { id: 3, text: "[REQ-103] GET /orders/986 → 200 OK (15ms) · DB Direct", type: "ok" },
  ]);

  // Topology node selection
  const [selectedNode, setSelectedNode] = useState<string>("redis");

  // Calculate Circuit Breaker Status
  const threshold = 50;
  let circuitState: "CLOSED" | "OPEN" | "HALF-OPEN" = "CLOSED";
  if (isHalfOpen) {
    circuitState = "HALF-OPEN";
  } else if (failureRate >= threshold) {
    circuitState = "OPEN";
  } else {
    circuitState = "CLOSED";
  }

  // Active presets tracking
  const isNormalActive = !isHalfOpen && failureRate === 15;
  const isOutageActive = !isHalfOpen && failureRate === 75;
  const isCanaryActive = isHalfOpen;

  // Add simulated request to stream based on current circuit state
  const sendTestRequest = () => {
    const nextId = (reqLog[reqLog.length - 1]?.id || 100) + 1;
    let entry: { id: number; text: string; type: "ok" | "fallback" | "probe" };

    if (circuitState === "CLOSED") {
      const ms = Math.floor(Math.random() * 8) + 14;
      entry = {
        id: nextId,
        text: `[REQ-${nextId}] GET /orders/${Math.floor(Math.random() * 900) + 100} → 200 OK (${ms}ms) · Primary DB`,
        type: "ok",
      };
    } else if (circuitState === "OPEN") {
      const ms = (Math.random() * 1.5 + 1).toFixed(1);
      entry = {
        id: nextId,
        text: `[REQ-${nextId}] GET /orders/${Math.floor(Math.random() * 900) + 100} → 200 FALLBACK (${ms}ms) · Stale Redis + SQS DLQ`,
        type: "fallback",
      };
    } else {
      const ms = Math.floor(Math.random() * 15) + 32;
      entry = {
        id: nextId,
        text: `[REQ-${nextId}] CANARY PROBE → 200 OK (${ms}ms) · Evaluating Health`,
        type: "probe",
      };
    }

    setReqLog((prev) => [...prev.slice(-4), entry]);
  };

  const copyCode = async () => {
    const code = `@CircuitBreaker(name = "orderService", fallbackMethod = "fallbackOrder")
@Retry(name = "orderRetry", maxAttempts = 3)
public OrderResponse processOrder(OrderRequest request) {
    return orderClient.executeWithResilience(request);
}`;
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const topologyNodes = [
    {
      id: "gateway",
      title: "API Gateway (AWS)",
      role: "Edge routing & rate limiting",
      tech: "AWS API Gateway + JWT Auth",
      metrics: "50,000+ requests/day, SSL termination, token validation",
      details:
        "Validates incoming client tokens, routes to internal Spring Boot clusters, and enforces token-bucket rate limits to prevent denial-of-service spikes.",
    },
    {
      id: "orders",
      title: "Order Orchestrator Service",
      role: "Core domain microservice",
      tech: "Java 17, Spring Boot 3, Resilience4j",
      metrics: "P95 latency: 24ms, Circuit Breaker protected",
      details:
        "Handles checkout transactions through an explicit finite state machine. Wraps downstream service calls with circuit breakers and retry policies.",
    },
    {
      id: "redis",
      title: "Distributed Redis Cluster",
      role: "High-throughput session & cache layer",
      tech: "Redis In-Memory, Key-level TTLs",
      metrics: "40% database load reduction, sub-2ms reads",
      details:
        "Stores active user sessions, inventory locks, and query cache with custom TTLs. Prevents burst traffic from hammering primary relational storage.",
    },
    {
      id: "postgres",
      title: "Relational PostgreSQL DB",
      role: "ACID persistent primary storage",
      tech: "AWS RDS PostgreSQL, JPA/Hibernate",
      metrics: "Round-trips cut from 40 to 8 per request",
      details:
        "Redesigned entity relationship fetch strategies from EAGER to LAZY with batch fetching and JOIN FETCH query plans, eliminating critical N+1 latency bugs.",
    },
    {
      id: "kafka",
      title: "Kafka Event Broker",
      role: "Asynchronous decoupling",
      tech: "Apache Kafka, Concurrency listeners",
      metrics: "Zero-loss event streaming, 3 partitioned topics",
      details:
        "Decoupled synchronous checkout calls into event-driven order events (OrderCreated, InventoryReserved), ensuring downstream services process at their own pace.",
    },
    {
      id: "dlq",
      title: "SQS Dead Letter Queue (DLQ)",
      role: "Poison message & retry isolation",
      tech: "AWS SQS + Exponential Backoff",
      metrics: "100% message retention & auto-alerting",
      details:
        "Failed messages retry 3 times with exponential backoff before landing in the DLQ. Eliminates cascading crashes and enables zero-downtime debugging.",
    },
  ];

  const currentNode =
    topologyNodes.find((n) => n.id === selectedNode) || topologyNodes[2];

  return (
    <Section id="architecture" className="bg-bg">
      <SectionHeading
        title="Distributed Systems & Reliability Lab"
        description="Interactive models demonstrating resilience patterns, caching strategies, and event-driven architecture designed for high-availability production."
      />

      {/* Tabs */}
      <div className="mt-10 sm:mt-12 flex flex-wrap gap-2 border-b border-line pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("circuit")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
            activeTab === "circuit"
              ? "bg-fg text-bg shadow-sm"
              : "border border-line bg-bg text-muted hover:text-fg"
          }`}
        >
          <Pulse size={16} />
          <span>Circuit Breaker State Machine</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("topology")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
            activeTab === "topology"
              ? "bg-fg text-bg shadow-sm"
              : "border border-line bg-bg text-muted hover:text-fg"
          }`}
        >
          <GitBranch size={16} />
          <span>Event-Driven Microservices Topology</span>
        </button>
      </div>

      {/* TAB 1: CIRCUIT BREAKER SIMULATOR */}
      {activeTab === "circuit" && (
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-line bg-bg p-6 sm:p-8 lg:p-10 shadow-card">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-line pb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  Resilience4j Pattern Simulation
                </span>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  Downstream Dependency Fault Tolerance
                </h3>
                <p className="mt-1 text-sm text-muted max-w-xl">
                  Adjust simulated failure rates to observe the state transition
                  between normal execution, fail-fast circuit opening, and
                  canary probing.
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3 self-start rounded-2xl border border-line bg-bg-elev p-3 sm:self-auto shadow-sm">
                <span className="relative flex h-3.5 w-3.5">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      circuitState === "CLOSED"
                        ? "bg-emerald-400"
                        : circuitState === "OPEN"
                        ? "bg-amber-400"
                        : "bg-blue-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-3.5 w-3.5 rounded-full ${
                      circuitState === "CLOSED"
                        ? "bg-emerald-500"
                        : circuitState === "OPEN"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  />
                </span>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-subtle">
                    Circuit Breaker Status
                  </span>
                  <span
                    className={`font-mono text-sm font-bold ${
                      circuitState === "CLOSED"
                        ? "text-emerald-500"
                        : circuitState === "OPEN"
                        ? "text-amber-500"
                        : "text-blue-500"
                    }`}
                  >
                    STATE: {circuitState}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Control Panel */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label
                      htmlFor="failure-slider"
                      className="font-medium text-fg"
                    >
                      Downstream Failure Rate
                    </label>
                    <span className="font-mono text-sm font-bold text-accent">
                      {failureRate}%
                    </span>
                  </div>
                  <input
                    id="failure-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={failureRate}
                    onChange={(e) => {
                      setFailureRate(Number(e.target.value));
                      setIsHalfOpen(false);
                    }}
                    className="mt-3 h-2 w-full cursor-pointer accent-accent"
                  />
                  <div className="mt-1 flex justify-between font-mono text-[10px] text-subtle">
                    <span>0% (Healthy)</span>
                    <span className="text-amber-500 font-semibold">50% (Trip Threshold)</span>
                    <span>100% (Critical)</span>
                  </div>
                </div>

                {/* State explanations */}
                <div className="rounded-xl border border-line bg-bg-elev p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    {circuitState === "CLOSED" ? (
                      <CheckCircle
                        size={18}
                        className="text-emerald-500"
                        weight="fill"
                      />
                    ) : circuitState === "OPEN" ? (
                      <WarningCircle
                        size={18}
                        className="text-amber-500"
                        weight="fill"
                      />
                    ) : (
                      <ArrowsClockwise
                        size={18}
                        className="text-blue-500"
                        weight="bold"
                      />
                    )}
                    <span className="font-semibold text-sm text-fg">
                      {circuitState === "CLOSED"
                        ? "System Healthy (Traffic Passed)"
                        : circuitState === "OPEN"
                        ? "Fail-Fast Protection Active"
                        : "Canary Probe State"}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted">
                    {circuitState === "CLOSED" &&
                      "Downstream failure rate is under the 50% threshold. Requests are passed directly to database and external services with full throughput."}
                    {circuitState === "OPEN" &&
                      "Error rate exceeds threshold! Circuit trips OPEN to prevent cascading thread starvation. Inbound calls instantly return fallback responses from Redis or queue into Dead Letter Queues (DLQ)."}
                    {circuitState === "HALF-OPEN" &&
                      "Trial period active. A fraction of requests are allowed through to evaluate downstream service recovery. If probes succeed, circuit resets to CLOSED."}
                  </p>
                </div>

                {/* Manual preset buttons with BOLD selected indicator (Yellow in both light and dark mode) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-subtle">
                      Simulation Presets
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-accent">
                      {isCanaryActive
                        ? "● Canary Active (Half-Open)"
                        : isOutageActive
                        ? "● Outage Active (75% Failures)"
                        : isNormalActive
                        ? "● Normal Active (15% Failures)"
                        : `● Custom (${failureRate}%)`}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {/* Button 1: Normal Traffic */}
                    <button
                      type="button"
                      onClick={() => {
                        setFailureRate(15);
                        setIsHalfOpen(false);
                      }}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-xs transition-all ${
                        isNormalActive
                          ? "border-accent bg-accent/20 dark:bg-accent/25 text-accent font-bold ring-2 ring-accent shadow-sm"
                          : "border-line bg-bg-elev text-muted hover:border-line-strong hover:text-fg"
                      }`}
                    >
                      {isNormalActive && (
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      )}
                      <span>Simulate Normal Traffic (15%)</span>
                    </button>

                    {/* Button 2: Outage */}
                    <button
                      type="button"
                      onClick={() => {
                        setFailureRate(75);
                        setIsHalfOpen(false);
                      }}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-xs transition-all ${
                        isOutageActive
                          ? "border-accent bg-accent/20 dark:bg-accent/25 text-accent font-bold ring-2 ring-accent shadow-sm"
                          : "border-line bg-bg-elev text-muted hover:border-line-strong hover:text-fg"
                      }`}
                    >
                      {isOutageActive && (
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      )}
                      <span>Simulate Outage (75%)</span>
                    </button>

                    {/* Button 3: Canary */}
                    <button
                      type="button"
                      onClick={() => setIsHalfOpen(true)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-xs transition-all ${
                        isCanaryActive
                          ? "border-accent bg-accent/20 dark:bg-accent/25 text-accent font-bold ring-2 ring-accent shadow-sm"
                          : "border-line bg-bg-elev text-muted hover:border-line-strong hover:text-fg"
                      }`}
                    >
                      {isCanaryActive && (
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      )}
                      <span>Send Canary Probe (Half-Open)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Telemetry & Live Request Stream */}
              <div className="space-y-4">
                <CircuitWireVisualizer state={circuitState} />

                <div className="rounded-xl border border-line bg-bg-elev p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-subtle">
                    Live Service Telemetry
                  </span>
                  <button
                    type="button"
                    onClick={sendTestRequest}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-soft px-2.5 py-1 font-mono text-xs font-semibold text-accent hover:border-accent"
                  >
                    <Play size={12} weight="fill" />
                    <span>Send Test Request</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-line bg-bg p-3">
                    <span className="font-mono text-[10px] text-subtle uppercase">
                      P95 Latency
                    </span>
                    <p className="mt-1 font-mono text-lg font-bold text-fg">
                      {circuitState === "OPEN"
                        ? "1.8 ms"
                        : circuitState === "HALF-OPEN"
                        ? "38 ms"
                        : "16 ms"}
                    </p>
                    <span className="text-[10px] text-muted">
                      {circuitState === "OPEN"
                        ? "Fast fallback bypass"
                        : "Normal processing"}
                    </span>
                  </div>

                  <div className="rounded-lg border border-line bg-bg p-3">
                    <span className="font-mono text-[10px] text-subtle uppercase">
                      Availability
                    </span>
                    <p className="mt-1 font-mono text-lg font-bold text-emerald-500">
                      99.98%
                    </p>
                    <span className="text-[10px] text-muted">
                      Zero unhandled 500s
                    </span>
                  </div>

                  <div className="rounded-lg border border-line bg-bg p-3">
                    <span className="font-mono text-[10px] text-subtle uppercase">
                      Active Strategy
                    </span>
                    <p className="mt-1 font-mono text-xs font-bold text-accent truncate">
                      {circuitState === "OPEN"
                        ? "Redis Stale Cache"
                        : circuitState === "HALF-OPEN"
                        ? "Exponential Retry"
                        : "Direct DB Connection"}
                    </p>
                    <span className="text-[10px] text-muted">
                      {circuitState === "OPEN" ? "DLQ Enqueued" : "Synchronous"}
                    </span>
                  </div>
                </div>

                {/* Simulated Live Traffic Log */}
                <div className="rounded-lg border border-line bg-bg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-subtle">
                    <Terminal size={14} className="text-accent" />
                    <span>Live Traffic Stream</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    {reqLog.map((log) => (
                      <div
                        key={log.id}
                        className={`truncate ${
                          log.type === "fallback"
                            ? "text-amber-500 font-medium"
                            : log.type === "probe"
                            ? "text-blue-500 font-medium"
                            : "text-muted"
                        }`}
                      >
                        {log.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code snapshot with 1-click Copy */}
                <div className="relative rounded-lg border border-line bg-bg p-3 font-mono text-[11px] text-muted">
                  <div className="flex items-center justify-between pb-2 border-b border-line mb-2">
                    <span className="text-subtle text-[10px] uppercase tracking-wider">
                      Spring Boot Resilience4j Config
                    </span>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent hover:underline"
                    >
                      {codeCopied ? (
                        <>
                          <Check size={12} className="text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-fg">
                    <span className="text-accent">@CircuitBreaker</span>(name =
                    &quot;orderService&quot;, fallback =
                    &quot;fallbackOrder&quot;)
                  </p>
                  <p className="text-fg">
                    <span className="text-accent">@Retry</span>(name =
                    &quot;orderRetry&quot;, maxAttempts = 3)
                  </p>
                  <p className="text-muted">
                    public OrderResult process(OrderReq req) &#123; ... &#125;
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* TAB 2: TOPOLOGY MAP */}
      {activeTab === "topology" && (
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-line bg-bg p-6 sm:p-8 lg:p-10 shadow-card">
            <div className="border-b border-line pb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                Production Architecture Blueprint
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                TCS Microservices & Cloud Infrastructure
              </h3>
              <p className="mt-1 text-sm text-muted max-w-2xl">
                Click on any system component below to inspect the architectural
                rationale, concurrency handling, and performance optimizations.
              </p>
            </div>

            {/* Interactive Grid of Nodes with High-Contrast Selected State */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topologyNodes.map((node) => {
                const isSelected = selectedNode === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNode(node.id)}
                    className={`flex flex-col text-left rounded-xl border p-4 transition-all ${
                      isSelected
                        ? "border-accent bg-accent/20 dark:bg-accent/25 shadow-md ring-2 ring-accent"
                        : "border-line bg-bg-elev hover:border-line-strong hover:bg-bg"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider ${
                          isSelected ? "text-accent font-bold" : "text-subtle"
                        }`}
                      >
                        {node.role}
                      </span>
                      {isSelected ? (
                        <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                      ) : (
                        <span className="h-2 w-2 rounded-full border border-line" />
                      )}
                    </div>
                    <h4 className="mt-2 text-sm font-bold text-fg">
                      {node.title}
                    </h4>
                    <span className="mt-1 font-mono text-xs text-muted">
                      {node.tech}
                    </span>
                    <span className="mt-3 font-mono text-[11px] font-bold text-accent">
                      {node.metrics}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Inspector Pane for Selected Node */}
            <div className="mt-8 rounded-xl border border-line bg-bg-elev p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                    Component Details
                  </span>
                  <h4 className="text-lg font-bold text-fg">
                    {currentNode.title}
                  </h4>
                </div>
                <span className="self-start sm:self-auto rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-muted">
                  Tech: {currentNode.tech}
                </span>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-subtle">
                    Implementation Architecture
                  </h5>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {currentNode.details}
                  </p>
                </div>
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-subtle">
                    Production Impact
                  </h5>
                  <div className="mt-2 rounded-lg border border-line bg-bg p-3.5">
                    <p className="font-mono text-xs font-semibold text-fg">
                      Key Benchmark:
                    </p>
                    <p className="mt-1 text-sm text-accent font-bold">
                      {currentNode.metrics}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
