"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle,
  Copy,
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  Phone,
} from "@phosphor-icons/react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

const socials = [
  {
    label: "LinkedIn",
    handle: "in/nikhil-sai-nambula",
    href: profile.links.linkedin,
    Icon: LinkedinLogo,
  },
  {
    label: "LeetCode",
    handle: "@Nikhilsai007",
    href: profile.links.leetcode,
    Icon: ArrowUpRight,
  },
  {
    label: "GitHub",
    handle: "@Nikhil-sai-nambula",
    href: profile.links.github,
    Icon: GithubLogo,
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleType, setRoleType] = useState("Full-time Backend Role");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setErrorMessage("");
    setStatus("sending");

    // Simulate immediate sending + open mailto fallback
    setTimeout(() => {
      setStatus("sent");
      const mailtoSubject = encodeURIComponent(`[${roleType}] from ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Nikhil,\n\nName: ${name}\nEmail: ${email}\nInquiry Type: ${roleType}\n\nMessage:\n${message}`,
      );

      // Trigger mailto client as reliable direct delivery
      window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 800);
  };

  return (
    <Section id="contact" className="overflow-hidden bg-bg">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,var(--glow-a),transparent_70%)]"
        aria-hidden
      />

      <SectionHeading
        title="Direct Engineering Channel & Collaboration"
        description="Actively open to full-time backend and distributed systems engineering roles. Send a direct message or connect across professional channels."
      />

      <div className="mt-10 sm:mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Left Column: Direct info & Interactive Message Form */}
        <div>
          {/* Interactive Form */}
          <Reveal>
            <div className="rounded-2xl border border-line bg-bg-elev p-6 sm:p-7 shadow-card">
              <div className="mb-5 border-b border-line pb-4">
                <h3 className="text-lg font-bold tracking-tight text-fg">
                  Send a Direct Message
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Connects directly to Nikhil&apos;s inbox.
                </p>
              </div>
              {status === "sent" ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle size={28} weight="fill" />
                  </div>
                  <h3 className="text-lg font-bold text-fg">
                    Message Prepared & Email Client Opened!
                  </h3>
                  <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                    Thank you, {name}! Your email client has been launched with
                    your message details. You can also directly reach me at{" "}
                    <span className="font-semibold text-fg">{profile.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setMessage("");
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-line bg-bg-elev px-3.5 py-2 font-mono text-xs text-muted hover:text-fg"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-500">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="block font-mono text-[11px] uppercase tracking-wider text-subtle mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        required
                        placeholder="e.g. Alex Chen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sender-email"
                        className="block font-mono text-[11px] uppercase tracking-wider text-subtle mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="role-type"
                      className="block font-mono text-[11px] uppercase tracking-wider text-subtle mb-1.5"
                    >
                      Inquiry / Role Type
                    </label>
                    <select
                      id="role-type"
                      value={roleType}
                      onChange={(e) => setRoleType(e.target.value)}
                      className="w-full rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                    >
                      <option>Full-time Backend Role</option>
                      <option>Distributed Systems / Java Engineer</option>
                      <option>Contract / Consulting Project</option>
                      <option>System Design / General Chat</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message-content"
                      className="block font-mono text-[11px] uppercase tracking-wider text-subtle mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message-content"
                      required
                      rows={4}
                      placeholder="Share details about the role, technical requirements, or team..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fg px-5 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <PaperPlaneTilt size={16} weight="bold" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Right Column: Quick Contact, Phone, and Social Channels */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <Reveal delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                Direct Channels
              </h3>
              <p className="mt-1 text-sm text-muted">
                Preferred for immediate contact or recruiter outreach.
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-bg px-4 py-2.5 text-xs font-semibold text-fg transition-colors hover:border-accent"
                >
                  {copied ? (
                    <>
                      <Check size={15} className="text-emerald-400" />
                      <span>Copied email address!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      <span>{profile.email}</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-bg px-4 py-2.5 text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <Phone size={15} />
                  <span>{profile.phone}</span>
                </a>
              </div>
            </Reveal>

            {/* Social links */}
            <div className="mt-8 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-subtle">
                Professional Profiles
              </span>
              <div className="space-y-2 mt-2">
                {socials.map(({ label, handle, href, Icon }, i) => (
                  <Reveal key={label} delay={0.15 + i * 0.05}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between rounded-xl border border-line bg-bg p-3.5 transition-all hover:border-accent hover:bg-bg-elev"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bg-elev-2 text-muted transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                          <Icon size={18} weight="fill" />
                        </span>
                        <div>
                          <span className="block text-sm font-semibold text-fg">
                            {label}
                          </span>
                          <span className="block font-mono text-xs text-subtle">
                            {handle}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Location & Status Card */}
          <Reveal delay={0.3}>
            <div className="rounded-xl border border-line bg-bg p-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Current Base
                </span>
                <p className="text-xs font-semibold text-fg mt-0.5">
                  {profile.location} (IST / UTC+5:30)
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Hire</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
