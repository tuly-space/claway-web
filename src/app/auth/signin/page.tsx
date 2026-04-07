"use client";

import Link from "next/link";
import LobsterIcon from "@/components/LobsterIcon";

export default function SignInPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* LEFT PANEL */}
      <div className="flex w-full flex-shrink-0 flex-col bg-white p-8 md:w-[420px] md:p-12 lg:w-[480px]">
        {/* Top: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]"
        >
          <LobsterIcon className="h-8 w-8" />
          <span>Claw<span className="text-[var(--accent)]">ay</span></span>
        </Link>

        {/* Middle: Form */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
            <div>
              <h1 className="text-[28px] font-[900] tracking-[-0.05em] text-[var(--text-primary)]">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Sign in to access your OpenClaw instance.
              </p>
            </div>

            {/* Google button */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-[14px] border border-[var(--divider)] bg-white px-5 py-3.5 text-sm font-semibold text-[var(--text-primary)] shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(15,23,42,0.1)]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <hr className="flex-1 border-[var(--divider)]"/>
              <span className="text-xs text-[var(--text-tertiary)]">or</span>
              <hr className="flex-1 border-[var(--divider)]"/>
            </div>

            {/* Email input */}
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-[14px] border border-[var(--divider)] bg-[var(--bg-secondary)] px-4 py-3.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            />

            {/* Continue with Email button */}
            <button
              type="button"
              className="btn-cta w-full py-3.5 text-sm font-bold"
            >
              Continue with Email
            </button>

            {/* Fine print */}
            <p className="text-sm text-[var(--text-tertiary)]">
              No account?{" "}
              <a href="/pricing" className="font-semibold text-[var(--accent)] hover:underline">
                Plans start at $16/mo →
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-xs text-[var(--text-tertiary)]">
          By signing in you agree to our Terms and Privacy Policy.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative hidden flex-1 flex-col items-center justify-center overflow-hidden bg-[var(--bg-secondary)] p-12 md:flex lg:p-16">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.06),transparent_60%)]"/>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--divider)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-secondary)] shadow-sm">
            🔒 Your private instance, always on
          </span>

          {/* Pull quote */}
          <blockquote className="mt-8 text-[22px] font-[700] italic leading-[1.3] text-[var(--text-primary)] md:text-[26px]">
            &ldquo;The gap between what I can imagine and what actually works has never been{" "}
            <span className="text-[var(--accent)]">smaller.</span>&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            — Tobi, @tobi_bsf
          </p>

          {/* Stat cards */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { value: "60s", label: "Deploy time" },
              { value: "Private", label: "Isolated" },
              { value: "24/7", label: "Always on" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[var(--divider)] bg-white p-4 text-center shadow-sm"
              >
                <p className="text-2xl font-[900] text-[var(--text-primary)]">{stat.value}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <p className="mt-8 text-center text-xs text-[var(--text-tertiary)]">
            Trusted by 10,000+ builders · 350k+ GitHub stars
          </p>
        </div>
      </div>
    </div>
  );
}
