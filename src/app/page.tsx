"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronRight, Globe, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import LobsterIcon from "@/components/LobsterIcon";
import { pricingPlans, includedFeatures, faqs } from "@/lib/pricing-data";

const navLinks = [
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "/pricing" },
];

const stats = [
  { value: "350k+", label: "Developers Starred" },
  { value: "500M+", label: "Social Media Views" },
  { value: "#1 Worldwide", label: "GitHub Trending" },
];

const benefits = [
  {
    title: "A private OpenClaw instance, just for you",
    description: "Your own dedicated bot. Fully isolated, fully yours.",
  },
  {
    title: "Always online, always ready",
    description: "No downtime, no restarts. Your OpenClaw runs 24/7.",
  },
  {
    title: "You log in and use it. That's it.",
    description: "We handle updates, security, scaling.",
  },
];

const useCases = [
  "Workflow Automation",
  "Code & Dev Tools",
  "Browser Control",
  "File & System Management",
  "Smart Home Control",
  "App & API Integration",
  "Content Creation",
  "Personal Assistant",
];

const agentCards = [
  {
    title: "OpenClaw 🦞",
    badge: "Available Now",
    badgeClassName: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    description:
      "The open-source AI that controls your screen, apps, and does real work for you.",
    cta: "Run OpenClaw Now",
    href: "#pricing",
    featured: true,
  },
  {
    title: "Hermes Agent 🤖",
    badge: "Available Now",
    badgeClassName: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    description:
      "Claude-powered autonomous coding and task agent. Pre-configured, private, always on.",
    cta: "Run Hermes Now",
    href: "#pricing",
  },
  {
    title: "More Agents 🔮",
    badge: "Coming Soon",
    badgeClassName: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    description:
      "More open-source agents on the roadmap. Join the waitlist to be notified first.",
    cta: "Join Waitlist",
    href: "#final-cta",
  },
];

const steps = [
  {
    title: "Choose a plan",
    description: "Pick the plan that fits your needs.",
  },
  {
    title: "We set up your OpenClaw",
    description: "We spin up a dedicated instance optimized for you.",
  },
  {
    title: "Start using it",
    description: "No setup steps. Just log in and go.",
  },
];



const testimonials = [
  {
    author: "Dave Morin",
    handle: "@davemorin",
    quote: "At this point I don't even know what to call @openclaw...",
  },
  {
    author: "Nat Eliason",
    handle: "@nateliason",
    quote: "Yeah this was 1,000% worth it...",
  },
  {
    author: "Andre Foeken",
    handle: "@dreetje",
    quote: "I am so addicted to @openclaw...",
  },
  {
    author: "Tobi",
    handle: "@tobi_bsf",
    quote:
      "Using @openclaw for a week now and it genuinely feels like early AGI...",
  },
  {
    author: "Michael Schmidt",
    handle: "@therno",
    quote: "It's running my company",
  },
  {
    author: "Soren G.",
    handle: "@dajaset",
    quote:
      "I got up and running today with @openclaw and its been nothing short of an iPhone moment...",
  },
  {
    author: "Kyle Zantos",
    handle: "@kylezantos",
    quote: "Today was one of those days...",
  },
  {
    author: "Nat Eliason",
    handle: "@nateliason",
    quote: "Yeah this was 1,000% worth it...",
  },
];



const chatMessages = [
  {
    role: "user",
    text: "Good morning! What's on my schedule today?",
  },
  {
    role: "agent",
    text: "Good morning! Here's your briefing: 3 emails need replies, your PR #142 got approved, and tomorrow's meeting moved to 2pm. Want me to handle the emails first?",
  },
  {
    role: "user",
    text: "Yes, draft replies. Also block 1hr for deep work today.",
  },
  {
    role: "agent",
    text: "Done! 3 drafts ready in Gmail. Blocked 3-4pm as Focus Time. Also found a bug in auth.ts:47 - want me to fix it?",
  },
  {
    role: "user",
    text: "Fix it and open a PR.",
  },
  {
    role: "agent",
    text: "PR #148 created - fixed null check in token refresh.",
  },
];

