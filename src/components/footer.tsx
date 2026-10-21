"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { navLinks, profile } from "@/data/portfolio";

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const reduce = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowTop(latest > 350);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <>
      <footer className="border-t border-line py-12 bg-bg">
        <div className="container-page flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-fg">{profile.name}</p>
            <p className="mt-1 text-xs text-subtle">
              {profile.role} · {profile.location}
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            aria-label="Footer"
          >
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-xs text-subtle transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="container-page mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. Designed & engineered for scale.
          </p>
          <p className="font-mono text-[11px]">
            Java · Spring Boot · Microservices · Next.js · Tailwind
          </p>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
        }
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-bg-elev/90 text-fg shadow-card backdrop-blur transition-[opacity,transform] duration-300 hover:border-accent hover:text-accent ${
          showTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={17} weight="bold" />
      </button>

      {/* Bottom accent line */}
      <motion.div
        className="fixed bottom-0 left-0 h-px w-full origin-left bg-accent/60"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </>
  );
}
