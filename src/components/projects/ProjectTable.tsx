import Link from "next/link";
import { FolderSearchIcon, PackageOpenIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageSizeSelect } from "@/components/common/PageSizeSelect";
import { Pagination } from "@/components/common/Pagination";
import { SortableHead } from "@/components/common/SortableHead";
import { StatusBadge } from "@/components/common/StatusBadge";
import { TagChip } from "@/components/common/TagChip";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Page, ProjectSummary } from "@/lib/data/types";
import { formatDecimal, formatNumber, formatSince, interpolate } from "@/lib/format";
import {
  defaultProjectQuery,
  defaultSortDirection,
  hasActiveFilters,
  projectQueryParams,
  type ProjectQuery,
  type ProjectSortKey,
} from "@/lib/query/projects";
import { riskTone } from "@/lib/tones";
import { hrefWith } from "@/lib/query/url";
import { messages } from "@/messages/en";

const m = messages.projects;
const MAX_TAGS = 3;

interface ProjectTableProps {
  result: Page<ProjectSummary>;
  query: ProjectQuery;
  base: Record<string, string>;
  portfolioIsEmpty: boolean;
}

export function ProjectTable({ result, query, base, portfolioIsEmpty }: ProjectTableProps) {
  const href = (changes: Partial<ProjectQuery>) => hrefWith("/projects", base, projectQueryParams(changes));
  const sortHref = (key: ProjectSortKey) =>
    href({
      sort: key,
      dir: query.sort === key ? (query.dir === "asc" ? "desc" : "asc") : defaultSortDirection[key],
      page: 1,
    });
  const sortDir = (key: ProjectSortKey) => (query.sort === key ? query.dir : undefined);

  if (result.total === 0) {
    return portfolioIsEmpty ? (
      <EmptyState icon={PackageOpenIcon} title={m.emptyTitle} body={m.emptyBody} />
    ) : (
      <EmptyState
        icon={FolderSearchIcon}
        title={m.noResultsTitle}
        body={m.noResultsBody}
        action={
          hasActiveFilters(query) && (
            <Button asChild variant="outline" className="text-primary">
              <Link href="/projects">{messages.common.clearFilters}</Link>
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHead label={m.colProject} href={sortHref("name")} direction={sortDir("name")} />
            <SortableHead label={m.colVersion} href={sortHref("version")} direction={sortDir("version")} />
            <TableHead>{m.colClassifier}</TableHead>
            <TableHead className="text-right">{m.colComponents}</TableHead>
            <TableHead className="text-right">{m.colFindings}</TableHead>
            <SortableHead label={m.colRisk} href={sortHref("risk")} direction={sortDir("risk")} />
            <SortableHead
              label={m.colLastScanned}
              href={sortHref("lastBomImport")}
              direction={sortDir("lastBomImport")}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.items.map((project) => {
            const neverImported = project.lastBomImport === null;
            return (
              <TableRow key={project.uuid}>
                <TableCell className="max-w-[360px] min-w-[220px] whitespace-normal">
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <Link
                        href={`/projects/${project.uuid}`}
                        title={project.name}
                        className="truncate font-semibold hover:text-primary"
                      >
                        {project.name}
                      </Link>
                      {!project.active && <StatusBadge tone="neutral">{messages.projectStatus.inactive}</StatusBadge>}
                    </div>
                    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      {project.group && (
                        <span className="max-w-full truncate" title={project.group}>
                          {project.group}
                        </span>
                      )}
                      {project.hasChildren && (
                        <Link
                          href={href({ ...defaultProjectQuery, parent: project.uuid })}
                          className="font-semibold text-primary hover:underline"
                        >
                          {m.subProjects}
                        </Link>
                      )}
                    </div>
                    {project.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-1">
                        {project.tags.slice(0, MAX_TAGS).map((tag) => (
                          <li key={tag}>
                            <TagChip tag={tag} href={href({ tag, page: 1 })} />
                          </li>
                        ))}
                        {project.tags.length > MAX_TAGS && (
                          <li
                            className="inline-flex h-5 items-center px-1 text-[11px] text-muted-foreground"
                            title={project.tags.slice(MAX_TAGS).join(", ")}
                          >
                            +{project.tags.length - MAX_TAGS}
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="max-w-36 truncate font-mono text-xs" title={project.version}>
                      {project.version ?? "—"}
                    </span>
                    {project.isLatest && <StatusBadge tone="info">{m.latest}</StatusBadge>}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {project.classifier ? messages.classifier[project.classifier] : "—"}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {neverImported || !project.metrics ? "—" : formatNumber(project.metrics.components)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {neverImported || !project.metrics ? "—" : formatNumber(project.metrics.findings)}
                </TableCell>
                <TableCell>
                  {neverImported ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    <span title={interpolate(m.riskScore, { score: formatDecimal(project.riskScore) })}>
                      <StatusBadge tone={riskTone[project.risk]}>{messages.risk[project.risk]}</StatusBadge>
                    </span>
                  )}
                </TableCell>
                <TableCell className={neverImported ? "font-semibold text-warning" : "text-muted-foreground"}>
                  {formatSince(project.lastBomImport, messages.common.never)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination
        page={result.page}
        pageCount={result.pageCount}
        pageSize={result.pageSize}
        total={result.total}
        hrefFor={(page) => href({ page })}
      >
        <PageSizeSelect value={result.pageSize} />
      </Pagination>
    </div>
  );
}
