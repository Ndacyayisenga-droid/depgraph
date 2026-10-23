import type { Severity } from "@/lib/data/types";

import { firstValue, parseOneOf, parsePositiveInt, parseSearchText, type RawSearchParams } from "./url";

export const vulnerabilitySeverities: Severity[] = ["critical", "high", "medium", "low", "info", "unassigned"];
const vulnerabilitySortKeys = ["affected", "cvss", "published", "id"] as const;
export type VulnerabilitySortKey = (typeof vulnerabilitySortKeys)[number];
export type VulnerabilitySortDirection = "asc" | "desc";

export const vulnerabilitySortField: Record<VulnerabilitySortKey, string> = {
  affected: "vulnerability.affectedProjectCount",
  cvss: "vulnerability.cvssV3BaseScore",
  published: "vulnerability.published",
  id: "vulnerability.vulnId",
};

/** Natural direction when a column is first sorted. */
export const defaultVulnerabilitySortDirection: Record<VulnerabilitySortKey, VulnerabilitySortDirection> = {
  affected: "desc",
  cvss: "desc",
  published: "desc",
  id: "asc",
};

export interface VulnerabilityQuery {
  q: string;
  severity: Severity | "all";
  page: number;
  sort: VulnerabilitySortKey;
  dir: VulnerabilitySortDirection;
}

export const defaultVulnerabilityQuery: VulnerabilityQuery = {
  q: "",
  severity: "all",
  page: 1,
  sort: "affected",
  dir: "desc",
};

export const VULNERABILITY_PAGE_SIZE = 25;

export function parseVulnerabilityQuery(params: RawSearchParams): VulnerabilityQuery {
  const get = (key: string) => firstValue(params[key]);
  const d = defaultVulnerabilityQuery;
  return {
    q: parseSearchText(get("q")),
    severity: parseOneOf(get("severity"), [...vulnerabilitySeverities, "all"] as const, d.severity),
    page: parsePositiveInt(get("page"), d.page),
    sort: parseOneOf(get("sort"), vulnerabilitySortKeys, d.sort),
    dir: parseOneOf(get("dir"), ["asc", "desc"] as const, d.dir),
  };
}
