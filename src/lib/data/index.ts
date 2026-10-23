/**
 * Data access layer for the UI, backed by the Dependency-Track REST API.
 * Pages and components read only through these functions, which map API
 * responses to the domain types in `./types`. Server-only: requests carry the
 * API key.
 */
import "server-only";

export type * from "./types";
export { riskFor } from "./mappers";
export { getPortfolioMetrics, getPortfolioTrend } from "./portfolio";
export {
  getMostVulnerableProjects,
  getPolicyViolations,
  getProject,
  getProjectChildren,
  getProjectComponents,
  getProjectFindings,
  getProjectTags,
  getRecentBomImports,
  getTopProjectFindings,
  listProjects,
} from "./projects";
export { getAffectedProjects, listVulnerabilities } from "./vulnerabilities";
export { getInstanceSettings, getInstanceVersion, getIntegrations, getNotificationRules, getReports } from "./instance";
