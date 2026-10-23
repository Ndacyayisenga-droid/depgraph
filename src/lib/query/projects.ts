import { classifiers, type Classifier } from "@/lib/data/types";

import { firstValue, parseOneOf, parsePositiveInt, parseSearchText, type RawSearchParams } from "./url";

export const pageSizes = [10, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 25;

/** Columns the Dependency-Track concise project endpoint can sort on. */
const projectSortKeys = ["name", "version", "risk", "lastBomImport"] as const;
export type ProjectSortKey = (typeof projectSortKeys)[number];
export type SortDirection = "asc" | "desc";

export const projectSortField: Record<ProjectSortKey, string> = {
  name: "name",
  version: "version",
  risk: "lastRiskScore",
  lastBomImport: "lastBomImport",
};

export interface ProjectQuery {
  q: string;
  page: number;
  pageSize: number;
  sort: ProjectSortKey;
  dir: SortDirection;
  classifier: Classifier | "all";
  tag: string;
  /** Dependency-Track can only hide inactive projects, not list them exclusively. */
  status: "active" | "all";
  scope: "root" | "all";
  parent: string;
}

export const defaultProjectQuery: ProjectQuery = {
  q: "",
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  sort: "risk",
  dir: "desc",
  classifier: "all",
  tag: "",
  status: "active",
  scope: "root",
  parent: "",
};

/** Natural direction when a column is first sorted. */
export const defaultSortDirection: Record<ProjectSortKey, SortDirection> = {
  name: "asc",
  version: "desc",
  risk: "desc",
  lastBomImport: "desc",
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID.test(value);
}

export function normalizePageSize(size: number): number {
  return (pageSizes as readonly number[]).includes(size) ? size : DEFAULT_PAGE_SIZE;
}

export function parsePageSize(value: string | undefined): number {
  return normalizePageSize(Number(value));
}

export function parseProjectQuery(params: RawSearchParams): ProjectQuery {
  const get = (key: string) => firstValue(params[key]);
  const d = defaultProjectQuery;
  const parent = get("parent") ?? "";
  return {
    q: parseSearchText(get("q")),
    page: parsePositiveInt(get("page"), d.page),
    pageSize: parsePageSize(get("size")),
    sort: parseOneOf(get("sort"), projectSortKeys, d.sort),
    dir: parseOneOf(get("dir"), ["asc", "desc"] as const, d.dir),
    classifier: parseOneOf(get("classifier"), [...classifiers, "all"] as const, d.classifier),
    tag: (get("tag") ?? "").slice(0, 200),
    status: parseOneOf(get("status"), ["active", "all"] as const, d.status),
    scope: parseOneOf(get("scope"), ["root", "all"] as const, d.scope),
    parent: isUuid(parent) ? parent : "",
  };
}

const paramNames: Record<keyof ProjectQuery, string> = {
  q: "q",
  page: "page",
  pageSize: "size",
  sort: "sort",
  dir: "dir",
  classifier: "classifier",
  tag: "tag",
  status: "status",
  scope: "scope",
  parent: "parent",
};

/** URL parameter changes, with `null` for values equal to the default. */
export function projectQueryParams(query: Partial<ProjectQuery>): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  for (const key of Object.keys(query) as (keyof ProjectQuery)[]) {
    const value = query[key];
    out[paramNames[key]] = value === defaultProjectQuery[key] ? null : String(value);
  }
  return out;
}

export function hasActiveFilters(query: ProjectQuery): boolean {
  const d = defaultProjectQuery;
  return (
    query.q !== d.q ||
    query.classifier !== d.classifier ||
    query.tag !== d.tag ||
    query.status !== d.status ||
    query.scope !== d.scope ||
    query.parent !== d.parent
  );
}

/**
 * Top-level only applies to the unfiltered portfolio view; searching or
 * filtering always covers nested projects too.
 */
export function onlyRootProjects(query: ProjectQuery): boolean {
  return query.scope === "root" && !query.q && !query.tag && query.classifier === "all" && !query.parent;
}
