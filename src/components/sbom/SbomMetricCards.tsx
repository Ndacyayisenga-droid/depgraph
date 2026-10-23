import { BoxesIcon, FolderKanbanIcon, PackageXIcon, ShieldAlertIcon } from "lucide-react";

import { MetricCard } from "@/components/common/MetricCard";
import { getPortfolioMetrics } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.sbom;

export async function SbomMetricCards() {
  const metrics = await getPortfolioMetrics();
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label={m.projects} value={formatNumber(metrics.projects)} icon={FolderKanbanIcon} tone="info" />
      <MetricCard label={m.components} value={formatNumber(metrics.components)} icon={BoxesIcon} tone="info" />
      <MetricCard
        label={m.vulnerableComponents}
        value={formatNumber(metrics.vulnerableComponents)}
        icon={PackageXIcon}
        tone="warning"
      />
      <MetricCard
        label={m.policyViolations}
        value={formatNumber(metrics.policyViolations.total)}
        icon={ShieldAlertIcon}
        tone="danger"
      />
    </section>
  );
}
