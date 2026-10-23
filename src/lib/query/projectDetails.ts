import { parsePageSize } from "./projects";
import { firstValue, parseOneOf, parsePositiveInt, parseSearchText, type RawSearchParams } from "./url";

export const projectTabs = ["overview", "vulnerabilities", "dependencies", "sbom", "policy", "settings"] as const;
type ProjectTab = (typeof projectTabs)[number];

export interface ProjectDetailQuery {
  tab: ProjectTab;
  q: string;
  page: number;
  pageSize: number;
}

export function parseProjectDetailQuery(params: RawSearchParams): ProjectDetailQuery {
  const get = (key: string) => firstValue(params[key]);
  return {
    tab: parseOneOf(get("tab"), projectTabs, "overview"),
    q: parseSearchText(get("q")),
    page: parsePositiveInt(get("page"), 1),
    pageSize: parsePageSize(get("size")),
  };
}
