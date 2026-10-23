"use client";

import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProjectVersion } from "@/lib/data/types";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

interface VersionSwitcherProps {
  current: string;
  versions: ProjectVersion[];
}

export function VersionSwitcher({ current, versions }: VersionSwitcherProps) {
  const router = useRouter();
  return (
    <Select value={current} onValueChange={(uuid) => router.push(`/projects/${uuid}`)}>
      <SelectTrigger aria-label={m.versionLabel} className="h-8 max-w-56 bg-card font-mono text-xs">
        <SelectValue>{versions.find((v) => v.uuid === current)?.version || "—"}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {versions.map((v) => (
          <SelectItem key={v.uuid} value={v.uuid} className="font-mono text-xs">
            {v.version || "—"}
            {v.isLatest && <span className="font-sans text-[11px] text-success">{m.latest}</span>}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
