import { PackageSearchIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProjectComponents, type Component } from "@/lib/data";
import type { ProjectDetailQuery } from "@/lib/query/projectDetails";
import { messages } from "@/messages/en";

import { PagedSection } from "./PagedSection";

const m = messages.projectDetails;

interface DependenciesTabProps {
  uuid: string;
  query: ProjectDetailQuery;
  base: Record<string, string>;
}

function UpdateStatus({ component }: { component: Component }) {
  if (!component.latestVersion) return <StatusBadge tone="neutral">{m.unknownLatest}</StatusBadge>;
  return component.version === component.latestVersion ? (
    <StatusBadge tone="success">{m.upToDate}</StatusBadge>
  ) : (
    <StatusBadge tone="info">{m.outdated}</StatusBadge>
  );
}

export async function DependenciesTab({ uuid, query, base }: DependenciesTabProps) {
  const result = await getProjectComponents(uuid, query);
  return (
    <PagedSection
      title={m.dependenciesTitle}
      searchLabel={m.searchComponents}
      query={query.q}
      page={result}
      pathname={`/projects/${uuid}`}
      base={base}
    >
      {result.total === 0 ? (
        <EmptyState icon={PackageSearchIcon} title={m.noComponents} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m.colComponent}</TableHead>
              <TableHead>{m.colVersion}</TableHead>
              <TableHead>{m.colLatest}</TableHead>
              <TableHead>{m.colLicense}</TableHead>
              <TableHead>{m.colStatus}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.items.map((c) => (
              <TableRow key={c.uuid}>
                <TableCell className="max-w-xs">
                  <span className="block truncate font-semibold" title={c.name}>
                    {c.name}
                  </span>
                  {c.group && (
                    <span className="block truncate text-xs text-muted-foreground" title={c.group}>
                      {c.group}
                    </span>
                  )}
                </TableCell>
                <TableCell className="max-w-40 truncate font-mono text-xs">{c.version ?? "—"}</TableCell>
                <TableCell className="max-w-40 truncate font-mono text-xs">{c.latestVersion ?? "—"}</TableCell>
                <TableCell className="max-w-48 truncate" title={c.license}>
                  {c.license ?? "—"}
                </TableCell>
                <TableCell>
                  <UpdateStatus component={c} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PagedSection>
  );
}
