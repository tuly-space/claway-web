"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bolt,
  Check,
  ChevronRight,
  CloudCog,
  Globe,
  HardDriveDownload,
  Lock,
  Menu,
  MessageSquareQuote,
  Network,
  ShieldCheck,
  Sparkles,
  Star,
  Waypoints,
  X,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#footer" },
];

const features = [
  {
    icon: Zap,
    title: "Always On",
    description: "24/7 uptime with zero-downtime maintenance and proactive health checks.",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    description: "Your agent runs in an isolated container with encrypted data and scoped access.",
  },
  {
    icon: CloudCog,
    title: "Auto-Updates",
    description: "Stay on the latest Hermes agent release without manual patching or rebuilds.",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description: "Open your workspace in the browser from any device, anywhere in the world.",
  },
  {
    icon: HardDriveDownload,
    title: "Daily Backups",
    description: "Automatic snapshots keep your work, prompts, and configuration recoverable.",
  },
  {
    icon: Waypoints,
    title: "80+ Integrations",
    description: "Connect GitHub, Slack, Discord, internal APIs, and the rest of your workflow.",
  },
];

const steps = [
  {
    title: "Choose your plan",
    description: "Pick the compute profile that matches your agent's workload and team size.",
  },
  {
    title: "We spin up your private instance",
    description: "Claway provisions a hardened environment with dependencies, storage, and updates handled.",
  },
  {
    title: "Access via browser",
    description: "Sign in and start using your Hermes agent immediately with no local setup required.",
  },
];

const planFeatures = [
  "Zero setup",
  "24/7 uptime",
  "Auto-updates",
  "Daily backups",
  "Private container",
  "Cancel anytime",
];

const pricingPlans = [
  {
    name: "LITE",
    monthly: "$16/mo",
    yearly: "$159/yr",
    specs: "2 vCPU, 4GB RAM, 40GB SSD",
    cta: "Get Started",
    featured: false,
  },
  {
    name: "PRO",
    monthly: "$33/mo",
    yearly: "$329/yr",
    specs: "4 vCPU, 8GB RAM, 80GB SSD",
    extra: "Priority Support",
    cta: "Get Started",
    featured: true,
  },
  {
    name: "MAX",
    monthly: "$66/mo",
    yearly: "$659/yr",
    specs: "8 vCPU, 16GB RAM, 160GB SSD",
    extra: "Priority Support",
    cta: "Get Started",
    featured: false,
  },
];

const testimonials = [
  {
    quote:
      "At this point I don't even know what to call @openclaw. It is something new. After a few weeks in with it, this is the first time I have felt like I am living in the future since the launch of ChatGPT.",
    author: "Dave Morin",
    handle: "@davemorin",
  },
  {
    quote:
      "Using @openclaw for a week now and it genuinely feels like early AGI. The gap between what I can imagine and what actually works has never been smaller.",
    author: "Tobi",
    handle: "@tobi_bsf",
  },
  {
    quote:
      "Yeah this was 1,000% worth it. Separate Claude subscription + Clawd, managing Claude Code / Codex sessions I can kick off anywhere, autonomously running tests on my app and capturing errors through a sentry webhook then resolving them and opening PRs... The future is here.",
    author: "Nat Eliason",
    handle: "@nateliason",
  },
];

