"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown, ChevronRight, Globe, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import LobsterIcon from "@/components/LobsterIcon";
import { pricingPlans, includedFeatures, faqs } from "@/lib/pricing-data";

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-[var(--divider)] bg-white/95 px-5 py-5 backdrop-blur-sm md:px-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]"
        >
          <LobsterIcon className="h-7 w-7" />
          <span>Claw<span className="text-[var(--accent)]">ay</span></span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--text-secondary)] md:flex">
          <Link
            href="/#use-cases"
            className="transition hover:text-[var(--text-primary)]"
          >
            Use Cases
          </Link>
          <Link
            href="/pricing"
            className="text-[var(--text-primary)] font-semibold transition"
          >
            Pricing
          </Link>
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
            href="/auth/signin"
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
              <Link
                href="/#use-cases"
                className="text-sm font-semibold text-[var(--text-secondary)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use Cases
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-[var(--text-primary)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
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
                href="/auth/signin"
                className="btn-cta inline-flex w-full items-center justify-center px-5 py-3 text-sm font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get OpenClaw
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      {/* Hero strip */}
      <section className="px-5 py-16 text-center md:px-20 md:py-24">
        <p className="text-xs font-[800] uppercase tracking-[0.28em] text-[var(--text-tertiary)]">
          Pricing
        </p>
        <h1 className="mt-4 text-[40px] font-[900] tracking-[-0.05em] text-[var(--text-primary)] md:text-[56px]">
          Simple, Transparent Pricing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-secondary)]">
          Choose the compute profile you need. Upgrade or cancel anytime.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
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
      </section>

      {/* Pricing cards */}
      <section className="px-5 pb-16 md:px-20">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
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

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          All plans include OpenClaw. Switch to Hermes Agent anytime from your dashboard.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-5 py-20 md:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-[800] tracking-[-0.04em] text-[var(--text-primary)] md:text-[40px]">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] md:text-lg">
            The core questions are mostly about trust, setup, and whether Claway is the right way to access OpenClaw.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
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

      {/* Footer */}
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
              ["Use Cases", "/#use-cases"],
              ["Pricing", "/pricing"],
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
              href="/pricing"
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
          © 2026 Claway. All rights reserved. · Not affiliated with the official OpenClaw project.
        </div>
      </footer>
    </main>
  );
}
