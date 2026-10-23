import { ScanSearchIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PostureRing } from "@/components/charts/PostureRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { severities, type ProjectDetail } from "@/lib/data/types";
import { formatNumber } from "@/lib/format";
import { postureFor, postureTone, severityTone, toneSolid } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

export function SecuritySummaryCard({ project }: { project: ProjectDetail }) {
  const { metrics } = project;
  const posture = postureFor[project.risk];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.securitySummary}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center gap-6 sm:flex-row">
        {project.lastBomImport === null || !metrics ? (
          <EmptyState icon={ScanSearchIcon} title={m.neverScannedTitle} body={m.neverScannedBody} />
        ) : (
          <>
            <PostureRing label={messages.posture[posture]} tone={postureTone[posture]} />
            <ul className="flex w-full flex-col gap-3 text-[13px]">
              {severities.map((severity) => (
                <li key={severity} className="flex items-center gap-3">
                  <span className={cn("size-2.5 rounded-full", toneSolid[severityTone[severity]])} />
                  <span className="text-muted-foreground">{messages.severity[severity]}</span>
                  <span className="ml-auto font-bold text-heading tabular-nums">
                    {formatNumber(metrics.severity[severity])}
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
