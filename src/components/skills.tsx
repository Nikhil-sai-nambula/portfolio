"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle,
  Cloud,
  Code,
  Cpu,
  Cube,
  Database,
  GearSix,
  Lightning,
  MagnifyingGlass,
  ShareNetwork,
  ShieldCheck,
  Terminal,
  X,
} from "@phosphor-icons/react";
import { skillClusters } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

type IconComponent = React.ComponentType<{
  size?: number;
  className?: string;
  weight?: "bold" | "regular" | "fill" | "duotone" | "thin" | "light";
}>;

const groupIconMap: Record<string, IconComponent> = {
  Languages: Code,
  "Low-level design": Cube,
  "Frameworks & APIs": Cpu,
  "Distributed Architecture": ShareNetwork,
  "Data stores": Database,
  "AWS Infrastructure": Cloud,
  "DevOps & Testing": GearSix,
};

type SkillImpact = {
  summary: string;
  metric: string;
  context: string;
  domain: string;
};

const skillImpactMap: Record<string, SkillImpact> = {
  // Languages
  Java: {
    summary: "Primary core language for 3+ years in high-throughput enterprise systems with Java 17/21 records, streams, and virtual threads.",
    metric: "50,000+ daily reqs",
    context: "TCS Production & ShopVerse",
    domain: "Core Language",
  },
  Python: {
    summary: "Used for automation scripts, rapid algorithmic prototyping, and backend tooling pipelines.",
    metric: "1000+ LeetCode Solved",
    context: "Tooling & Algorithms",
    domain: "Scripting & DSA",
  },
  "C++": {
    summary: "Deep foundational systems programming, memory management principles, and algorithmic problem solving.",
    metric: "DSA Mastery",
    context: "Core Systems Fundamentals",
    domain: "Systems Foundations",
  },
  JavaScript: {
    summary: "Full-stack frontend integration, asynchronous event-driven consumption, and TypeScript web interfaces.",
    metric: "Full-Stack Fluency",
    context: "Web Platforms & Tooling",
    domain: "Frontend & Scripting",
  },
  SQL: {
    summary: "Complex relational queries, indexing strategies, execution plan analysis (EXPLAIN ANALYZE), and schema normalization.",
    metric: "Optimized Relational Schema",
    context: "Data Modeling & Queries",
    domain: "Query Optimization",
  },

  // Low-level design
  "SOLID principles": {
    summary: "Strict OOP abstraction boundaries and interface segregation allowing modular service extension without regression.",
    metric: "Clean Architecture",
    context: "Microservice Domain Modules",
    domain: "Low-Level Design",
  },
  "Strategy Pattern": {
    summary: "Encapsulated dynamic calculation algorithms (pricing strategies, discount rules, payment routing) swappable at runtime.",
    metric: "LLD Pattern Mastery",
    context: "ShopVerse & TCS Business Logic",
    domain: "Low-Level Design",
  },
  "Factory Pattern": {
    summary: "Decoupled object instantiation for multi-tenant service providers, notifications, and payment gateway routing.",
    metric: "Runtime Decoupling",
    context: "Modular Service Instantiation",
    domain: "Low-Level Design",
  },
  "Observer Pattern": {
    summary: "Decoupled event listener dispatching for order state changes, notifications, and asynchronous audit trails.",
    metric: "Loose Coupling",
    context: "Event Dispatching",
    domain: "Low-Level Design",
  },
  "Singleton Pattern": {
    summary: "Thread-safe double-checked locking instances for configuration managers, cache managers, and client connection pools.",
    metric: "Thread-Safe Memory",
    context: "Client Pool Management",
    domain: "Low-Level Design",
  },
  "State Machine": {
    summary: "Explicit finite state machines preventing invalid order lifecycle transitions, race conditions, and workflow deadlocks.",
    metric: "Deterministic Flow",
    context: "ShopVerse & TCS Order Flow",
    domain: "Low-Level Design",
  },

  // Frameworks & APIs
  "Spring Boot": {
    summary: "Primary enterprise framework powering 3 microservices with Resilience4j circuit breakers, Spring Security, and REST APIs.",
    metric: "3 Microservices Owned",
    context: "TCS Enterprise Platform",
    domain: "Enterprise Backend",
  },
  "Spring Security": {
    summary: "Stateless JWT authentication, role-based access control (RBAC), method-level security, and token revocation lists.",
    metric: "2M+ User Auth",
    context: "API Security Layer",
    domain: "Security & Auth",
  },
  "REST APIs": {
    summary: "Contract-first OpenAPI compliant interfaces designed for idempotent retries, rate limiting, and fast JSON serialization.",
    metric: "Sub-25ms P95 Latency",
    context: "Internal & External APIs",
    domain: "API Contracts",
  },
  gRPC: {
    summary: "High-performance inter-service communication using Protocol Buffers and multiplexed HTTP/2 binary streams.",
    metric: "High-Throughput IPC",
    context: "Service-to-Service Comms",
    domain: "Inter-Service IPC",
  },
  Hibernate: {
    summary: "Second-level caching, lazy loading optimization, transaction boundary tuning, and batch insert configurations.",
    metric: "4x Query Efficiency",
    context: "ORM Layer Optimization",
    domain: "ORM Architecture",
  },
  JPA: {
    summary: "Rewrote Hibernate fetch plans, query graphs, and JPQL batch fetching to completely eliminate N+1 queries.",
    metric: "40 -> 8 DB Roundtrips",
    context: "Order Query Pipeline",
    domain: "Persistence Optimization",
  },

  // Distributed Architecture
  Microservices: {
    summary: "Domain-driven architecture with independent deployability, separate data stores, contract tests, and graceful degradation.",
    metric: "2M+ Active Users",
    context: "Scalable Distributed Platform",
    domain: "Distributed Systems",
  },
  "Event-driven architecture": {
    summary: "Asynchronous pub-sub topology ensuring event durability, message ordering, and consumer backpressure handling.",
    metric: "Zero Data Loss",
    context: "Order Lifecycle Streaming",
    domain: "Distributed Systems",
  },
  Kafka: {
    summary: "Event streaming platform decoupling synchronous downstream services into partitioned, ordered topics.",
    metric: "0 Consumer Lag",
    context: "Decoupled 3 Downstreams",
    domain: "Message Streaming",
  },
  "Kafka message queues": {
    summary: "Event streaming platform decoupling synchronous downstream services into partitioned, ordered topics.",
    metric: "0 Consumer Lag",
    context: "Decoupled 3 Downstreams",
    domain: "Message Streaming",
  },
  "Resilience4j Circuit Breakers": {
    summary: "Fail-fast fault tolerance with automated fallback responses and self-healing half-open probe testing.",
    metric: "Zero Cascade Failures",
    context: "Fault-Tolerant Gateways",
    domain: "Fault Tolerance",
  },
  "Dead-letter queues": {
    summary: "Automated poison pill message isolation to prevent blocking main consumer pipelines during transient failures.",
    metric: "Zero Silent Drops",
    context: "Kafka Reliability Pipeline",
    domain: "Fault Tolerance",
  },
  "Distributed caching": {
    summary: "Multi-tier caching with Redis cluster and local near-cache to offload read-heavy traffic from PostgreSQL.",
    metric: "-40% Primary DB Load",
    context: "High-Throughput Read Layer",
    domain: "Distributed Caching",
  },
  "High availability": {
    summary: "Stateless container deployments across multiple availability zones with automated health checks and rolling deploys.",
    metric: "99.98% Service Uptime",
    context: "Production SLA",
    domain: "Reliability & Uptime",
  },
  "CAP theorem": {
    summary: "Architectural decision making navigating consistency vs availability trade-offs in distributed data partitions.",
    metric: "Architectural Rigor",
    context: "Distributed Systems Design",
    domain: "Systems Theory",
  },

  // Data Stores
  PostgreSQL: {
    summary: "Primary relational storage, composite indexing, connection pool tuning with HikariCP, and ACID transaction guarantees.",
    metric: "-30% Query Latency",
    context: "Enterprise Data Layer",
    domain: "Relational Persistence",
  },
  MySQL: {
    summary: "Relational database schema design, foreign key constraints, and transactional query execution.",
    metric: "ACID Transactions",
    context: "Relational Storage",
    domain: "Relational Persistence",
  },
  MongoDB: {
    summary: "Document store for dynamic schemas, unstructured product catalogs, and fast denormalized lookups.",
    metric: "Flexible Schema",
    context: "Catalog Store",
    domain: "Document NoSQL",
  },
  Redis: {
    summary: "Distributed session and cache layer with custom per-key TTL policies, token bucket rate limits, and Pub/Sub.",
    metric: "-40% Primary DB Load",
    context: "Burst Traffic Resilience",
    domain: "In-Memory Datastore",
  },
  Elasticsearch: {
    summary: "Full-text fuzzy search, log indexing, and millisecond query lookups across large product and log datasets.",
    metric: "Sub-15ms Search",
    context: "Search & Log Aggregation",
    domain: "Search & Analytics",
  },

  // AWS Infrastructure
  AWS: {
    summary: "Certified Developer Associate (2026). Architected EC2, Lambda, SQS DLQs, API Gateway, and EKS deployments.",
    metric: "AWS Certified Developer",
    context: "Cloud Infrastructure",
    domain: "Cloud Architecture",
  },
  EC2: {
    summary: "Virtual compute management, security group hardening, and container host provisioning in Amazon VPC.",
    metric: "Cloud Compute",
    context: "AWS Cloud Host",
    domain: "Cloud Infrastructure",
  },
  S3: {
    summary: "Durable cloud object storage for application assets, database snapshots, and build artifacts.",
    metric: "11 9s Durability",
    context: "Object Storage",
    domain: "Cloud Infrastructure",
  },
  Lambda: {
    summary: "Serverless functions triggered by S3 and SQS events for asynchronous background file processing.",
    metric: "Serverless Compute",
    context: "Event-Driven Tasks",
    domain: "Cloud Infrastructure",
  },
  DynamoDB: {
    summary: "Managed single-digit millisecond latency NoSQL key-value store optimized for fast partitioned queries.",
    metric: "Sub-10ms Reads",
    context: "NoSQL Key-Value Store",
    domain: "Cloud Infrastructure",
  },
  "API Gateway": {
    summary: "Managed entrypoint with route forwarding, rate limiting, request validation, and CORS handling.",
    metric: "Edge Routing",
    context: "API Ingress",
    domain: "Cloud Infrastructure",
  },
  SQS: {
    summary: "Decoupled asynchronous message queue with Dead Letter Queue redrive policies for resilient task execution.",
    metric: "Zero Message Loss",
    context: "Asynchronous Queueing",
    domain: "Cloud Infrastructure",
  },
  EKS: {
    summary: "Managed Kubernetes service orchestrating microservice pod clusters with zero-downtime rolling upgrades.",
    metric: "Container Orchestration",
    context: "Managed Kubernetes",
    domain: "Cloud Infrastructure",
  },
  CloudWatch: {
    summary: "Application metrics, automated threshold alarms, and centralized container log aggregation.",
    metric: "Real-Time Telemetry",
    context: "Production Observability",
    domain: "Observability",
  },
  "X-Ray": {
    summary: "Distributed tracing across microservice boundaries to inspect latency propagation and bottlenecks.",
    metric: "Distributed Tracing",
    context: "Latency Profiling",
    domain: "Observability",
  },

  // DevOps & Testing
  Git: {
    summary: "Branching strategies (Trunk-based & Gitflow), clean rebase workflows, and atomic semantic commits.",
    metric: "Clean Version Control",
    context: "Source Management",
    domain: "DevOps & Tooling",
  },
  "GitHub Actions": {
    summary: "Automated CI/CD pipelines executing linting, unit testing, Docker image building, and deployment checks.",
    metric: "Automated CI/CD",
    context: "Build & Release Pipeline",
    domain: "CI/CD Automation",
  },
  Docker: {
    summary: "Containerized multi-stage production images with minimal footprint and rapid cold-start times.",
    metric: "CI/CD Deployment",
    context: "Containerized Microservices",
    domain: "Containerization",
  },
  Kubernetes: {
    summary: "Managed pod autoscaling, zero-downtime rolling deployments, and cluster health monitoring.",
    metric: "99.98% Service Uptime",
    context: "Production Orchestration",
    domain: "Orchestration",
  },
  Terraform: {
    summary: "Infrastructure as Code defining repeatable cloud resources, security groups, and VPC networks.",
    metric: "Declarative Infra",
    context: "IaC Cloud Provisioning",
    domain: "Infrastructure as Code",
  },
  Linux: {
    summary: "Enterprise server administration, shell scripting, systemd service management, and networking diagnostics.",
    metric: "Enterprise Server OS",
    context: "Server Runtime",
    domain: "Server Systems",
  },
  Maven: {
    summary: "Project dependency lifecycle management, multi-module builds, and reproducible JAR packaging.",
    metric: "Build Automation",
    context: "Java Ecosystem",
    domain: "Build Tooling",
  },
  "JUnit 5": {
    summary: "Comprehensive unit testing with parameterized tests, assertions, and test life-cycle hooks.",
    metric: ">85% Code Coverage",
    context: "Quality Assurance",
    domain: "Testing & Quality",
  },
  Mockito: {
    summary: "Mocking dependencies, verifying method call contracts, and behavior-driven unit tests.",
    metric: "Isolated Unit Tests",
    context: "Backend Testing",
    domain: "Testing & Quality",
  },
  JMeter: {
    summary: "Performance load testing, stress testing burst traffic scenarios, and measuring P95/P99 latency.",
    metric: "Load & Stress Testing",
    context: "Benchmarking",
    domain: "Performance Testing",
  },
  React: {
    summary: "Modern component-driven UI integration, Next.js architecture, and full-stack frontend fluency.",
    metric: "Full-Stack Proficiency",
    context: "Frontend Architecture",
    domain: "Frontend Architecture",
  },
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("Spring Boot");

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "languages", label: "Languages & LLD" },
    { id: "backend", label: "Backend & Distributed" },
    { id: "cloud", label: "Data, Cloud & DevOps" },
  ];

  const filteredClusters = useMemo(() => {
    let clusters =
      activeCategory === "all"
        ? skillClusters
        : skillClusters.filter((c) => c.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      clusters = clusters
        .map((cluster) => {
          const filteredGroups = cluster.groups
            .map((g) => ({
              ...g,
              items: g.items.filter((item) => item.toLowerCase().includes(q)),
            }))
            .filter((g) => g.items.length > 0);

          return { ...cluster, groups: filteredGroups };
        })
        .filter((c) => c.groups.length > 0);
    }

    return clusters;
  }, [activeCategory, searchQuery]);

  // Flatten all visible groups for a clean, cohesive layout
  const visibleGroups = useMemo(() => {
    return filteredClusters.flatMap((c) => c.groups);
  }, [filteredClusters]);

  const activeImpact =
    skillImpactMap[selectedSkill] || {
      summary: "Applied across production backend services and distributed systems pipelines.",
      metric: "Production Verified",
      context: "Enterprise Systems",
      domain: "Backend Engineering",
    };

  return (
    <Section id="skills" className="bg-bg-elev/20">
      <SectionHeading
        title="Technical Arsenal & Core Competencies"
        description="Applied in real production systems serving millions of requests, focused on backend resilience, clean architecture, and distributed data pipelines."
      />

      {/* Filter and Search Bar */}
      <div className="mt-8 sm:mt-10 flex flex-col gap-3.5 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery("");
              }}
              className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
                activeCategory === cat.id && !searchQuery
                  ? "bg-fg text-bg shadow-sm"
                  : "border border-line bg-bg-elev text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <MagnifyingGlass
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
          />
          <input
            type="text"
            placeholder="Search skills (e.g. Redis, Kafka)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-line bg-bg-elev py-1.5 pl-8 pr-7 font-mono text-xs text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-subtle hover:text-fg"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Main Balanced 2-Column Cockpit Layout */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr] xl:grid-cols-[410px_1fr] items-start">
        {/* Left Column: Dedicated Sticky Production Impact Inspector */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-line bg-bg-elev/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm space-y-5">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-contrast shadow-sm font-mono text-sm font-bold">
                  {selectedSkill.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                    <ShieldCheck size={13} weight="bold" />
                    <span>Verified Production Impact</span>
                  </div>
                  <h3 className="text-xl font-bold text-fg tracking-tight mt-0.5">
                    {selectedSkill}
                  </h3>
                </div>
              </div>

              <span className="rounded-lg bg-bg border border-line px-2.5 py-1 font-mono text-[11px] text-subtle shrink-0">
                {activeImpact.domain}
              </span>
            </div>

            {/* Production Metric Display */}
            <div className="rounded-xl border border-accent/25 bg-accent/5 dark:bg-accent/10 p-4">
              <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                Key Performance Benchmark
              </span>
              <span className="mt-1 block font-mono text-xl sm:text-2xl font-bold metric-shimmer">
                {activeImpact.metric}
              </span>
              <span className="mt-1 block font-mono text-xs text-subtle">
                Environment: {activeImpact.context}
              </span>
            </div>

            {/* Implementation Summary */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-subtle">
                Production Implementation
              </span>
              <p className="text-sm leading-relaxed text-muted">
                {activeImpact.summary}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs font-mono text-subtle">
              <span className="flex items-center gap-1.5 text-accent font-semibold">
                <Lightning size={13} weight="fill" />
                Live Inspection Active
              </span>
              <span>Click any skill to inspect</span>
            </div>
          </div>
        </div>

        {/* Right Column: Unified, Dense Skill Clusters with Zero Nested Cards */}
        <div className="space-y-6">
          {visibleGroups.length === 0 ? (
            <div className="rounded-2xl border border-line bg-bg-elev p-8 text-center text-sm text-muted">
              No technologies match &ldquo;{searchQuery}&rdquo;. Try clearing your search query.
            </div>
          ) : (
            visibleGroups.map((group, gi) => {
              const GroupIcon = groupIconMap[group.label] || Terminal;

              return (
                <Reveal key={group.label} delay={gi * 0.04}>
                  <div className="rounded-2xl border border-line bg-bg-elev/60 p-5 sm:p-6 shadow-xs transition-colors hover:border-line-strong">
                    <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                      <div className="flex items-center gap-2 text-accent">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent/15 text-accent border border-accent/25">
                          <GroupIcon size={14} weight="bold" />
                        </span>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-fg">
                          {group.label}
                        </h4>
                      </div>
                      <span className="font-mono text-[11px] text-subtle">
                        {group.items.length} technologies
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const isSelected = selectedSkill === item;

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSelectedSkill(item)}
                            className={`group inline-flex items-center rounded-xl px-3 py-1.5 font-mono text-xs transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                              isSelected
                                ? "border border-accent bg-accent/20 dark:bg-accent/25 text-accent font-bold ring-2 ring-accent/30 shadow-sm"
                                : "border border-line/70 bg-bg-elev text-muted hover:border-line-strong hover:text-fg hover:bg-bg-elev-2 shadow-xs"
                            }`}
                          >
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              );
            })
          )}
        </div>
      </div>
    </Section>
  );
}
