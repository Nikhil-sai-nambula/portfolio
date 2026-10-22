"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Briefcase, List, Moon, Sun, X } from "@phosphor-icons/react";
import { cta, navLinks, profile } from "@/data/portfolio";
import { useTheme } from "./use-theme";
import { CommandMenu } from "./command-menu";
import { RecruiterModal } from "./recruiter-modal";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const { theme, toggle, accent, setAccent, accents } = useTheme();

  // Read progress through Motion
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sentinel = document.getElementById("top");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "sm:top-2.5 sm:px-4" : "top-0"
        }`}
      >
        <div
          className={`transition-all duration-300 mx-auto max-w-7xl ${
            scrolled
              ? "rounded-none sm:rounded-2xl border-b sm:border border-line bg-bg/85 backdrop-blur-xl shadow-elev px-4 sm:px-6"
              : "px-4 sm:px-6 lg:px-8 border-b border-transparent bg-transparent"
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-2 xl:gap-4 md:h-[68px]">
            <a href="#top" className="flex shrink-0 items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-line-strong bg-bg-elev font-mono text-[11px] font-bold text-accent shadow-sm">
                {profile.initials}
              </span>
              <span className="hidden text-sm font-semibold tracking-tight sm:block text-fg">
                {profile.shortName}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex shrink-0"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setActive(link.id)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`relative rounded-lg px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                    active === link.id
                      ? "text-fg font-bold"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {link.label}
                  {active === link.id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  ) : null}
                </a>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {/* Recruiter Snapshot trigger */}
              <button
                type="button"
                onClick={() => setRecruiterOpen(true)}
                className="hidden xl:inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/15 px-2.5 py-1.5 font-mono text-xs font-semibold text-accent hover:bg-accent/25 transition-all shadow-sm whitespace-nowrap"
              >
                <Briefcase size={14} weight="bold" />
                <span>Snapshot</span>
              </button>

              {/* Accent Theme Switcher Dots */}
              <div
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-line bg-bg-elev/90 px-2 py-1.5 shadow-sm shrink-0"
                title="Change theme accent"
              >
                {accents.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAccent(a.id)}
                    aria-label={`Switch to ${a.label} accent`}
                    className={`h-3.5 w-3.5 rounded-full transition-all ${
                      accent === a.id
                        ? "ring-2 ring-fg scale-110 shadow-sm"
                        : "opacity-45 hover:opacity-100 hover:scale-105"
                    }`}
                    style={{ backgroundColor: a.color }}
                  />
                ))}
              </div>

              {/* Command Palette Trigger */}
              <CommandMenu />

              {/* Dark/Light toggle */}
              <button
                type="button"
                onClick={toggle}
                aria-label={
                  theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
                }
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg active:scale-[0.98]"
              >
                {theme === "dark" ? (
                  <Sun size={18} weight="regular" />
                ) : (
                  <Moon size={18} weight="regular" />
                )}
              </button>

              {/* Resume button */}
              <a
                href={profile.links.resume}
                download
                className="hidden sm:inline-flex shrink-0 items-center rounded-[10px] bg-fg px-3 py-2 text-xs font-semibold text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm whitespace-nowrap"
              >
                {cta.resume}
              </a>

              {/* Mobile Hamburger toggle */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-fg lg:hidden"
              >
                {open ? (
                  <X size={18} weight="bold" />
                ) : (
                  <List size={18} weight="bold" />
                )}
              </button>
            </div>
          </div>

          {/* Scroll Progress Bar */}
          <motion.div
            className="h-[2px] origin-left bg-accent rounded-full"
            style={{ scaleX: progress }}
            aria-hidden
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[76px] rounded-2xl border border-line bg-bg-elev p-5 shadow-2xl transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => {
                  setActive(link.id);
                  setOpen(false);
                }}
                className={`flex min-h-[44px] items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  active === link.id
                    ? "bg-accent/15 dark:bg-accent-soft text-accent font-bold"
                    : "text-fg hover:bg-bg-elev-2"
                }`}
              >
                <span>{link.label}</span>
                {active === link.id && (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Accent Picker */}
          <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
            <span className="font-mono text-xs text-muted">Theme Accent</span>
            <div className="flex items-center gap-2">
              {accents.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAccent(a.id)}
                  aria-label={`Switch to ${a.label} accent`}
                  className={`h-5 w-5 rounded-full transition-transform ${
                    accent === a.id
                      ? "ring-2 ring-fg scale-110"
                      : "opacity-60"
                  }`}
                  style={{ backgroundColor: a.color }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-line flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setRecruiterOpen(true);
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/15 py-3 text-center text-xs font-bold text-accent"
            >
              <Briefcase size={16} weight="bold" />
              <span>Recruiter Snapshot</span>
            </button>

            <a
              href={profile.links.resume}
              download
              className="block rounded-xl bg-fg py-3 text-center text-xs font-semibold text-bg"
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Recruiter Snapshot Modal */}
      <RecruiterModal
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
      />
    </>
  );
}
