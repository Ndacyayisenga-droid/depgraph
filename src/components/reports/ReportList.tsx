"use client";

import { DownloadIcon, EllipsisIcon, PlusIcon } from "lucide-react";
import { useDeferredValue, useState } from "react";

import { ProtectedAction } from "@/components/common/ProtectedAction";
import { SearchField } from "@/components/common/SearchField";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Report } from "@/lib/data/types";
import { formatDateTime } from "@/lib/format";
import { messages } from "@/messages/en";

const m = messages.reports;

const statusTone = { completed: "success", running: "info", failed: "danger" } as const;

export function ReportList({ reports }: { reports: Report[] }) {
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());
  const visible = q
    ? reports.filter((r) => `${r.name} ${m.types[r.type]}`.toLowerCase().includes(q))
    : reports;

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchField
          label={m.searchPlaceholder}
          placeholder={m.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:max-w-xl"
        />
        <ProtectedAction size="lg" className="h-10 px-4">
          <PlusIcon data-icon="inline-start" />
          {m.generate}
        </ProtectedAction>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{m.tableTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{m.colReport}</TableHead>
                <TableHead>{m.colType}</TableHead>
                <TableHead>{m.colGenerated}</TableHead>
                <TableHead>{m.colStatus}</TableHead>
                <TableHead className="text-right">{m.colActions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-semibold">{report.name}</TableCell>
                  <TableCell>{m.types[report.type]}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(report.generatedAt)}</TableCell>
                  <TableCell>
                    <StatusBadge tone={statusTone[report.status]}>{m.status[report.status]}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <ProtectedAction variant="ghost" size="icon-sm" aria-label={m.download}>
                        <DownloadIcon />
                      </ProtectedAction>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" aria-label={m.moreActions}>
                            <EllipsisIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                            {messages.common.protectedAction}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem disabled>{m.regenerate}</DropdownMenuItem>
                          <DropdownMenuItem disabled>{m.share}</DropdownMenuItem>
                          <DropdownMenuItem disabled variant="destructive">
                            {m.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {visible.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    {messages.common.noResults}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
