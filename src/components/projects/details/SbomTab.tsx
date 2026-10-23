import { DownloadIcon, FileX2Icon } from "lucide-react";

import { DetailList } from "@/components/common/DetailList";
import { EmptyState } from "@/components/common/EmptyState";
import { ProtectedAction } from "@/components/common/ProtectedAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectDetail } from "@/lib/data/types";
import { formatNumber, formatSince } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

export function SbomTab({ project }: { project: ProjectDetail }) {
  const imported = project.lastBomImport !== null;
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{m.sbomTitle}</CardTitle>
        {imported && (
          <ProtectedAction variant="outline" className="text-primary">
            <DownloadIcon data-icon="inline-start" />
            {messages.common.downloadSbom}
          </ProtectedAction>
        )}
      </CardHeader>
      <CardContent>
        {imported ? (
          <DetailList
            items={[
              { label: m.fields.format, value: project.lastBomImportFormat ?? "—" },
              { label: m.fields.version, value: project.version ?? "—" },
              { label: m.fields.components, value: formatNumber(project.metrics?.components ?? 0) },
              { label: m.fields.generated, value: formatSince(project.lastBomImport, messages.common.never) },
            ]}
          />
        ) : (
          <EmptyState icon={FileX2Icon} title={m.noSbom} />
        )}
      </CardContent>
    </Card>
  );
}
