/** Conversions from Dependency-Track API responses to the UI's domain types. */
import type {
  DtConciseProject,
  DtFinding,
  DtPortfolioMetrics,
  DtProject,
  DtProjectMetrics,
  DtTimestamp,
} from "@/lib/dt/types";

import {
  classifiers,
  type AnalysisState,
  type Classifier,
  type Page,
  type ProjectFinding,
  type ProjectMetricsSummary,
  type ProjectSummary,
  type RiskLevel,
  type Severity,
  type SeverityCounts,
} from "./types";

export function toEpoch(value: DtTimestamp): number | null {
  if (value === null || value === undefined || value === "") return null;
  const ms = typeof value === "number" ? value : Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export function toSeverity(value: string | undefined): Severity {
  const s = (value ?? "").toLowerCase();
  return s === "critical" || s === "high" || s === "medium" || s === "low" || s === "info" ? s : "unassigned";
}

export function toCvss(v: { cvssV4Score?: number; cvssV3BaseScore?: number; cvssV2BaseScore?: number }): number | undefined {
  return v.cvssV4Score ?? v.cvssV3BaseScore ?? v.cvssV2BaseScore;
}

function toClassifier(value: string | null | undefined): Classifier | undefined {
  return classifiers.find((c) => c === value);
}

export function toSeverityCounts(m: DtProjectMetrics | DtPortfolioMetrics | null | undefined): SeverityCounts {
  return {
    critical: m?.critical ?? 0,
    high: m?.high ?? 0,
    medium: m?.medium ?? 0,
    low: m?.low ?? 0,
    unassigned: m?.unassigned ?? 0,
  };
}

/** Coarse risk level derived from severity counts, used for badges and posture. */
export function riskFor(c: SeverityCounts): RiskLevel {
  if (c.critical >= 2 || (c.critical > 0 && c.high >= 3) || c.high >= 4) return "high";
  if (c.critical > 0 || c.high > 0 || c.medium > 2) return "medium";
  return "low";
}

function toMetrics(m: DtProjectMetrics | null | undefined): ProjectMetricsSummary | undefined {
  if (!m) return undefined;
  return {
    components: m.components ?? 0,
    findings: m.vulnerabilities ?? 0,
    severity: toSeverityCounts(m),
    policyViolations: m.policyViolationsTotal ?? 0,
  };
}

function toTags(tags: DtConciseProject["tags"]): string[] {
  return (tags ?? []).map((t) => (typeof t === "string" ? t : t.name)).filter(Boolean);
}

interface SummaryExtras {
  riskScore: number | null | undefined;
  hasChildren: boolean;
  metrics?: DtProjectMetrics | null;
}

export function toSummary(p: DtConciseProject | DtProject, extras: SummaryExtras): ProjectSummary {
  const metrics = toMetrics(extras.metrics);
  return {
    uuid: p.uuid,
    name: p.name,
    group: p.group ?? undefined,
    version: p.version ?? undefined,
    classifier: toClassifier(p.classifier),
    active: p.active ?? true,
    isLatest: p.isLatest ?? false,
    tags: toTags(p.tags),
    hasChildren: extras.hasChildren,
    lastBomImport: toEpoch(p.lastBomImport),
    lastBomImportFormat: p.lastBomImportFormat ?? undefined,
    riskScore: extras.riskScore ?? extras.metrics?.inheritedRiskScore ?? 0,
    risk: metrics ? riskFor(metrics.severity) : "low",
    metrics,
  };
}

export function fromConcise(p: DtConciseProject): ProjectSummary {
  return toSummary(p, { riskScore: p.lastRiskScore, hasChildren: Boolean(p.hasChildren), metrics: p.metrics });
}

const analysisStates: AnalysisState[] = ["NOT_SET", "EXPLOITABLE", "IN_TRIAGE", "FALSE_POSITIVE", "NOT_AFFECTED", "RESOLVED"];

export function toFinding(f: DtFinding): ProjectFinding {
  const v = f.vulnerability;
  return {
    key: `${f.component.uuid}:${v.uuid}`,
    vulnId: v.vulnId,
    source: v.source,
    title: v.title,
    severity: toSeverity(v.severity),
    cvss: toCvss(v),
    component: { name: f.component.name, group: f.component.group, version: f.component.version },
    analysisState: analysisStates.find((s) => s === f.analysis?.state) ?? "NOT_SET",
    suppressed: f.analysis?.isSuppressed ?? false,
    attributedOn: toEpoch(f.attribution?.attributedOn),
  };
}

export function toPage<T>(items: T[], total: number | null, page: number, pageSize: number): Page<T> {
  const count = total ?? items.length;
  return { items, total: count, page, pageSize, pageCount: Math.max(1, Math.ceil(count / pageSize)) };
}
