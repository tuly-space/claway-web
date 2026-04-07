"use client";

import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-primary)] px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]"
        >
          <span>claway</span>
        </Link>

        <div className="rounded-[28px] border border-[var(--divider)] bg-[var(--bg-card)] p-8 shadow-[0_16px_60px_rgba(15,23,42,0.06)]">
          <h1 className="text-center text-[22px] font-[900] tracking-[-0.04em] text-[var(--text-primary)]">
            Sign in to Claway
          </h1>
          <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
            Your OpenClaw, always on.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {/* Google */}
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
          </div>

          <p className="mt-6 text-center text-xs text-[var(--text-tertiary)]">
            By signing in, you agree to our{" "}
            <Link href="#" className="underline hover:text-[var(--text-primary)]">Terms</Link>
            {" "}and{" "}
            <Link href="#" className="underline hover:text-[var(--text-primary)]">Privacy Policy</Link>.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          No account yet?{" "}
          <Link href="/#pricing" className="font-semibold text-[var(--accent)] hover:underline">
            See plans →
          </Link>
        </p>
      </div>
    </main>
  );
}
