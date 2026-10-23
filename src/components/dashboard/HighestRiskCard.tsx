import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMostVulnerableProjects } from "@/lib/data";
import { formatDecimal, formatNumber } from "@/lib/format";
import { riskTone, toneText } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

const m = messages.dashboard;

export async function HighestRiskCard() {
  const projects = await getMostVulnerableProjects();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.mostVulnerable}</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <p className="py-16 text-center text-[13px] text-muted-foreground">{m.mostVulnerableEmpty}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{m.colProject}</TableHead>
                <TableHead className="text-right">{m.colFindings}</TableHead>
                <TableHead className="text-right">{m.colRiskScore}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.uuid}>
                  <TableCell className="max-w-48">
                    <Link href={`/projects/${project.uuid}`} title={project.name} className="block truncate font-semibold hover:text-primary">
                      {project.name}
                    </Link>
                    {project.version && (
                      <span className="block truncate font-mono text-[11px] text-muted-foreground">{project.version}</span>
                    )}
                  </TableCell>
                  <TableCell className={cn("text-right font-semibold tabular-nums", toneText[riskTone[project.risk]])}>
                    {formatNumber(project.metrics?.findings ?? 0)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground tabular-nums">{formatDecimal(project.riskScore)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
