import { TrendChart } from "@/components/charts/TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPortfolioTrend } from "@/lib/data";
import { messages } from "@/messages/en";

const m = messages.dashboard;

export async function TrendCard() {
  const trend = await getPortfolioTrend();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.trendTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {trend.length < 2 ? (
          <p className="py-16 text-center text-[13px] text-muted-foreground">{m.trendEmpty}</p>
        ) : (
          <TrendChart
            title={m.trendTitle}
            points={trend}
            series={[
              { key: "findings", label: m.trendSeries.findings, color: "var(--chart-1)" },
              { key: "criticalHigh", label: m.trendSeries.criticalHigh, color: "var(--chart-2)" },
              { key: "policyViolations", label: m.trendSeries.policyViolations, color: "var(--chart-3)" },
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
}