const comparisonErrors = [
  "$ docker compose up hermes",
  "Error response from daemon: driver failed programming external connectivity on endpoint hermes-web...",
  "Bind for 0.0.0.0:3000 failed: port is already allocated",
  "",
  "$ npm install",
  "ERR! sharp prebuild-install warn install No prebuilt binaries found",
  "ERR! gyp ERR! stack Error: Python executable not found",
  "",
  "$ npm run build",
  "Module not found: Can't resolve 'libvips'",
  "Process exited with code 1",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [email, setEmail] = useState("");
  const [waitlistState, setWaitlistState] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-700">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.18),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_72%)]" />
        <div className="absolute left-1/2 top-32 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-16 -z-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-950"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20">
                <Bolt className="h-4 w-4" />
              </span>
              claway
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="#team"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
              >
                Team Edition
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                  Coming Soon
                </span>
              </a>
              <Link
                href="/auth/signin"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
              >
                Sign In
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileOpen ? (
            <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg shadow-slate-200/50 backdrop-blur md:hidden">
              <div className="mx-auto flex max-w-7xl flex-col gap-3">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#team"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  Team Edition
                </a>
                <Link
                  href="/auth/signin"
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700"
                >
                  Sign In
                </Link>
                <a
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : null}
        </header>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm shadow-slate-200/60">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Managed Hermes hosting for serious builders
              </div>
              <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Your AI Agent, <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Always On.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Stop wrestling with Docker, SSH, and broken dependencies. Get a
                fully managed Hermes AI agent in 60 seconds.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/30"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
                >
                  See Pricing
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-sm text-slate-500 shadow-sm shadow-slate-200/50">
                <span className="font-semibold text-slate-700">134k+ GitHub stars</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                <span>Trusted by 10,000+ users</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                <span>#1 on GitHub Trending</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -right-6 bottom-6 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-2xl shadow-slate-300/40 backdrop-blur">
                <div className="border-b border-slate-200 bg-slate-50/90 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
                      agent.claway.dev/session/hermes
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 sm:p-8">
                  <div className="grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
                    <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-sm leading-7 text-slate-100 shadow-inner">
                      <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                        <MessageSquareQuote className="h-4 w-4" />
                        Terminal
                      </div>
                      <pre className="overflow-x-auto font-mono text-[13px] text-emerald-300">
                        <code>{`$ claway launch --template product-spec\n\n✓ Provisioning private Hermes container\n✓ Restoring cached dependencies\n✓ Connecting GitHub and Slack\n✓ Daily backups enabled\n\n> Agent ready in 42s\n> Open in browser\n> https://agent.claway.dev/a/hx7d9`}</code>
                      </pre>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-500">Current status</p>
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Healthy
                          </span>
                        </div>
                        <p className="mt-3 text-2xl font-semibold text-slate-950">
                          Hermes agent online
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Dependencies pinned, storage mounted, and integrations synced across sessions.
                        </p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                          <p className="text-sm font-medium text-slate-500">Deploy time</p>
                          <p className="mt-2 text-3xl font-semibold text-slate-950">60s</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                          <p className="text-sm font-medium text-slate-500">Integrations</p>
                          <div className="mt-3 flex items-center gap-3 text-slate-600">
                            <Network className="h-5 w-5" />
                            <Globe className="h-5 w-5" />
                            <BadgeCheck className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-y border-slate-200 bg-slate-50/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
              The Self-Hosting Struggle
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Building with agents should feel fast, not fragile.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Claway replaces setup debt with a managed runtime built for Hermes from day one.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm shadow-slate-200/70">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <X className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-950">Without Claway</h3>
                  <p className="text-sm text-slate-500">Ports, builds, and breakage</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-rose-200">
                <pre className="overflow-x-auto font-mono text-[12px]">
                  <code>{comparisonErrors.join("\n")}</code>
                </pre>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm shadow-slate-200/70">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-950">With Claway</h3>
                  <p className="text-sm text-slate-500">From signup to productive in minutes</p>
                </div>
              </div>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-950">{step.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything your agent needs to stay production-ready"
          description="Claway wraps the operational parts of agent hosting so your team can stay focused on shipping."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/15 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50/80 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="Provisioned, secured, and ready to use"
            description="Three steps from choosing a plan to having a private Hermes environment live in your browser."
          />
          <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
            <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-blue-200 via-violet-200 to-blue-200 lg:block" />
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/70"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-semibold text-white shadow-lg shadow-blue-500/20">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans for solo builders and high-output teams"
          description="Switch between monthly and yearly billing. Yearly plans save 16% and keep every managed hosting feature included."
        />

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 shadow-sm">
            {(["monthly", "yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all",
                  billing === option
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800",
                )}
              >
                {option}
                {option === "yearly" ? " · Save 16%" : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-[28px] border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                plan.featured
                  ? "border-transparent bg-[linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#2563eb,#8b5cf6)_border-box] shadow-blue-100"
                  : "border-slate-200 shadow-slate-200/70",
              )}
            >
              {plan.featured ? (
                <span className="absolute right-6 top-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-500/20">
                  Most Popular
                </span>
              ) : null}
              <p className="text-sm font-semibold tracking-[0.3em] text-slate-500">{plan.name}</p>
              <div className="mt-6">
                <div className="text-4xl font-semibold tracking-tight text-slate-950">
                  {billing === "monthly" ? plan.monthly : plan.yearly}
                </div>
                <p className="mt-3 text-sm text-slate-500">{plan.specs}</p>
                {plan.extra ? <p className="mt-2 text-sm font-medium text-blue-600">{plan.extra}</p> : null}
              </div>
              <a
                href="/auth/signin"
                className={cn(
                  "mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all",
                  plan.featured
                    ? "bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                    : "border border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-300",
                )}
              >
                {plan.cta}
              </a>
              <div className="mt-8 space-y-3">
                {planFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check className="h-4 w-4" />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50/80 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by builders who need reliability"
            description="Real operator feedback from people using hosted agents to move faster without maintenance overhead."
          />
          <div className="mt-14 grid gap-6 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/70"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-8 text-slate-600">“{testimonial.quote}”</p>
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="font-semibold text-slate-950">{testimonial.author}</p>
                  <p className="mt-1 text-sm text-slate-500">{testimonial.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.4),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.38),_transparent_34%),linear-gradient(135deg,#0f172a_0%,#111827_42%,#1e1b4b_100%)] px-6 py-10 text-white shadow-2xl shadow-slate-300/40 sm:px-10 lg:px-12">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
                Coming Soon
              </span>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Need Claway for Your Team?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Multi-tenant architecture, shared knowledge base, team management
                and centralized controls are on the roadmap.
              </p>
            </div>

            <div className="relative rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <label htmlFor="waitlist-email" className="text-sm font-medium text-blue-100">
                Join Waitlist
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="team@company.com"
                  className="h-12 flex-1 rounded-full border border-white/15 bg-slate-950/20 px-4 text-sm text-white placeholder:text-slate-300/70 focus:border-blue-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setWaitlistState(
                      email.trim()
                        ? `Waitlist request captured for ${email.trim()}`
                        : "Enter an email to join the waitlist",
                    );
                  }}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
                >
                  Join Waitlist
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                {waitlistState ?? "We’ll notify you when team workspaces are ready."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-slate-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20">
                <Bolt className="h-4 w-4" />
              </span>
              claway
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Premium hosting for Hermes AI agents. Provision once, stay productive everywhere.
            </p>
            <div className="mt-5 flex items-center gap-3 text-slate-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 p-2 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <Network className="h-4 w-4" />
              </a>
              <a
                href="https://slack.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 p-2 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Product
            </h3>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <a href="#features" className="block transition-colors hover:text-slate-950">
                Features
              </a>
              <a href="#pricing" className="block transition-colors hover:text-slate-950">
                Pricing
              </a>
              <a href="#footer" className="block transition-colors hover:text-slate-950">
                Docs
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Company
            </h3>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <a href="#footer" className="block transition-colors hover:text-slate-950">
                About
              </a>
              <a href="#footer" className="block transition-colors hover:text-slate-950">
                Blog
              </a>
              <a href="#footer" className="block transition-colors hover:text-slate-950">
                Privacy
              </a>
              <a href="#footer" className="block transition-colors hover:text-slate-950">
                Terms
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>© 2026 Claway. All rights reserved.</p>
            <p>Hosted Hermes agents, without the self-hosting tax.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
