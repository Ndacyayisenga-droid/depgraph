import { ProtectedAction } from "@/components/common/ProtectedAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProjectDetail } from "@/lib/data/types";
import { messages } from "@/messages/en";

const m = messages.projectDetails;

export function ProjectSettingsTab({ project }: { project: ProjectDetail }) {
  const fields = [
    { id: "project-name", label: m.fields.name, value: project.name },
    { id: "project-group", label: m.fields.group, value: project.group ?? "" },
    { id: "project-version", label: m.fields.version, value: project.version ?? "" },
    { id: "project-classifier", label: m.fields.classifier, value: project.classifier ? messages.classifier[project.classifier] : "" },
    { id: "project-description", label: m.fields.description, value: project.description ?? "" },
    { id: "project-purl", label: m.fields.purl, value: project.purl ?? "" },
    { id: "project-tags", label: m.fields.tags, value: project.tags.join(", ") },
  ];
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{m.settingsTitle}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <Label htmlFor={field.id} className="text-xs font-semibold text-muted-foreground">
              {field.label}
            </Label>
            <Input id={field.id} defaultValue={field.value} readOnly className="h-10 bg-card" />
          </div>
        ))}
        <ProtectedAction size="lg" className="mt-2 h-10 w-fit px-4">
          {messages.common.save}
        </ProtectedAction>
      </CardContent>
    </Card>
  );
}
