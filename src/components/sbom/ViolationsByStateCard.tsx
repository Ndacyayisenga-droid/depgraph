import { CheckIcon } from "lucide-react";

import { DonutChart } from "@/components/charts/DonutChart";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPortfolioMetrics } from "@/lib/data";
import { formatNumber, formatPercent, interpolate } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.sbom;
const states = ["fail", "warn", "info"] as const;
const stateColors: Record<(typeof states)[number], string> = {
  fail: "var(--danger)",
  warn: "var(--warning)",
  info: "var(--primary)",
};

export async function ViolationsByStateCard() {
  const { policyViolations } = await getPortfolioMetrics();
  const total = states.reduce((n, s) => n + policyViolations[s], 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.violationsByState}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
        {total === 0 ? (
          <EmptyState icon={CheckIcon} title={m.noViolations} />
        ) : (
          <>
            <DonutChart
              title={m.violationsByState}
              centerValue={formatNumber(total)}
              centerLabel={m.violationsLabel}
              segments={states.map((s) => ({ key: s, value: policyViolations[s], color: stateColors[s] }))}
            />
            <ul className="flex w-full flex-col gap-3 text-[13px]">
              {states.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: stateColors[s] }} />
                  <span>{m.states[s]}</span>
                  <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                    {interpolate(m.shareOf, {
                      percent: formatPercent(policyViolations[s] / total),
                      count: formatNumber(policyViolations[s]),
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
