import { CheckIcon, FolderKanbanIcon, ShieldAlertIcon, TriangleAlertIcon } from "lucide-react";

import { MetricCard } from "@/components/common/MetricCard";
import { getPortfolioMetrics } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.projects;

export async function ProjectMetrics() {
  const metrics = await getPortfolioMetrics();
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label={m.totalProjects} value={formatNumber(metrics.projects)} icon={FolderKanbanIcon} tone="info" />
      <MetricCard
        label={m.withVulnerabilities}
        value={formatNumber(metrics.vulnerableProjects)}
        icon={ShieldAlertIcon}
        tone="danger"
      />
      <MetricCard
        label={m.policyViolations}
        value={formatNumber(metrics.policyViolations.total)}
        icon={TriangleAlertIcon}
        tone="warning"
      />
      <MetricCard label={m.healthy} value={formatNumber(metrics.healthyProjects)} icon={CheckIcon} tone="success" />
    </section>
  );
}
