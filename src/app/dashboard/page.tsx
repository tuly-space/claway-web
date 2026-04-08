import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import DashboardClient, { type DashboardInstance } from "./DashboardClient";
import { authOptions } from "@/lib/auth";

async function fetchInstances(accessToken: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return {
      instances: [] as DashboardInstance[],
      error: "NEXT_PUBLIC_API_URL is not configured",
    };
  }

  const response = await fetch(`${apiUrl}/api/instances`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    return {
      instances: [] as DashboardInstance[],
      error: errorText || "Failed to load instances",
    };
  }

  const payload = (await response.json()) as unknown;

  return {
    instances: Array.isArray(payload) ? (payload as DashboardInstance[]) : [],
    error: undefined,
  };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.clawayAccessToken) {
    redirect("/auth/signin");
  }

  const { instances, error } = await fetchInstances(session.clawayAccessToken);

  return (
    <DashboardClient
      session={session}
      initialInstances={instances}
      initialError={error}
    />
  );
}
