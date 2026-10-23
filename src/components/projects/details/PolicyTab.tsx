import { ShieldCheckIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPolicyViolations } from "@/lib/data";
import { formatNumber, interpolate } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.projectDetails;
const stateTone = { fail: "danger", warn: "warning", info: "info" } as const;

export async function PolicyTab({ uuid }: { uuid: string }) {
  const result = await getPolicyViolations(uuid);
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          {m.policyTitle}
          <span className="ml-2 text-xs font-normal text-muted-foreground tabular-nums">{formatNumber(result.total)}</span>
        </CardTitle>
        {result.total > result.items.length && (
          <span className="text-xs text-muted-foreground">
            {interpolate(messages.common.showingOf, { shown: result.items.length, total: result.total })}
          </span>
        )}
      </CardHeader>
      <CardContent>
        {result.items.length === 0 ? (
          <EmptyState icon={ShieldCheckIcon} title={m.noViolations} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{m.colPolicy}</TableHead>
                <TableHead>{m.colComponent}</TableHead>
                <TableHead>{m.colType}</TableHead>
                <TableHead>{m.colState}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.items.map((v) => (
                <TableRow key={v.uuid}>
                  <TableCell className="max-w-64 truncate font-semibold" title={v.policy}>
                    {v.policy}
                  </TableCell>
                  <TableCell className="max-w-64 truncate" title={v.component}>
                    {v.component || "—"}
                  </TableCell>
                  <TableCell>{m.policyKind[v.type]}</TableCell>
                  <TableCell>
                    <StatusBadge tone={stateTone[v.state]}>{m.policyState[v.state]}</StatusBadge>
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
