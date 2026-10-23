import Link from "next/link";
import { ChevronLeftIcon, RefreshCwIcon } from "lucide-react";

import { ProtectedAction } from "@/components/common/ProtectedAction";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { ProjectDetail } from "@/lib/data/types";
import { messages } from "@/messages/en";

import { VersionSwitcher } from "./VersionSwitcher";

const m = messages.projectDetails;

export function ProjectHeader({ project }: { project: ProjectDetail }) {
  return (
    <div className="flex flex-col gap-4">
      <nav className="flex min-w-0 flex-wrap items-center gap-x-2 text-[13px] font-semibold" aria-label={m.breadcrumbRoot}>
        <Link href="/projects" className="inline-flex items-center gap-1 text-primary hover:underline">
          <ChevronLeftIcon className="size-4" aria-hidden />
          {m.breadcrumbRoot}
        </Link>
        {project.parent && (
          <>
            <span className="text-muted-foreground">/</span>
            <Link href={`/projects/${project.parent.uuid}`} className="max-w-48 truncate text-primary hover:underline">
              {project.parent.name}
            </Link>
          </>
        )}
        <span className="text-muted-foreground">/</span>
        <span className="max-w-full truncate text-heading" title={project.name}>
          {project.name}
        </span>
      </nav>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="min-w-0 text-2xl font-bold text-navy [overflow-wrap:anywhere]">{project.name}</h2>
        {project.versions.length > 1 ? (
          <VersionSwitcher current={project.uuid} versions={project.versions} />
        ) : (
          project.version && <span className="rounded-md border bg-card px-2 py-1 font-mono text-xs">{project.version}</span>
        )}
        <StatusBadge tone={project.active ? "success" : "neutral"} size="md">
          {messages.projectStatus[project.active ? "active" : "inactive"]}
        </StatusBadge>
        <ProtectedAction size="lg" className="ml-auto h-10 px-4">
          <RefreshCwIcon data-icon="inline-start" />
          {m.scanNow}
        </ProtectedAction>
      </div>
    </div>
  );
}
