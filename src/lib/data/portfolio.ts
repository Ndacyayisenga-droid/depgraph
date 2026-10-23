import "server-only";

import { cache } from "react";

import { dtGet } from "@/lib/dt/client";
import type { DtPortfolioMetrics } from "@/lib/dt/types";

import { toEpoch, toSeverityCounts } from "./mappers";
import type { PortfolioMetrics, TrendPoint } from "./types";

function healthy(m: DtPortfolioMetrics | undefined): number {
  return Math.max((m?.projects ?? 0) - (m?.vulnerableProjects ?? 0), 0);
}

function percentChange(now: number, before: number | undefined): number | null {
  if (before === undefined || before === 0) return null;
  return (now - before) / before;
}

/** Current portfolio metrics with changes compared to 30 days ago. Cached per request. */
export const getPortfolioMetrics = cache(async (): Promise<PortfolioMetrics> => {
  const [{ data: current }, { data: history }] = await Promise.all([
    dtGet<DtPortfolioMetrics>("/v1/metrics/portfolio/current"),
    dtGet<DtPortfolioMetrics[]>("/v1/metrics/portfolio/30/days"),
  ]);
  const before = history?.[0];
  const projects = current?.projects ?? 0;
  const findings = current?.vulnerabilities ?? 0;
  return {
    projects,
    vulnerableProjects: current?.vulnerableProjects ?? 0,
    healthyProjects: healthy(current),
    components: current?.components ?? 0,
    vulnerableComponents: current?.vulnerableComponents ?? 0,
    findings,
    severity: toSeverityCounts(current),
    policyViolations: {
      total: current?.policyViolationsTotal ?? 0,
      fail: current?.policyViolationsFail ?? 0,
      warn: current?.policyViolationsWarn ?? 0,
      info: current?.policyViolationsInfo ?? 0,
      license: current?.policyViolationsLicenseTotal ?? 0,
      security: current?.policyViolationsSecurityTotal ?? 0,
      operational: current?.policyViolationsOperationalTotal ?? 0,
    },
    deltas: {
      projects: before ? projects - (before.projects ?? 0) : null,
      findingsPercent: percentChange(findings, before?.vulnerabilities),
      healthyPercent: before ? percentChange(healthy(current), healthy(before)) : null,
    },
  };
});

/** Month-end snapshots of the portfolio metrics for the last `months` months. */
export async function getPortfolioTrend(months = 8): Promise<TrendPoint[]> {
  const { data } = await dtGet<DtPortfolioMetrics[]>(`/v1/metrics/portfolio/${months * 31}/days`);
  const byMonth = new Map<string, DtPortfolioMetrics>();
  for (const snapshot of data ?? []) {
    const at = toEpoch(snapshot.lastOccurrence) ?? toEpoch(snapshot.firstOccurrence);
    if (at !== null) byMonth.set(new Date(at).toISOString().slice(0, 7), snapshot);
  }
  return [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-months)
    .map(([month, m]) => ({
      month: `${month}-01`,
      findings: m.vulnerabilities ?? 0,
      criticalHigh: (m.critical ?? 0) + (m.high ?? 0),
      policyViolations: m.policyViolationsTotal ?? 0,
    }));
}
