"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Command,
  Cpu,
  Download,
  EnvelopeSimple,
  Folder,
  GraduationCap,
  MagnifyingGlass,
  Moon,
  Phone,
  Sun,
  User,
  Wrench,
  X,
} from "@phosphor-icons/react";
import { profile } from "@/data/portfolio";
import { useTheme } from "./use-theme";

type ActionItem = {
  id: string;
  label: string;
  category: "Navigation" | "Actions" | "External Links";
  shortcut?: string;
  Icon: React.ElementType;
  onSelect: () => void;
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigateTo = (id: string) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
    setOpen(false);
  };

  const actions: ActionItem[] = [
    {
      id: "nav-about",
      label: "About Me",
      category: "Navigation",
      Icon: User,
      onSelect: () => navigateTo("about"),
    },
    {
      id: "nav-skills",
      label: "Technical Skills & Stack",
      category: "Navigation",
      Icon: Wrench,
      onSelect: () => navigateTo("skills"),
    },
    {
      id: "nav-architecture",
      label: "Interactive Architecture Playground",
      category: "Navigation",
      Icon: Cpu,
      onSelect: () => navigateTo("architecture"),
    },
    {
      id: "nav-experience",
      label: "Production Experience (TCS)",
      category: "Navigation",
      Icon: Briefcase,
      onSelect: () => navigateTo("experience"),
    },
    {
      id: "nav-projects",
      label: "Projects & System Designs",
      category: "Navigation",
      Icon: Folder,
      onSelect: () => navigateTo("projects"),
    },
    {
      id: "nav-credentials",
      label: "LeetCode & AWS Credentials",
      category: "Navigation",
      Icon: GraduationCap,
      onSelect: () => navigateTo("journey"),
    },
    {
      id: "nav-contact",
      label: "Contact & Inquiries",
      category: "Navigation",
      Icon: EnvelopeSimple,
      onSelect: () => navigateTo("contact"),
    },
    {
      id: "action-theme",
      label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Actions",
      Icon: theme === "dark" ? Sun : Moon,
      onSelect: () => {
        toggle();
        setOpen(false);
      },
    },
    {
      id: "action-resume",
      label: "Download Resume (PDF)",
      category: "Actions",
      Icon: Download,
      onSelect: () => {
        window.open(profile.links.resume, "_blank");
        setOpen(false);
      },
    },
    {
      id: "action-copy-email",
      label: `Copy Email (${profile.email})`,
      category: "Actions",
      Icon: EnvelopeSimple,
      onSelect: () => copyToClipboard(profile.email),
    },
    {
      id: "action-copy-phone",
      label: `Call or Copy Phone (${profile.phone})`,
      category: "Actions",
      Icon: Phone,
      onSelect: () => {
        window.location.href = `tel:${profile.phone.replace(/\s/g, "")}`;
        setOpen(false);
      },
    },
    {
      id: "link-linkedin",
      label: "Open LinkedIn Profile",
      category: "External Links",
      Icon: ArrowRight,
      onSelect: () => {
        window.open(profile.links.linkedin, "_blank");
        setOpen(false);
      },
    },
    {
      id: "link-leetcode",
      label: "Open LeetCode Profile (1000+ solved)",
      category: "External Links",
      Icon: ArrowRight,
      onSelect: () => {
        window.open(profile.links.leetcode, "_blank");
        setOpen(false);
      },
    },
    {
      id: "link-github",
      label: "Open GitHub Profile",
      category: "External Links",
      Icon: ArrowRight,
      onSelect: () => {
        window.open(profile.links.github, "_blank");
        setOpen(false);
      },
    },
  ];

  const filtered = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].onSelect();
    }
  };

  return (
    <>
      {/* Desktop trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-1.5 rounded-lg border border-line bg-bg-elev/80 px-2 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg lg:flex"
        aria-label="Open command palette"
      >
        <MagnifyingGlass size={13} className="text-subtle" />
        <span className="hidden 2xl:inline font-mono text-[11px]">Search</span>
        <kbd className="rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] text-subtle">
          ⌘K
        </kbd>
      </button>

      {/* Mobile / Tablet search icon trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg lg:hidden"
        aria-label="Open command palette"
      >
        <MagnifyingGlass size={16} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24"
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
            aria-hidden
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-bg-elev shadow-2xl">
            {/* Search Input bar */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <MagnifyingGlass size={18} className="text-muted shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-muted hover:bg-bg-elev-2 hover:text-fg"
                aria-label="Close command palette"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-[380px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted">
                  No matching commands found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((action, idx) => {
                    const isSelected = idx === selectedIndex;
                    const Icon = action.Icon;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={action.onSelect}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          isSelected
                            ? "bg-accent-soft text-fg font-medium"
                            : "text-muted hover:text-fg"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-xs ${
                              isSelected
                                ? "border-accent text-accent bg-bg"
                                : "border-line text-subtle bg-bg-elev-2"
                            }`}
                          >
                            <Icon size={14} />
                          </span>
                          <span className="truncate">{action.label}</span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                          {action.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-line bg-bg px-4 py-2.5 text-[11px] text-subtle">
              <div className="flex items-center gap-3 font-mono">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Exit</span>
              </div>
              <span className="font-mono text-[10px] text-accent">
                Nikhil Sai · Systems Portfolio
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
