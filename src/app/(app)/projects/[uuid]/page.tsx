import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CardSkeleton } from "@/components/common/CardSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { TabNav } from "@/components/common/TabNav";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { DependenciesTab } from "@/components/projects/details/DependenciesTab";
import { FindingsTab } from "@/components/projects/details/FindingsTab";
import { OverviewTab } from "@/components/projects/details/OverviewTab";
import { PolicyTab } from "@/components/projects/details/PolicyTab";
import { ProjectSettingsTab } from "@/components/projects/details/ProjectSettingsTab";
import { SbomTab } from "@/components/projects/details/SbomTab";
import { getProject } from "@/lib/data";
import { parseProjectDetailQuery, projectTabs } from "@/lib/query/projectDetails";
import { isUuid } from "@/lib/query/projects";
import { toRecord } from "@/lib/query/url";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

type Props = PageProps<"/projects/[uuid]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  const project = isUuid(uuid) ? await getProject(uuid).catch(() => undefined) : undefined;
  return { title: project ? [project.name, project.version].filter(Boolean).join(" ") : m.detailsTitle };
}

export default function ProjectDetailsPage({ params, searchParams }: Props) {
  return (
    <>
      <PageHeader title={m.detailsTitle} subtitle={m.subtitle} />
      <Suspense fallback={<CardSkeleton className="h-[480px]" />}>
        <ProjectDetails params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ProjectDetails({ params, searchParams }: Props) {
  const [{ uuid }, raw] = await Promise.all([params, searchParams]);
  if (!isUuid(uuid)) notFound();
  const project = await getProject(uuid);
  if (!project) notFound();

  const query = parseProjectDetailQuery(raw);
  const base = toRecord(raw);

  return (
    <>
      <ProjectHeader project={project} />
      <TabNav
        label={m.detailsTitle}
        items={projectTabs.map((tab) => ({
          href: tab === "overview" ? `/projects/${uuid}` : `/projects/${uuid}?tab=${tab}`,
          label: m.tabs[tab],
          active: tab === query.tab,
        }))}
      />
      {query.tab === "overview" && <OverviewTab project={project} />}
      {query.tab === "vulnerabilities" && <FindingsTab uuid={uuid} query={query} base={base} />}
      {query.tab === "dependencies" && <DependenciesTab uuid={uuid} query={query} base={base} />}
      {query.tab === "sbom" && <SbomTab project={project} />}
      {query.tab === "policy" && <PolicyTab uuid={uuid} />}
      {query.tab === "settings" && <ProjectSettingsTab project={project} />}
    </>
  );
}
