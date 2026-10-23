import { CheckIcon, FolderKanbanIcon, ShieldAlertIcon, TriangleAlertIcon } from "lucide-react";

import { MetricCard } from "@/components/common/MetricCard";
import { getPortfolioMetrics } from "@/lib/data";
import { formatNumber, formatSignedNumber, formatSignedPercent, interpolate } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.dashboard;

function percentHint(ratio: number | null): string | undefined {
  return ratio === null ? undefined : interpolate(m.vsLastMonth, { percent: formatSignedPercent(ratio) });
}

export async function PortfolioCards() {
  const metrics = await getPortfolioMetrics();
  const { deltas } = metrics;
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label={m.totalProjects}
        value={formatNumber(metrics.projects)}
        icon={FolderKanbanIcon}
        tone="info"
        hint={deltas.projects === null ? undefined : interpolate(m.projectsDelta, { delta: formatSignedNumber(deltas.projects) })}
        hintTone={deltas.projects !== null && deltas.projects > 0 ? "success" : undefined}
      />
      <MetricCard
        label={m.vulnerabilities}
        value={formatNumber(metrics.findings)}
        icon={ShieldAlertIcon}
        tone="danger"
        hint={percentHint(deltas.findingsPercent)}
        hintTone={deltas.findingsPercent !== null && deltas.findingsPercent > 0 ? "danger" : undefined}
      />
      <MetricCard
        label={m.criticalHigh}
        value={formatNumber(metrics.severity.critical + metrics.severity.high)}
        icon={TriangleAlertIcon}
        tone="warning"
        hint={interpolate(m.vulnerableProjects, { count: formatNumber(metrics.vulnerableProjects) })}
      />
      <MetricCard
        label={m.healthy}
        value={formatNumber(metrics.healthyProjects)}
        icon={CheckIcon}
        tone="success"
        hint={percentHint(deltas.healthyPercent)}
      />
    </section>
  );
}
