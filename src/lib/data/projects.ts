import "server-only";

import { cache } from "react";

import { DtApiError, dtGet } from "@/lib/dt/client";
import type {
  DtComponent,
  DtConciseProject,
  DtFinding,
  DtPolicyViolation,
  DtProject,
  DtProjectMetrics,
  DtTag,
} from "@/lib/dt/types";
import { normalizePageSize, onlyRootProjects, projectSortField, type ProjectQuery } from "@/lib/query/projects";

import { fromConcise, toFinding, toPage, toSummary } from "./mappers";
import type {
  Component,
  Page,
  PolicyViolation,
  ProjectDetail,
  ProjectFinding,
  ProjectSummary,
  Severity,
} from "./types";

interface PageRequest {
  q?: string;
  page?: number;
  pageSize?: number;
}

/* Portfolio listing --------------------------------------------------------- */

export async function listProjects(query: ProjectQuery): Promise<Page<ProjectSummary>> {
  const pageSize = normalizePageSize(query.pageSize);
  const path = query.parent ? `/v1/project/concise/${query.parent}/children` : "/v1/project/concise";
  const { data, total } = await dtGet<DtConciseProject[]>(path, {
    pageNumber: query.page,
    pageSize,
    sortName: projectSortField[query.sort],
    sortOrder: query.dir,
    searchText: query.q,
    classifier: query.classifier === "all" ? undefined : query.classifier,
    tag: query.tag,
    active: query.status === "active" ? true : undefined,
    onlyRoot: query.parent ? undefined : onlyRootProjects(query) || undefined,
    includeMetrics: true,
  });
  return toPage((data ?? []).map(fromConcise), total, query.page, pageSize);
}

export async function getProjectTags(): Promise<string[]> {
  const { data } = await dtGet<DtTag[]>("/v1/tag", { pageSize: 100, sortName: "name", sortOrder: "asc" });
  return (data ?? []).filter((t) => (t.projectCount ?? 1) > 0).map((t) => t.name);
}

export async function getMostVulnerableProjects(limit = 5): Promise<ProjectSummary[]> {
  const { data } = await dtGet<DtConciseProject[]>("/v1/project/concise", {
    pageNumber: 1,
    pageSize: limit,
    sortName: "lastRiskScore",
    sortOrder: "desc",
    active: true,
    includeMetrics: true,
  });
  return (data ?? []).map(fromConcise).filter((p) => (p.metrics?.findings ?? 0) > 0);
}

export async function getRecentBomImports(limit = 5): Promise<ProjectSummary[]> {
  const { data } = await dtGet<DtConciseProject[]>("/v1/project/concise", {
    pageNumber: 1,
    pageSize: limit,
    sortName: "lastBomImport",
    sortOrder: "desc",
    includeMetrics: true,
  });
  return (data ?? []).map(fromConcise).filter((p) => p.lastBomImport !== null);
}

/* Single project ------------------------------------------------------------ */

/** A project with metrics and versions; `undefined` if it doesn't exist. Cached per request. */
export const getProject = cache(async (uuid: string): Promise<ProjectDetail | undefined> => {
  try {
    const [{ data: project }, metrics] = await Promise.all([
      dtGet<DtProject>(`/v1/project/${uuid}`),
      dtGet<DtProjectMetrics>(`/v1/metrics/project/${uuid}/current`).catch(() => ({ data: null })),
    ]);
    return {
      ...toSummary(project, {
        riskScore: project.lastInheritedRiskScore,
        hasChildren: Boolean(project.children?.length),
        metrics: metrics.data ?? project.metrics,
      }),
      description: project.description ?? undefined,
      purl: project.purl ?? undefined,
      parent: project.parent
        ? { uuid: project.parent.uuid, name: project.parent.name, version: project.parent.version ?? undefined }
        : undefined,
      versions: (project.versions ?? [])
        .map((v) => ({ uuid: v.uuid, version: v.version ?? "", active: v.active ?? true, isLatest: v.isLatest ?? false }))
        .sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true })),
    };
  } catch (error) {
    if (error instanceof DtApiError && (error.status === 404 || error.status === 400)) return undefined;
    throw error;
  }
});

export async function getProjectChildren(uuid: string, pageSize = 8): Promise<Page<ProjectSummary>> {
  const { data, total } = await dtGet<DtConciseProject[]>(`/v1/project/concise/${uuid}/children`, {
    pageNumber: 1,
    pageSize,
    sortName: "name",
    sortOrder: "asc",
    includeMetrics: true,
  });
  return toPage((data ?? []).map(fromConcise), total, 1, pageSize);
}

export async function getProjectFindings(uuid: string, { q = "", page = 1, pageSize = 25 }: PageRequest = {}): Promise<Page<ProjectFinding>> {
  const size = normalizePageSize(pageSize);
  const { data, total } = await dtGet<DtFinding[]>(`/v1/finding/project/${uuid}`, {
    pageNumber: page,
    pageSize: size,
    searchText: q,
  });
  return toPage((data ?? []).map(toFinding), total, page, size);
}

const severityRank: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3, info: 4, unassigned: 5 };

/** The most severe findings of a project, ranked by severity and CVSS. */
export async function getTopProjectFindings(uuid: string, limit = 4): Promise<Page<ProjectFinding>> {
  const sample = await getProjectFindings(uuid, { pageSize: 100 });
  const items = [...sample.items]
    .sort((a, b) => severityRank[a.severity] - severityRank[b.severity] || (b.cvss ?? 0) - (a.cvss ?? 0))
    .slice(0, limit);
  return { ...sample, items };
}

export async function getProjectComponents(uuid: string, { q = "", page = 1, pageSize = 25 }: PageRequest = {}): Promise<Page<Component>> {
  const size = normalizePageSize(pageSize);
  const { data, total } = await dtGet<DtComponent[]>(`/v1/component/project/${uuid}`, {
    pageNumber: page,
    pageSize: size,
    searchText: q,
    sortName: "name",
    sortOrder: "asc",
  });
  const components = (data ?? []).map((c) => ({
    uuid: c.uuid,
    name: c.name,
    group: c.group ?? undefined,
    version: c.version ?? undefined,
    license: c.resolvedLicense?.licenseId ?? c.licenseExpression ?? c.license ?? undefined,
    latestVersion: c.repositoryMeta?.latestVersion ?? undefined,
  }));
  return toPage(components, total, page, size);
}

const violationTypes = { LICENSE: "license", SECURITY: "security", OPERATIONAL: "operational" } as const;
const violationStates = { FAIL: "fail", WARN: "warn", INFO: "info" } as const;
const POLICY_PAGE_SIZE = 100;

export async function getPolicyViolations(uuid: string): Promise<Page<PolicyViolation>> {
  const { data, total } = await dtGet<DtPolicyViolation[]>(`/v1/violation/project/${uuid}`, {
    pageNumber: 1,
    pageSize: POLICY_PAGE_SIZE,
  });
  const violations = (data ?? []).map((v) => ({
    uuid: v.uuid,
    policy: v.policyCondition?.policy?.name ?? "—",
    component: [v.component?.name, v.component?.version].filter(Boolean).join(" "),
    type: violationTypes[(v.type ?? "OPERATIONAL") as keyof typeof violationTypes] ?? "operational",
    state: violationStates[(v.policyCondition?.policy?.violationState ?? "INFO") as keyof typeof violationStates] ?? "info",
  }));
  return toPage(violations, total, 1, POLICY_PAGE_SIZE);
}
