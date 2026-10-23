import Link from "next/link";

import { FindingsTable } from "@/components/projects/FindingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectChildren, getTopProjectFindings, type ProjectDetail } from "@/lib/data";
import { messages } from "@/messages/en";

import { ProjectDetailsCard } from "./ProjectDetailsCard";
import { SecuritySummaryCard } from "./SecuritySummaryCard";
import { SubProjectsCard } from "./SubProjectsCard";

const m = messages.projectDetails;
const TOP_FINDINGS = 4;
const MAX_CHILDREN = 8;

export async function OverviewTab({ project }: { project: ProjectDetail }) {
  const [findings, subProjects] = await Promise.all([
    project.lastBomImport !== null ? getTopProjectFindings(project.uuid, TOP_FINDINGS) : undefined,
    project.hasChildren ? getProjectChildren(project.uuid, MAX_CHILDREN) : undefined,
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <ProjectDetailsCard project={project} />
        <SecuritySummaryCard project={project} />
      </div>

      {subProjects && subProjects.total > 0 && <SubProjectsCard parentUuid={project.uuid} subProjects={subProjects} />}

      {findings && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{m.topVulnerabilities}</CardTitle>
            {findings.total > findings.items.length && (
              <Link
                href={`/projects/${project.uuid}?tab=vulnerabilities`}
                scroll={false}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {m.viewAllFindings}
              </Link>
            )}
          </CardHeader>
          <CardContent>
            <FindingsTable findings={findings.items} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
