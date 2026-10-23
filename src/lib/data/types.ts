export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export type Severity = "critical" | "high" | "medium" | "low" | "info" | "unassigned";
export type RiskLevel = "high" | "medium" | "low";
export type Posture = "good" | "fair" | "poor";

export const classifiers = [
  "APPLICATION",
  "FRAMEWORK",
  "LIBRARY",
  "CONTAINER",
  "OPERATING_SYSTEM",
  "DEVICE",
  "FIRMWARE",
  "FILE",
  "PLATFORM",
  "DEVICE_DRIVER",
  "MACHINE_LEARNING_MODEL",
  "DATA",
  "CRYPTOGRAPHIC_ASSET",
] as const;
export type Classifier = (typeof classifiers)[number];

export interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
  unassigned: number;
}

export const severities: (keyof SeverityCounts)[] = ["critical", "high", "medium", "low", "unassigned"];

interface ProjectRef {
  uuid: string;
  name: string;
  version?: string;
}

export interface ProjectMetricsSummary {
  components: number;
  findings: number;
  severity: SeverityCounts;
  policyViolations: number;
}

export interface ProjectSummary {
  uuid: string;
  name: string;
  group?: string;
  version?: string;
  classifier?: Classifier;
  active: boolean;
  isLatest: boolean;
  tags: string[];
  hasChildren: boolean;
  /** Epoch milliseconds, `null` when no SBOM was ever imported. */
  lastBomImport: number | null;
  lastBomImportFormat?: string;
  riskScore: number;
  risk: RiskLevel;
  metrics?: ProjectMetricsSummary;
}

export interface ProjectVersion {
  uuid: string;
  version: string;
  active: boolean;
  isLatest: boolean;
}

export interface ProjectDetail extends ProjectSummary {
  description?: string;
  purl?: string;
  parent?: ProjectRef;
  versions: ProjectVersion[];
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export type AnalysisState =
  | "NOT_SET"
  | "EXPLOITABLE"
  | "IN_TRIAGE"
  | "FALSE_POSITIVE"
  | "NOT_AFFECTED"
  | "RESOLVED";

export interface ProjectFinding {
  key: string;
  vulnId: string;
  source: string;
  title?: string;
  severity: Severity;
  cvss?: number;
  component: { name: string; group?: string; version?: string };
  analysisState: AnalysisState;
  suppressed: boolean;
  attributedOn: number | null;
}

export interface Component {
  uuid: string;
  name: string;
  group?: string;
  version?: string;
  license?: string;
  latestVersion?: string;
}

export interface PolicyViolation {
  uuid: string;
  policy: string;
  component: string;
  type: "license" | "security" | "operational";
  state: "fail" | "warn" | "info";
}

interface PolicyViolationCounts {
  total: number;
  fail: number;
  warn: number;
  info: number;
  license: number;
  security: number;
  operational: number;
}

export interface PortfolioMetrics {
  projects: number;
  vulnerableProjects: number;
  healthyProjects: number;
  components: number;
  vulnerableComponents: number;
  findings: number;
  severity: SeverityCounts;
  policyViolations: PolicyViolationCounts;
  /** Change compared to 30 days ago; `null` when no history exists. */
  deltas: {
    projects: number | null;
    findingsPercent: number | null;
    healthyPercent: number | null;
  };
}

export interface TrendPoint {
  month: string;
  findings: number;
  criticalHigh: number;
  policyViolations: number;
}

export interface GroupedVulnerability {
  source: string;
  vulnId: string;
  title?: string;
  severity: Severity;
  cvss?: number;
  published: number | null;
  affectedProjectCount: number;
}

export interface AffectedProject extends ProjectRef {
  active: boolean;
}

type ReportType = "vulnerability" | "sbom" | "policy" | "dependencies" | "trend";

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  generatedAt: string;
  status: "completed" | "running" | "failed";
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
}

export interface NotificationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface InstanceSettings {
  instanceName: string;
  baseUrl: string;
  timeZone: string;
  defaultProjectView: "all" | "active" | "atRisk";
  reportRetentionDays: number;
}
