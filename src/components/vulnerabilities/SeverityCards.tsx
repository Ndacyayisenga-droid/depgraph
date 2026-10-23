import { ShieldAlertIcon, TriangleAlertIcon } from "lucide-react";

import { MetricCard } from "@/components/common/MetricCard";
import { getPortfolioMetrics } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { messages } from "@/messages/en";

export async function SeverityCards() {
  const { findings, severity } = await getPortfolioMetrics();
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label={messages.vulnerabilities.totalFindings} value={formatNumber(findings)} icon={ShieldAlertIcon} tone="info" />
      <MetricCard label={messages.severity.critical} value={formatNumber(severity.critical)} icon={TriangleAlertIcon} tone="danger" />
      <MetricCard label={messages.severity.high} value={formatNumber(severity.high)} icon={TriangleAlertIcon} tone="warning" />
      <MetricCard label={messages.severity.medium} value={formatNumber(severity.medium)} icon={TriangleAlertIcon} tone="warning" />
    </section>
  );
}
