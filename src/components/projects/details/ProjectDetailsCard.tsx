import Link from "next/link";

import { DetailList } from "@/components/common/DetailList";
import { TagChip } from "@/components/common/TagChip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectDetail } from "@/lib/data/types";
import { formatDecimal, formatSince } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

export function ProjectDetailsCard({ project }: { project: ProjectDetail }) {
  const { parent } = project;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.detailsTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <DetailList
          items={[
            { label: m.fields.name, value: <span className="[overflow-wrap:anywhere]">{project.name}</span> },
            project.group && {
              label: m.fields.group,
              value: <span className="[overflow-wrap:anywhere]">{project.group}</span>,
            },
            { label: m.fields.version, value: project.version ?? "—" },
            project.classifier && { label: m.fields.classifier, value: messages.classifier[project.classifier] },
            parent && {
              label: m.fields.parent,
              value: (
                <Link href={`/projects/${parent.uuid}`} className="text-primary hover:underline">
                  {[parent.name, parent.version].filter(Boolean).join(" ")}
                </Link>
              ),
            },
            { label: m.fields.lastScanned, value: formatSince(project.lastBomImport, messages.common.never) },
            { label: m.fields.riskScore, value: formatDecimal(project.riskScore) },
            project.tags.length > 0 && {
              label: m.fields.tags,
              value: (
                <span className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} href={`/projects?tag=${encodeURIComponent(tag)}`} />
                  ))}
                </span>
              ),
            },
          ]}
        />
        {project.description && <p className="text-[13px] text-muted-foreground">{project.description}</p>}
      </CardContent>
    </Card>
  );
}