function SectionHeader({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("reveal mx-auto max-w-3xl text-center", className)}>
      <h2 className="text-[28px] font-[800] tracking-[-0.04em] text-[var(--text-primary)] md:text-[40px]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] md:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }),
      { threshold: 0.15 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-[var(--divider)] bg-white/95 px-5 py-5 backdrop-blur-sm md:px-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]"
        >
          <LobsterIcon className="h-7 w-7" />
          <span>Claw<span className="text-[var(--accent)]">ay</span></span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--text-secondary)] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1 transition hover:text-[var(--text-primary)]"
          >
            More
            <ChevronDown className="h-4 w-4" />
          </button>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Change language"
            className="hidden rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <Globe className="h-4 w-4" />
          </button>
          <Link
            href="/auth/signin"
            className="text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Sign In
          </Link>
          <Link
            href="#pricing"
            className="btn-cta inline-flex items-center px-5 py-2.5 text-sm font-semibold"
          >
            Get OpenClaw
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-2 text-[var(--text-primary)] md:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {mobileMenuOpen ? (
          <div className="absolute inset-x-5 top-full mt-3 rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[var(--text-secondary)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                className="flex items-center gap-2 text-left text-sm font-semibold text-[var(--text-secondary)]"
              >
                More
                <ChevronDown className="h-4 w-4" />
              </button>
              <Link
                href="/auth/signin"
                className="text-sm font-semibold text-[var(--text-secondary)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="#pricing"
                className="btn-cta inline-flex w-full items-center justify-center px-5 py-3 text-sm font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get OpenClaw
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <section className="flex w-full flex-col items-center gap-6 px-5 pb-16 pt-8 md:gap-8 md:px-20 md:pb-[100px] md:pt-[120px]">
        <div className="reveal rounded-[20px] bg-[var(--bg-dark)] px-5 py-2 text-sm font-semibold text-[var(--text-secondary)]">
          The Home for AI Agents
        </div>
        <div className="reveal text-center">
          <h1 className="font-sans text-[clamp(32px,9vw,38px)] font-[900] leading-tight tracking-[-0.08em] text-[var(--text-primary)] md:text-[80px] md:leading-[1.0]">
            <span className="block">
              Your OpenClaw{" "}
              <LobsterIcon className="animate-bounce-gentle inline-block h-[0.85em] w-[0.85em] align-middle" />
            </span>
            <span className="gradient-text-animated block mt-2 pb-2">Ready for You</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] md:text-[22px]">
            AI assistants with real personality —{" "}
            <strong className="font-extrabold text-[var(--text-primary)]">
              proactive, always on, zero setup.
            </strong>
          </p>
        </div>
        <div className="reveal flex flex-col items-center gap-4">
          <Link
            href="#pricing"
            className="btn-cta inline-flex items-center justify-center px-8 py-[18px] text-base font-semibold"
          >
            Run OpenClaw Now
          </Link>
          <p className="text-sm text-[var(--text-muted)]">
            Run OpenClaw instantly. Cancel anytime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
            <Link
              href="/auth/signin?provider=google"
              className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            >
              Google Login
            </Link>
            <Link
              href="/checkout/paypal"
              className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            >
              PayPal
            </Link>
          </div>
        </div>

        <div className="reveal relative mt-8 w-full max-w-[960px]">
          <div className="absolute inset-x-20 top-10 -z-10 h-48 rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.3)_0%,_rgba(239,68,68,0.08)_45%,_transparent_75%)] blur-3xl" />
          <div className="overflow-hidden rounded-[24px] border border-[var(--divider)] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-[var(--divider)] bg-[var(--bg-secondary)] px-4 py-3 md:px-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-xs text-[var(--text-tertiary)] md:text-sm">
                Claway Dashboard
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 md:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Online
              </div>
            </div>

            <div className="flex h-[380px] md:h-[540px]">
              <aside className="hidden w-[180px] border-r border-[var(--divider)] bg-[var(--bg-card-alt)] p-4 md:flex md:flex-col md:gap-2">
                {["Chat", "Tasks", "Memory", "Files", "Settings"].map((item) => (
                  <div
                    key={item}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold",
                      item === "Chat"
                        ? "bg-[rgba(239,68,68,0.1)] text-[var(--accent)]"
                        : "text-[var(--text-tertiary)]",
                    )}
                  >
                    {item}
                  </div>
                ))}
              </aside>

              <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 md:p-6">
                <div className="flex-1 space-y-3 overflow-hidden">
                  {chatMessages.map((message, index) => {
                    const isUser = message.role === "user";

                    return (
                      <div
                        key={`${message.role}-${index}`}
                        className={cn("flex", isUser ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[88%] rounded-[20px] px-4 py-3 text-sm leading-6 md:max-w-[72%] md:text-[15px]",
                            isUser
                              ? "bg-[rgba(239,68,68,0.1)] text-[var(--text-primary)]"
                              : "bg-[var(--bg-card-alt)] text-[var(--text-secondary)]",
                          )}
                        >
                          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                            {isUser ? "User" : "Agent (OpenClaw 🦞)"}
                          </p>
                          <p>{message.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--bg-secondary)] p-3">
                  <input
                    disabled
                    value="Message OpenClaw..."
                    className="h-12 flex-1 rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--text-muted)] outline-none"
                    onChange={() => {}}
                  />
                  <button
                    type="button"
                    className="btn-cta inline-flex h-12 items-center justify-center px-5 text-sm font-semibold"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-20">
        <SectionHeader
          title="The world&apos;s fastest-growing open-source AI"
          description="OpenClaw exploded because people want an AI that can actually do things, not just talk about them."
        />

        <div className="reveal mt-12 grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--divider)] bg-[var(--bg-card)] p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
            >
              <p className="text-3xl font-[900] tracking-[-0.05em] text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--text-secondary)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="reveal rounded-[28px] border border-[var(--divider)] bg-[var(--bg-card)] p-8 text-[var(--text-secondary)] shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
            <p className="text-lg leading-8">
              OpenClaw is the agent everyone wants: it can browse, click, code,
              draft, automate, and handle real workflows. The problem is that
              most people get stuck at installation, environment setup,
              dependencies, ports, updates, and breakage long before they ever
              get value from it.
            </p>
          </div>
          <div className="reveal flex items-center rounded-[28px] border border-[var(--divider)] bg-[var(--bg-card-alt)] p-8 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
            <p className="text-[24px] font-[800] leading-9 tracking-[-0.04em] text-[var(--text-primary)] md:text-[30px]">
              &quot;Everyone wants an OpenClaw. Almost no one can set it up.&quot;
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-secondary)] px-5 py-20 md:px-20">
        <SectionHeader
          title="Why most people never actually use OpenClaw"
          description="The demand is real. The setup burden is what kills momentum."
        />

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="reveal rounded-[28px] border border-[var(--divider)] bg-[var(--bg-card)] p-6 shadow-[0_14px_50px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-sm font-[800] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
              Without Claway
            </p>
            <div className="mt-6 rounded-[24px] bg-[#0d1117] p-5 font-mono text-sm leading-7 text-slate-200 shadow-inner">
              <p>$ git clone openclaw && cd openclaw</p>
              <p>$ docker compose up</p>
              <p className="text-red-400">ERROR: port 5432 already in use</p>
              <p>$ pip install -r requirements.txt</p>
              <p className="text-red-400">ERROR: python 3.9 required, found 3.12</p>
              <p className="text-red-400">Build failed. 14 errors.</p>
            </div>
            <div className="mt-6 space-y-3 text-[var(--text-secondary)]">
              {[
                "Find a server",
                "Set up the environment",
                "Something breaks",
                "Give up",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-red-500">✗</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--divider)] bg-white text-lg font-[900] text-[var(--text-secondary)] shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              vs
            </div>
          </div>

          <div className="reveal rounded-[28px] border border-[var(--divider)] bg-[var(--bg-card)] p-6 shadow-[0_14px_50px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-sm font-[800] uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
              With Claway
            </p>
            <div className="mt-6 space-y-5">
              {[
                "No learning curve or maintenance required",
                "You don't need to maintain anything",
                "Claway skips all of that.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-base leading-7 text-[var(--text-secondary)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-20">
        <SectionHeader
          title="What you get with Claway"
          description="Claway removes the operational work so the product feels immediate from day one."
        />
        <div className="reveal mt-12 grid gap-6 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-[var(--divider)] bg-[var(--bg-card)] p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] md:p-10"
            >
              <h3 className="text-2xl font-[800] tracking-[-0.04em] text-[var(--text-primary)]">
                {benefit.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="use-cases" className="bg-[var(--bg-secondary)] px-5 py-20 md:px-20">
        <SectionHeader
          title="What OpenClaw Can Do For You"
          description="These are the workflows people actually want from an agent when it is configured correctly and always available."
        />
        <div className="reveal mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="rounded-2xl border border-[var(--divider)] bg-[var(--bg-card)] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(239,68,68,0.1)] text-xl">
                ✦
              </div>
              <h3 className="mt-5 text-xl font-[800] tracking-[-0.04em] text-[var(--text-primary)]">
                {useCase}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:px-20">
        <SectionHeader
          title="One Platform. Multiple Agents."
          description="Claway doesn&apos;t lock you in. Start with OpenClaw - add more agents as your needs grow."
        />
        <div className="reveal mt-12 grid gap-6 xl:grid-cols-3">
          {agentCards.map((agent) => (
            <div
              key={agent.title}
              className={cn(
                "rounded-2xl border-2 bg-[var(--bg-card)] p-8 shadow-[0_14px_50px_rgba(15,23,42,0.05)]",
                agent.featured ? "border-[var(--accent)]" : "border-[var(--divider)]",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-[800] tracking-[-0.04em] text-[var(--text-primary)]">
                  {agent.title}
                </h3>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]",
                    agent.badgeClassName,
                  )}
                >
                  {agent.badge}
                </span>
              </div>
              <p className="mt-5 min-h-24 text-base leading-7 text-[var(--text-secondary)]">
                {agent.description}
              </p>
              <Link
                href={agent.href}
                className={cn(
                  "mt-8 inline-flex items-center justify-center rounded-[14px] px-6 py-4 text-sm font-semibold transition",
                  agent.featured || agent.badge === "Available Now"
                    ? "btn-cta"
                    : "border border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--accent)]",
                )}
              >
                {agent.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--bg-secondary)] px-5 py-20 md:px-20">
        <SectionHeader
          title="How it works"
          description="The product is intentionally simple: choose a plan, let Claway handle setup, then start using your agent."
        />
        <div className="reveal mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[28px] border border-[var(--divider)] bg-[var(--bg-card)] p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(239,68,68,0.12)] text-lg font-[900] text-[var(--accent)]">
                {index + 1}
              </div>
              <h3 className="mt-6 text-2xl font-[800] tracking-[-0.04em] text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-5 py-20 md:px-20">
        <SectionHeader
          title="Simple, Transparent Pricing"
          description="Choose the compute profile you need today. Upgrade later if your workloads grow."
        />

        <div className="reveal mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] p-1">
            {(["monthly", "yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold capitalize transition",
                  billing === option
                    ? "bg-white text-[var(--text-primary)] shadow-[0_6px_18px_rgba(15,23,42,0.08)]"
                    : "text-[var(--text-secondary)]",
                )}
                onClick={() => setBilling(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal mt-12 grid grid-cols-2 gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-[28px] border bg-[var(--bg-card)] p-6 md:p-8 shadow-[0_16px_60px_rgba(15,23,42,0.05)]",
                plan.featured
                  ? "border-[var(--accent)]"
                  : "border-[var(--divider)]",
              )}
            >
              {plan.featured ? (
                <span className="absolute right-6 top-6 rounded-full bg-[rgba(239,68,68,0.12)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Most Popular
                </span>
              ) : null}
              <p className="text-sm font-[800] uppercase tracking-[0.28em] text-[var(--text-tertiary)]">
                {plan.name}
              </p>
              <p className="mt-6 text-5xl font-[900] tracking-[-0.06em] text-[var(--text-primary)]">
                {billing === "monthly" ? plan.monthly : plan.yearly}
              </p>
              <div className="mt-6 space-y-2 text-sm font-medium text-[var(--text-secondary)]">
                {plan.specs.map((spec) => (
                  <p key={spec}>{spec}</p>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                {includedFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(239,68,68,0.12)] text-[var(--accent)]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <Link
                  href="/checkout/paypal"
                  className="btn-cta inline-flex w-full items-center justify-center px-6 py-4 text-sm font-semibold"
                >
                  Subscribe to {plan.name}
                </Link>
                <Link
                  href="/auth/signin?provider=google"
                  className="inline-flex w-full items-center justify-center rounded-[14px] border border-[var(--border)] bg-white px-6 py-4 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                >
                  Sign in with Google
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-center text-sm text-[var(--text-muted)]">
          Also supports Hermes Agent - switch anytime from your dashboard.
        </p>
      </section>

      <section className="bg-[var(--bg-secondary)] px-5 py-20 md:px-20">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[var(--divider)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">
            10,000+ people have reserved their spot
          </span>
          <h2 className="mt-6 text-[28px] font-[800] tracking-[-0.04em] text-[var(--text-primary)] md:text-[40px]">
            People are already lining up
          </h2>
        </div>

        <div className="mt-12 space-y-5 overflow-hidden">
          {[testimonials, [...testimonials].reverse()].map((row, rowIndex) => (
            <div key={rowIndex} className="marquee-row">
              <div
                className={cn("marquee-track", rowIndex === 1 ? "[animation-direction:reverse]" : "")}
              >
                {[...row, ...row].map((testimonial, index) => (
                  <article
                    key={`${testimonial.author}-${index}`}
                    className="min-w-[300px] rounded-2xl border border-[var(--divider)] bg-[var(--bg-card)] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:min-w-[360px]"
                  >
                    <div className="text-4xl font-black leading-none text-[rgba(239,68,68,0.3)]">
                      &ldquo;
                    </div>
                    <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                      {testimonial.quote}
                    </p>
                    <p className="mt-5 text-sm font-bold text-[var(--text-primary)]">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">{testimonial.handle}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:px-20">
        <SectionHeader
          title="Frequently asked questions"
          description="The core questions are mostly about trust, setup, and whether Claway is the right way to access OpenClaw."
        />
        <div className="reveal mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const expanded = openFaq === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-[var(--divider)] bg-[var(--bg-card)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenFaq(expanded ? null : index)}
                >
                  <span className="text-lg font-[800] tracking-[-0.03em] text-[var(--text-primary)]">
                    {faq.question}
                  </span>
                  <span className="text-2xl font-light text-[var(--text-secondary)]">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                {expanded ? (
                  <div className="border-t border-[var(--divider)] px-6 py-5 text-base leading-7 text-[var(--text-secondary)]">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="final-cta"
        className="bg-[var(--bg-secondary)] px-5 py-24 text-center md:px-20"
      >
        <div className="reveal mx-auto max-w-4xl">
          <LobsterIcon className="animate-bounce-gentle mx-auto h-24 w-24" />
          <h2 className="mt-4 text-[40px] font-[900] leading-none tracking-[-0.06em] text-[var(--text-primary)] md:text-[56px]">
            Start your AI journey today.
          </h2>
          <p className="mt-5 text-xl text-[var(--text-secondary)]">
            Get your personal OpenClaw in minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signin?provider=google"
              className="btn-cta inline-flex items-center justify-center px-8 py-[18px] text-base font-semibold"
            >
              Get Started
            </Link>
            <Link
              href="/checkout/paypal"
              className="inline-flex items-center justify-center rounded-[14px] border border-[var(--border)] bg-white px-8 py-[18px] text-base font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
            >
              Pay with PayPal
            </Link>
          </div>
          <p className="mt-5 text-sm text-[var(--text-muted)]">
            Claway exists for one reason: to let you use OpenClaw without
            becoming a sysadmin.
          </p>
        </div>
      </section>

      <footer className="border-t border-[var(--divider)] bg-[var(--bg-footer)] px-5 py-12 md:px-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
              <LobsterIcon className="h-6 w-6" />
              <span>Claw<span className="text-[var(--accent)]">ay</span></span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--text-secondary)]">
              Managed hosting for OpenClaw and more.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-medium text-[var(--text-secondary)]">
            {[
              ["Use Cases", "#use-cases"],
              ["Pricing", "#pricing"],
              ["Blog", "#footer"],
              ["Privacy", "#footer"],
              ["Terms", "#footer"],
              ["About", "#footer"],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="transition hover:text-[var(--text-primary)]">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/auth/signin"
              className="text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              Sign In
            </Link>
            <Link
              href="#pricing"
              className="btn-cta inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
            >
              Get OpenClaw
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div
          id="footer"
          className="mt-10 border-t border-[var(--divider)] pt-6 text-sm text-[var(--text-muted)]"
        >
          © 2026 Claway. All rights reserved. · Not affiliated with the official
          OpenClaw project.
        </div>
      </footer>
    </main>
  );
}
