/** Subset of the Dependency-Track v1 REST API response shapes used by this UI. */

export type DtTimestamp = number | string | null | undefined;

interface DtSeverityMetrics {
  critical?: number;
  high?: number;
  medium?: number;
  low?: number;
  unassigned?: number;
  vulnerabilities?: number;
  components?: number;
  policyViolationsTotal?: number;
  policyViolationsFail?: number;
  policyViolationsWarn?: number;
  policyViolationsInfo?: number;
  policyViolationsLicenseTotal?: number;
  policyViolationsSecurityTotal?: number;
  policyViolationsOperationalTotal?: number;
  inheritedRiskScore?: number;
}

export interface DtPortfolioMetrics extends DtSeverityMetrics {
  projects?: number;
  vulnerableProjects?: number;
  vulnerableComponents?: number;
  suppressed?: number;
  firstOccurrence?: DtTimestamp;
  lastOccurrence?: DtTimestamp;
}

export interface DtProjectMetrics extends DtSeverityMetrics {
  vulnerableComponents?: number;
  suppressed?: number;
}

export interface DtConciseProject {
  uuid: string;
  name: string;
  group?: string | null;
  version?: string | null;
  classifier?: string | null;
  active?: boolean;
  isLatest?: boolean;
  hasChildren?: boolean;
  tags?: (string | { name: string })[] | null;
  lastBomImport?: DtTimestamp;
  lastBomImportFormat?: string | null;
  lastRiskScore?: number | null;
  metrics?: DtProjectMetrics | null;
}

export interface DtProject {
  uuid: string;
  name: string;
  group?: string | null;
  version?: string | null;
  classifier?: string | null;
  description?: string | null;
  purl?: string | null;
  active?: boolean;
  isLatest?: boolean;
  tags?: { name: string }[] | null;
  lastBomImport?: DtTimestamp;
  lastBomImportFormat?: string | null;
  lastInheritedRiskScore?: number | null;
  parent?: { uuid: string; name: string; version?: string | null } | null;
  children?: unknown[] | null;
  versions?: { uuid: string; version?: string | null; active?: boolean; isLatest?: boolean }[] | null;
  metrics?: DtProjectMetrics | null;
}

export interface DtTag {
  name: string;
  projectCount?: number;
}

export interface DtFinding {
  component: { uuid: string; name: string; group?: string; version?: string };
  vulnerability: {
    uuid: string;
    vulnId: string;
    source: string;
    title?: string;
    severity?: string;
    severityRank?: number;
    cvssV3BaseScore?: number;
    cvssV4Score?: number;
    cvssV2BaseScore?: number;
  };
  analysis?: { state?: string; isSuppressed?: boolean };
  attribution?: { attributedOn?: DtTimestamp };
}

export interface DtGroupedFinding {
  vulnerability: {
    source: string;
    vulnId: string;
    title?: string;
    severity?: string;
    cvssV3BaseScore?: number;
    cvssV4Score?: number;
    cvssV2BaseScore?: number;
    published?: DtTimestamp;
    affectedProjectCount?: number;
  };
}

export interface DtComponent {
  uuid: string;
  name: string;
  group?: string | null;
  version?: string | null;
  license?: string | null;
  licenseExpression?: string | null;
  resolvedLicense?: { licenseId?: string; name?: string } | null;
  repositoryMeta?: { latestVersion?: string | null } | null;
}

export interface DtPolicyViolation {
  uuid: string;
  type?: string;
  component?: { name?: string; version?: string };
  policyCondition?: { policy?: { name?: string; violationState?: string } };
}

export interface DtAffectedProject {
  uuid: string;
  name: string;
  version?: string | null;
  active?: boolean;
}

export interface DtVersion {
  application: string;
  version: string;
}
