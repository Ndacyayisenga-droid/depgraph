import type { Metadata } from "next";
import { Suspense } from "react";
import { PlusIcon } from "lucide-react";

import { CardSkeleton } from "@/components/common/CardSkeleton";
import { MetricCardsSkeleton } from "@/components/common/MetricCardsSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { ProtectedAction } from "@/components/common/ProtectedAction";
import { ProjectInventory } from "@/components/projects/ProjectInventory";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { messages } from "@/messages/en";

const m = messages.projects;

export const metadata: Metadata = { title: m.title };

export default function ProjectsPage({ searchParams }: PageProps<"/projects">) {
  return (
    <>
      <PageHeader
        title={m.title}
        subtitle={m.subtitle}
        actions={
          <ProtectedAction size="lg" className="h-10 px-4">
            <PlusIcon data-icon="inline-start" />
            {m.addProject}
          </ProtectedAction>
        }
      />
      <Suspense fallback={<MetricCardsSkeleton />}>
        <ProjectMetrics />
      </Suspense>
      <Suspense fallback={<CardSkeleton className="h-[540px]" />}>
        <ProjectInventory searchParams={searchParams} />
      </Suspense>
    </>
  );
}
