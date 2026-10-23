import { ShieldCheckIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ProjectFinding } from "@/lib/data/types";
import { formatDecimal, formatSince } from "@/lib/format";
import { analysisTone, severityTone } from "@/lib/tones";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

export function FindingsTable({ findings, emptyTitle = m.noFindings }: { findings: ProjectFinding[]; emptyTitle?: string }) {
  if (findings.length === 0) {
    return <EmptyState icon={ShieldCheckIcon} title={emptyTitle} />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{m.colId}</TableHead>
          <TableHead>{m.colSeverity}</TableHead>
          <TableHead>{m.colComponent}</TableHead>
          <TableHead>{m.colVersion}</TableHead>
          <TableHead className="text-right">{m.colCvss}</TableHead>
          <TableHead>{m.colFirstSeen}</TableHead>
          <TableHead>{m.colAnalysis}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {findings.map((f) => (
          <TableRow key={f.key}>
            <TableCell className="max-w-56">
              <span className="block truncate font-mono text-xs font-semibold" title={f.title ?? f.vulnId}>
                {f.vulnId}
              </span>
              <span className="text-[11px] text-muted-foreground">{f.source}</span>
            </TableCell>
            <TableCell>
              <StatusBadge tone={severityTone[f.severity]}>{messages.severity[f.severity]}</StatusBadge>
            </TableCell>
            <TableCell className="max-w-64">
              <span className="block truncate" title={f.component.name}>
                {f.component.name}
              </span>
              {f.component.group && (
                <span className="block truncate text-xs text-muted-foreground" title={f.component.group}>
                  {f.component.group}
                </span>
              )}
            </TableCell>
            <TableCell className="max-w-32 truncate font-mono text-xs">{f.component.version ?? "—"}</TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {f.cvss === undefined ? "—" : formatDecimal(f.cvss)}
            </TableCell>
            <TableCell className="text-muted-foreground">{formatSince(f.attributedOn, "—")}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <StatusBadge tone={analysisTone[f.analysisState]}>{messages.analysisState[f.analysisState]}</StatusBadge>
                {f.suppressed && <StatusBadge tone="neutral">{m.suppressed}</StatusBadge>}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
