"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  ExternalLink,
  LoaderCircle,
  Monitor,
  Play,
  Plus,
  Power,
  Trash2,
  X,
} from "lucide-react";

import LobsterIcon from "@/components/LobsterIcon";
import { cn } from "@/lib/utils";

type AgentType = "openclaw" | "hermes";
type Plan = "free" | "pro" | "team";

export type InstanceStatus = "running" | "stopped" | "suspended" | "creating" | "error";

export interface DashboardInstance {
  id: string;
  agent_type: string;
  plan: string;
  status: string;
  created_at?: string | null;
  createdAt?: string | null;
}

interface DashboardSession {
  user?: {
    email?: string | null;
  };
  clawayAccessToken?: string;
}

interface DashboardClientProps {
  initialInstances: DashboardInstance[];
  initialError?: string;
  session: DashboardSession;
}

const agentBadgeStyles: Record<AgentType, string> = {
  openclaw: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  hermes: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
};

const planBadgeStyles: Record<Plan, string> = {
  free: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  pro: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  team: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

const statusStyles: Record<InstanceStatus, string> = {
  running: "bg-emerald-500",
  stopped: "bg-amber-400",
  suspended: "bg-amber-400",
  creating: "bg-sky-500",
  error: "bg-red-500",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return apiUrl;
}

function getInstanceDate(instance: DashboardInstance) {
  return instance.created_at ?? instance.createdAt ?? null;
}

function getDisplayDate(instance: DashboardInstance) {
  const rawDate = getInstanceDate(instance);

  if (!rawDate) {
    return "Unknown";
  }

  const parsedDate = new Date(rawDate);

  return Number.isNaN(parsedDate.getTime())
    ? "Unknown"
    : dateFormatter.format(parsedDate);
}

function normalizeInstances(payload: unknown): DashboardInstance[] {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload.filter((instance): instance is DashboardInstance => {
    if (!instance || typeof instance !== "object") {
      return false;
    }

    const candidate = instance as Record<string, unknown>;

    return (
      typeof candidate.id === "string" &&
      typeof candidate.agent_type === "string" &&
      typeof candidate.plan === "string" &&
      typeof candidate.status === "string"
    );
  });
}

async function readErrorMessage(response: Response, fallback: string) {
  const text = await response.text();
  return text || fallback;
}

export default function DashboardClient({
  initialInstances,
  initialError,
  session,
}: DashboardClientProps) {
  const [instances, setInstances] = useState(initialInstances);
  const [error, setError] = useState(initialError ?? "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [activeInstanceId, setActiveInstanceId] = useState<string | null>(null);
  const [agentType, setAgentType] = useState<AgentType>("openclaw");
  const [plan, setPlan] = useState<Plan>("free");

  const accessToken = session.clawayAccessToken;

  const sortedInstances = [...instances].sort((left, right) => {
    const leftRawDate = getInstanceDate(left);
    const rightRawDate = getInstanceDate(right);
    const leftDate = leftRawDate ? new Date(leftRawDate).getTime() : 0;
    const rightDate = rightRawDate ? new Date(rightRawDate).getTime() : 0;

    return rightDate - leftDate;
  });

  async function apiRequest(path: string, init?: RequestInit) {
    if (!accessToken) {
      throw new Error("Missing claway access token");
    }

    const response = await fetch(`${getApiUrl()}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response, "Request failed"));
    }

    return response;
  }

  async function refreshInstances() {
    const response = await apiRequest("/api/instances");
    const payload = (await response.json()) as unknown;
    setInstances(normalizeInstances(payload));
  }

  async function handleCreateInstance() {
    setIsCreating(true);
    setError("");

    try {
      await apiRequest("/api/instances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_type: agentType,
          plan,
        }),
      });

      await refreshInstances();
      setIsDialogOpen(false);
      setAgentType("openclaw");
      setPlan("free");
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to create instance");
    } finally {
      setIsCreating(false);
    }
  }

  async function runInstanceAction(
    instanceId: string,
    action: "suspend" | "resume" | "delete",
  ) {
    if (action === "delete") {
      const confirmed = window.confirm("Delete this instance permanently?");

      if (!confirmed) {
        return;
      }
    }

    setActiveInstanceId(instanceId);
    setError("");

    try {
      const path =
        action === "delete"
          ? `/api/instances/${instanceId}`
          : `/api/instances/${instanceId}/${action}`;

      await apiRequest(path, {
        method: action === "delete" ? "DELETE" : "POST",
      });

      await refreshInstances();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : `Failed to ${action} instance`);
    } finally {
      setActiveInstanceId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-30 border-b border-[var(--divider)] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]"
          >
            <LobsterIcon className="h-7 w-7" />
            <span>
              Claw<span className="text-[var(--accent)]">ay</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-[var(--divider)] bg-[var(--bg-secondary)] px-4 py-2 text-sm text-[var(--text-secondary)] sm:block">
              {session.user?.email ?? "Signed in"}
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-[var(--divider)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-[800] uppercase tracking-[0.28em] text-[var(--text-tertiary)]">
              Dashboard
            </p>
            <h1 className="mt-3 text-[34px] font-[900] tracking-[-0.05em] text-[var(--text-primary)] md:text-[46px]">
              My Instances
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] md:text-base">
              Launch, pause, and manage your private OpenClaw or Hermes environments from one place.
            </p>
          </div>

          <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="btn-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
              >
                <Plus className="h-4 w-4" />
                New Instance
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-[var(--divider)] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="text-2xl font-[900] tracking-[-0.04em] text-[var(--text-primary)]">
                      New Instance
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      Choose an agent type and plan, then create a new hosted environment.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="rounded-full border border-[var(--divider)] p-2 text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <label
                      htmlFor="agent-type"
                      className="text-sm font-semibold text-[var(--text-primary)]"
                    >
                      Agent type
                    </label>
                    <select
                      id="agent-type"
                      value={agentType}
                      onChange={(event) => setAgentType(event.target.value as AgentType)}
                      className="mt-2 w-full rounded-2xl border border-[var(--divider)] bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                    >
                      <option value="openclaw">OpenClaw</option>
                      <option value="hermes">Hermes</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="plan"
                      className="text-sm font-semibold text-[var(--text-primary)]"
                    >
                      Plan
                    </label>
                    <select
                      id="plan"
                      value={plan}
                      onChange={(event) => setPlan(event.target.value as Plan)}
                      className="mt-2 w-full rounded-2xl border border-[var(--divider)] bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="team">Team</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateInstance}
                    disabled={isCreating}
                    className="btn-cta inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isCreating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    Create Instance
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {sortedInstances.length === 0 ? (
          <div className="mt-10 flex min-h-[420px] items-center justify-center">
            <div className="w-full max-w-2xl rounded-[32px] border border-dashed border-[var(--divider)] bg-white px-8 py-14 text-center shadow-[0_20px_70px_rgba(15,23,42,0.05)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(239,68,68,0.12)] text-[var(--accent)]">
                <Monitor className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-2xl font-[900] tracking-[-0.04em] text-[var(--text-primary)]">
                No instances yet
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)] md:text-base">
                Create your first OpenClaw or Hermes instance to get started.
              </p>
              <button
                type="button"
                onClick={() => setIsDialogOpen(true)}
                className="btn-cta mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
              >
                <Plus className="h-4 w-4" />
                Create Instance
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 xl:grid-cols-2">
            {sortedInstances.map((instance) => {
              const normalizedAgentType =
                instance.agent_type === "hermes" ? "hermes" : "openclaw";
              const normalizedPlan = (["free", "pro", "team"].includes(instance.plan)
                ? instance.plan
                : "free") as Plan;
              const normalizedStatus = (
                ["running", "stopped", "suspended", "creating", "error"].includes(instance.status)
                  ? instance.status
                  : "error"
              ) as InstanceStatus;
              const webUrl = `https://${instance.id}.agentcloud.space`;
              const ttyUrl = `https://${instance.id}-tty.agentcloud.space`;
              const isBusy = activeInstanceId === instance.id;

              return (
                <article
                  key={instance.id}
                  className="rounded-[28px] border border-[var(--divider)] bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
                              agentBadgeStyles[normalizedAgentType],
                            )}
                          >
                            {normalizedAgentType}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
                              planBadgeStyles[normalizedPlan],
                            )}
                          >
                            {normalizedPlan}
                          </span>
                        </div>

                        <h2 className="mt-4 text-2xl font-[900] tracking-[-0.04em] text-[var(--text-primary)]">
                          {instance.id}
                        </h2>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                statusStyles[normalizedStatus],
                              )}
                            />
                            <span className="capitalize">{normalizedStatus}</span>
                          </span>
                          <span>Created {getDisplayDate(instance)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href={webUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--divider)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open
                        </a>
                        <a
                          href={ttyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--divider)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                        >
                          <Monitor className="h-4 w-4" />
                          Terminal
                        </a>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <button
                        type="button"
                        onClick={() => runInstanceAction(instance.id, "suspend")}
                        disabled={isBusy}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--divider)] bg-white px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-amber-300 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isBusy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Power className="h-4 w-4" />}
                        Suspend
                      </button>
                      <button
                        type="button"
                        onClick={() => runInstanceAction(instance.id, "resume")}
                        disabled={isBusy}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--divider)] bg-white px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isBusy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                        Resume
                      </button>
                      <button
                        type="button"
                        onClick={() => runInstanceAction(instance.id, "delete")}
                        disabled={isBusy}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isBusy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
