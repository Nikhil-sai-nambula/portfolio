"use client";

import { marquee } from "@/data/portfolio";

export function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-elev/40 py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-marquee items-center gap-8">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-subtle"
          >
            {item}
            <span className="text-line-strong" aria-hidden>
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
