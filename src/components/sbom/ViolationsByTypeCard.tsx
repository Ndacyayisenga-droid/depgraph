import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPortfolioMetrics } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.sbom;
const types = ["license", "security", "operational"] as const;

export async function ViolationsByTypeCard() {
  const { policyViolations } = await getPortfolioMetrics();
  const max = Math.max(...types.map((t) => policyViolations[t]), 1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.violationsByType}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-5 pt-2">
          {types.map((t) => (
            <li key={t} className="grid grid-cols-[110px_1fr_48px] items-center gap-4 text-[13px]">
              <span className="font-semibold">{m.types[t]}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-neutral-soft">
                <span
                  className="block h-full rounded-full bg-primary-300"
                  style={{ width: `${(policyViolations[t] / max) * 100}%` }}
                />
              </span>
              <span className="text-right text-xs text-muted-foreground tabular-nums">{formatNumber(policyViolations[t])}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
