import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProject, getProjectTags, listProjects } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import { hasActiveFilters, parseProjectQuery } from "@/lib/query/projects";
import { toRecord, type RawSearchParams } from "@/lib/query/url";
import { messages } from "@/messages/en";

import { ProjectFilters } from "./ProjectFilters";
import { ProjectTable } from "./ProjectTable";

export async function ProjectInventory({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams;
  const query = parseProjectQuery(raw);
  const [result, tags, parent] = await Promise.all([
    listProjects(query),
    getProjectTags().catch(() => []),
    query.parent ? getProject(query.parent) : undefined,
  ]);

  return (
    <>
      <ProjectFilters query={query} tags={tags} parentName={parent?.name} />
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{messages.projects.tableTitle}</CardTitle>
          <span className="text-xs text-muted-foreground tabular-nums">{formatNumber(result.total)}</span>
        </CardHeader>
        <CardContent>
          <ProjectTable
            result={result}
            query={query}
            base={toRecord(raw)}
            portfolioIsEmpty={result.total === 0 && !hasActiveFilters(query)}
          />
        </CardContent>
      </Card>
    </>
  );
}
