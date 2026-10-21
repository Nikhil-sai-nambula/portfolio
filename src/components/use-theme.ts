"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export type Accent = "amber" | "cyan" | "emerald";

export const accents: { id: Accent; label: string; color: string }[] = [
  { id: "amber", label: "Solar Amber", color: "#fbbf24" },
  { id: "cyan", label: "Cyber Cyan", color: "#38bdf8" },
  { id: "emerald", label: "Emerald Telemetry", color: "#34d399" },
];

const THEME_STORAGE_KEY = "portfolio-theme";
const ACCENT_STORAGE_KEY = "portfolio-accent";
const themeListeners = new Set<() => void>();
const accentListeners = new Set<() => void>();

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function subscribeTheme(onChange: () => void) {
  themeListeners.add(onChange);
  applyTheme(readTheme());
  return () => {
    themeListeners.delete(onChange);
  };
}

function writeTheme(theme: Theme) {
  applyTheme(theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable */
  }
  for (const listener of themeListeners) listener();
}

function readAccent(): Accent {
  try {
    const stored = window.localStorage.getItem(ACCENT_STORAGE_KEY);
    if (stored === "amber" || stored === "cyan" || stored === "emerald") {
      return stored;
    }
  } catch {
    /* storage unavailable */
  }
  return "amber";
}

function applyAccent(accent: Accent) {
  const root = document.documentElement;
  root.setAttribute("data-accent", accent);
}

function subscribeAccent(onChange: () => void) {
  accentListeners.add(onChange);
  applyAccent(readAccent());
  return () => {
    accentListeners.delete(onChange);
  };
}

function writeAccent(accent: Accent) {
  applyAccent(accent);
  try {
    window.localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  } catch {
    /* storage unavailable */
  }
  for (const listener of accentListeners) listener();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark" as Theme);
  const accent = useSyncExternalStore(subscribeAccent, readAccent, () => "amber" as Accent);

  const toggle = useCallback(() => {
    writeTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  const setAccent = useCallback((newAccent: Accent) => {
    writeAccent(newAccent);
  }, []);

  return { theme, toggle, accent, setAccent, accents };
}
