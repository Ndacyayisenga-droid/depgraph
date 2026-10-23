import "server-only";

import { dtGet } from "@/lib/dt/client";
import type { DtAffectedProject, DtGroupedFinding } from "@/lib/dt/types";
import { VULNERABILITY_PAGE_SIZE, vulnerabilitySortField, type VulnerabilityQuery } from "@/lib/query/vulnerabilities";

import { toCvss, toEpoch, toPage, toSeverity } from "./mappers";
import type { AffectedProject, GroupedVulnerability, Page } from "./types";

const TEXT_SEARCH_FIELDS = "VULNERABILITY_ID,VULNERABILITY_TITLE,COMPONENT_NAME,PROJECT_NAME";
const MAX_AFFECTED_PROJECTS = 50;

/** Vulnerabilities across the portfolio, one row per vulnerability. */
export async function listVulnerabilities(query: VulnerabilityQuery): Promise<Page<GroupedVulnerability>> {
  const { data, total } = await dtGet<DtGroupedFinding[]>("/v1/finding/grouped", {
    pageNumber: query.page,
    pageSize: VULNERABILITY_PAGE_SIZE,
    sortName: vulnerabilitySortField[query.sort],
    sortOrder: query.dir,
    severity: query.severity === "all" ? undefined : query.severity.toUpperCase(),
    textSearchField: query.q ? TEXT_SEARCH_FIELDS : undefined,
    textSearchInput: query.q,
  });
  const vulnerabilities = (data ?? []).map(({ vulnerability: v }) => ({
    source: v.source,
    vulnId: v.vulnId,
    title: v.title,
    severity: toSeverity(v.severity),
    cvss: toCvss(v),
    published: toEpoch(v.published),
    affectedProjectCount: v.affectedProjectCount ?? 0,
  }));
  return toPage(vulnerabilities, total, query.page, VULNERABILITY_PAGE_SIZE);
}

export async function getAffectedProjects(source: string, vulnId: string): Promise<AffectedProject[]> {
  const { data } = await dtGet<DtAffectedProject[]>(
    `/v1/vulnerability/source/${encodeURIComponent(source)}/vuln/${encodeURIComponent(vulnId)}/projects`,
    { pageNumber: 1, pageSize: MAX_AFFECTED_PROJECTS },
  );
  return (data ?? []).map((p) => ({ uuid: p.uuid, name: p.name, version: p.version ?? undefined, active: p.active ?? true }));
}
