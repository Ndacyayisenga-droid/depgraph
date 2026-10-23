import Link from "next/link";
import { FileStackIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecentBomImports } from "@/lib/data";
import { formatNumber, formatSince } from "@/lib/format";
import { riskTone } from "@/lib/tones";
import { messages } from "@/messages/en";

const m = messages.recentImports;

/** Projects with the most recent SBOM uploads. */
export async function RecentImportsCard({ limit = 5 }: { limit?: number }) {
  const projects = await getRecentBomImports(limit);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <EmptyState icon={FileStackIcon} title={m.empty} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{m.colProject}</TableHead>
                <TableHead>{m.colFormat}</TableHead>
                <TableHead className="text-right">{m.colComponents}</TableHead>
                <TableHead>{m.colImported}</TableHead>
                <TableHead>{m.colRisk}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.uuid}>
                  <TableCell className="max-w-72">
                    <Link href={`/projects/${p.uuid}`} title={p.name} className="block truncate font-semibold hover:text-primary">
                      {p.name}
                    </Link>
                    {p.version && <span className="block truncate font-mono text-[11px] text-muted-foreground">{p.version}</span>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.lastBomImportFormat ?? "—"}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNumber(p.metrics?.components ?? 0)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatSince(p.lastBomImport, messages.common.never)}</TableCell>
                  <TableCell>
                    <StatusBadge tone={riskTone[p.risk]}>{messages.risk[p.risk]}</StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
