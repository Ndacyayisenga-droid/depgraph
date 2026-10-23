import Link from "next/link";
import { FolderSearchIcon } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

export default function ProjectNotFound() {
  return (
    <EmptyState
      icon={FolderSearchIcon}
      title={m.notFoundTitle}
      body={m.notFoundBody}
      action={
        <Button asChild variant="outline" className="text-primary">
          <Link href="/projects">{m.breadcrumbRoot}</Link>
        </Button>
      }
    />
  );
}
