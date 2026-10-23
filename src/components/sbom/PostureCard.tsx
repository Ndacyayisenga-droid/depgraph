import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPortfolioMetrics, riskFor } from "@/lib/data";
import { formatNumber, interpolate } from "@/lib/format";
import { postureFor, postureTone, toneSoft } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

const m = messages.sbom;

export async function PostureCard() {
  const metrics = await getPortfolioMetrics();
  const posture = postureFor[riskFor(metrics.severity)];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.securityPosture}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <span className={cn("flex size-16 items-center justify-center rounded-full", toneSoft[postureTone[posture]])}>
          <CheckIcon className="size-8" strokeWidth={3} aria-hidden />
        </span>
        <p className="font-heading text-xl font-bold text-navy">{messages.posture[posture]}</p>
        <p className="text-xs text-muted-foreground">
          {interpolate(m.vulnerableShare, {
            vulnerable: formatNumber(metrics.vulnerableProjects),
            total: formatNumber(metrics.projects),
          })}
        </p>
        <Button asChild variant="outline" className="mt-2 h-9 px-4 text-primary">
          <Link href="/vulnerabilities">{messages.common.viewDetails}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
