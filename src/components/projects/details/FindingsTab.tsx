import { FindingsTable } from "@/components/projects/FindingsTable";
import { getProjectFindings } from "@/lib/data";
import type { ProjectDetailQuery } from "@/lib/query/projectDetails";
import { messages } from "@/messages/en";

import { PagedSection } from "./PagedSection";

const m = messages.projectDetails;

interface FindingsTabProps {
  uuid: string;
  query: ProjectDetailQuery;
  base: Record<string, string>;
}

export async function FindingsTab({ uuid, query, base }: FindingsTabProps) {
  const result = await getProjectFindings(uuid, query);
  return (
    <PagedSection
      title={m.allFindings}
      searchLabel={m.searchFindings}
      query={query.q}
      page={result}
      pathname={`/projects/${uuid}`}
      base={base}
    >
      <FindingsTable findings={result.items} emptyTitle={query.q ? messages.common.noResults : m.noFindings} />
    </PagedSection>
  );
}
