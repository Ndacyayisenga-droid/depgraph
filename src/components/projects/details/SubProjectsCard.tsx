import Link from "next/link";

import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Page, ProjectSummary } from "@/lib/data/types";
import { formatNumber, interpolate } from "@/lib/format";
import { riskTone } from "@/lib/tones";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

export function SubProjectsCard({ parentUuid, subProjects }: { parentUuid: string; subProjects: Page<ProjectSummary> }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          {m.subProjectsTitle}
          <span className="ml-2 text-xs font-normal text-muted-foreground tabular-nums">{formatNumber(subProjects.total)}</span>
        </CardTitle>
        {subProjects.total > subProjects.items.length && (
          <Link href={`/projects?parent=${parentUuid}`} className="text-xs font-semibold text-primary hover:underline">
            {interpolate(m.viewAllSubProjects, { count: formatNumber(subProjects.total) })}
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{messages.projects.colProject}</TableHead>
              <TableHead>{messages.projects.colVersion}</TableHead>
              <TableHead className="text-right">{messages.projects.colFindings}</TableHead>
              <TableHead>{messages.projects.colRisk}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subProjects.items.map((child) => (
              <TableRow key={child.uuid}>
                <TableCell className="max-w-xs">
                  <Link href={`/projects/${child.uuid}`} title={child.name} className="block truncate font-semibold hover:text-primary">
                    {child.name}
                  </Link>
                </TableCell>
                <TableCell className="font-mono text-xs">{child.version ?? "—"}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {child.metrics ? formatNumber(child.metrics.findings) : "—"}
                </TableCell>
                <TableCell>
                  {child.lastBomImport === null ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    <StatusBadge tone={riskTone[child.risk]}>{messages.risk[child.risk]}</StatusBadge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
