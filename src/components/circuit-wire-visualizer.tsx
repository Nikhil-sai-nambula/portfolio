"use client";

import { motion } from "motion/react";

type CircuitWireVisualizerProps = {
  state: "CLOSED" | "OPEN" | "HALF-OPEN";
};

export function CircuitWireVisualizer({ state }: CircuitWireVisualizerProps) {
  const isClosed = state === "CLOSED";
  const isOpen = state === "OPEN";
  const isHalfOpen = state === "HALF-OPEN";

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-line bg-bg p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-subtle">
          Real-time Circuit Topology & Wire State
        </span>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span
            className={`flex h-2 w-2 rounded-full ${
              isClosed
                ? "bg-emerald-500 animate-pulse"
                : isOpen
                ? "bg-amber-500 animate-pulse"
                : "bg-blue-500 animate-pulse"
            }`}
          />
          <span
            className={`font-bold ${
              isClosed
                ? "text-emerald-500"
                : isOpen
                ? "text-amber-500"
                : "text-blue-500"
            }`}
          >
            {isClosed
              ? "SWITCH CLOSED · TRAFFIC FLOWING"
              : isOpen
              ? "SWITCH OPEN · TRAFFIC REROUTED"
              : "SWITCH HALF-OPEN · CANARY PROBING"}
          </span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative mt-4 w-full h-44 sm:h-52">
        <svg
          viewBox="0 0 600 220"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="gradClosed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="gradOpen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="gradBypass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* BACKGROUND WIRES */}
          {/* Main path wire to downstream */}
          <line
            x1="120"
            y1="70"
            x2="230"
            y2="70"
            stroke="currentColor"
            strokeWidth="3"
            className="text-line-strong"
          />
          <line
            x1="320"
            y1="70"
            x2="480"
            y2="70"
            stroke="currentColor"
            strokeWidth="3"
            className="text-line-strong"
          />

          {/* Bypass curve to Redis / DLQ */}
          <path
            d="M 180 70 C 180 160, 240 160, 480 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={isOpen ? "none" : "4 4"}
            className={isOpen ? "text-amber-500" : "text-line"}
          />

          {/* ACTIVE FLOW WIRES (CONDITIONALLY ANIMATED) */}
          {isClosed && (
            <>
              {/* Direct flowing stream */}
              <line
                x1="120"
                y1="70"
                x2="480"
                y2="70"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="8 6"
                className="animate-[dash_1s_linear_infinite]"
              />
              {/* Closed mechanical switch lever */}
              <line
                x1="230"
                y1="70"
                x2="320"
                y2="70"
                stroke="#10b981"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </>
          )}

          {isOpen && (
            <>
              {/* Open mechanical switch lever (Visibly tilted open!) */}
              <line
                x1="230"
                y1="70"
                x2="300"
                y2="25"
                stroke="#eab308"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Open Gap Warning Marker */}
              <circle cx="230" cy="70" r="4" fill="#eab308" />
              <circle cx="320" cy="70" r="4" fill="#ef4444" />
              <text
                x="280"
                y="18"
                textAnchor="middle"
                className="fill-red-500 font-mono text-[10px] font-bold"
              >
                GAP OPEN (AIR TRIP)
              </text>

              {/* Animated Bypass Stream to DLQ / Redis */}
              <path
                d="M 180 70 C 180 160, 240 160, 480 160"
                fill="none"
                stroke="#eab308"
                strokeWidth="3.5"
                strokeDasharray="8 6"
                className="animate-[dash_0.8s_linear_infinite]"
              />
            </>
          )}

          {isHalfOpen && (
            <>
              {/* Probing lever midway */}
              <line
                x1="230"
                y1="70"
                x2="315"
                y2="50"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="4 2"
              />
              {/* Probe pulse packet */}
              <circle cx="280" cy="58" r="5" fill="#3b82f6" className="animate-pulse" />
              <text
                x="280"
                y="35"
                textAnchor="middle"
                className="fill-blue-500 font-mono text-[10px] font-bold"
              >
                PROBING CANARY
              </text>
            </>
          )}

          {/* LEFT NODE: Client / Order Orchestrator */}
          <rect
            x="20"
            y="40"
            width="110"
            height="60"
            rx="10"
            fill="var(--bg-elev)"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
          />
          <text
            x="75"
            y="65"
            textAnchor="middle"
            className="fill-current text-fg font-mono text-[11px] font-bold"
          >
            Order Service
          </text>
          <text
            x="75"
            y="82"
            textAnchor="middle"
            className="fill-current text-subtle font-mono text-[9px]"
          >
            Inbound Traffic
          </text>

          {/* RIGHT TOP NODE: Downstream Service */}
          <rect
            x="480"
            y="40"
            width="110"
            height="60"
            rx="10"
            fill="var(--bg-elev)"
            stroke={isClosed ? "#10b981" : isOpen ? "#ef4444" : "#3b82f6"}
            strokeWidth="1.5"
          />
          <text
            x="535"
            y="65"
            textAnchor="middle"
            className="fill-current text-fg font-mono text-[11px] font-bold"
          >
            Downstream DB
          </text>
          <text
            x="535"
            y="82"
            textAnchor="middle"
            className={`font-mono text-[9px] font-semibold ${
              isClosed
                ? "fill-emerald-500"
                : isOpen
                ? "fill-red-500"
                : "fill-blue-500"
            }`}
          >
            {isClosed ? "Healthy · 200 OK" : isOpen ? "Degraded · 503" : "Probing"}
          </text>

          {/* RIGHT BOTTOM NODE: Redis Cache & SQS DLQ */}
          <rect
            x="480"
            y="130"
            width="110"
            height="60"
            rx="10"
            fill="var(--bg-elev)"
            stroke={isOpen ? "#eab308" : "var(--border)"}
            strokeWidth={isOpen ? "2" : "1"}
          />
          <text
            x="535"
            y="155"
            textAnchor="middle"
            className="fill-current text-fg font-mono text-[11px] font-bold"
          >
            Redis & SQS DLQ
          </text>
          <text
            x="535"
            y="172"
            textAnchor="middle"
            className={`font-mono text-[9px] font-semibold ${
              isOpen ? "fill-amber-500" : "fill-subtle"
            }`}
          >
            {isOpen ? "Fast Fallback Active" : "Standby Queue"}
          </text>
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between text-xs font-mono text-subtle">
        <span>Latency: {isClosed ? "~16ms (Normal)" : isOpen ? "~1.8ms (Fallback)" : "~35ms (Probe)"}</span>
        <span>Availability: 99.98% guaranteed</span>
      </div>
    </div>
  );
}
