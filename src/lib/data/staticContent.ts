/**
 * Static content for screens that have no Dependency-Track API counterpart
 * (reports, and the configuration forms that require administrator access).
 */
import type { InstanceSettings, Integration, NotificationRule, Report } from "./types";

export const reports: Report[] = [
  { id: "rpt-1", name: "Security Summary", type: "vulnerability", generatedAt: "2026-05-01T10:14:00Z", status: "completed" },
  { id: "rpt-2", name: "SBOM Report", type: "sbom", generatedAt: "2026-04-30T15:17:00Z", status: "completed" },
  { id: "rpt-3", name: "Compliance Report", type: "policy", generatedAt: "2026-04-29T11:02:00Z", status: "completed" },
  { id: "rpt-4", name: "Dependency Report", type: "dependencies", generatedAt: "2026-04-28T09:41:00Z", status: "completed" },
  { id: "rpt-5", name: "Vulnerability Trend", type: "trend", generatedAt: "2026-04-27T14:25:00Z", status: "completed" },
];

export const integrations: Integration[] = [
  { id: "github", name: "GitHub", description: "Import repositories and upload SBOMs from CI.", connected: true },
  { id: "nvd", name: "NVD mirror", description: "National Vulnerability Database feed.", connected: true },
  { id: "osv", name: "OSV", description: "Open Source Vulnerabilities database.", connected: true },
  { id: "slack", name: "Slack", description: "Send alerts to team channels.", connected: false },
  { id: "jira", name: "Jira", description: "Create tickets from findings.", connected: false },
];

export const notificationRules: NotificationRule[] = [
  { id: "critical", name: "New critical vulnerabilities", description: "Alert as soon as a critical finding is detected.", enabled: true },
  { id: "policy", name: "Policy violations", description: "Notify when a project fails a policy.", enabled: true },
  { id: "sbom-failed", name: "SBOM processing failures", description: "Notify when an uploaded SBOM cannot be analyzed.", enabled: true },
  { id: "digest", name: "Weekly portfolio digest", description: "Summary of risk changes every Monday.", enabled: false },
];

export const instanceSettings: InstanceSettings = {
  instanceName: "Open Elements DT",
  baseUrl: "https://dependency-track.open-elements.cloud",
  timeZone: "UTC",
  defaultProjectView: "all",
  reportRetentionDays: 90,
};
