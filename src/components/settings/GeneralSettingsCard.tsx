import { ProtectedAction } from "@/components/common/ProtectedAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInstanceSettings } from "@/lib/data";
import { interpolate } from "@/lib/format";
import { messages } from "@/messages/en";

import { SettingsSelect } from "./SettingsSelect";

const m = messages.settings;
const timeZones = ["UTC", "Europe/Berlin", "Europe/London", "America/New_York", "Asia/Tokyo"];
const projectViews = ["all", "active", "atRisk"] as const;
const retentionDays = [30, 90, 180, 365];

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-xs font-semibold text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

export async function GeneralSettingsCard() {
  const settings = await getInstanceSettings();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.generalTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5">
          <Field id="instance-name" label={m.instanceName}>
            <Input id="instance-name" defaultValue={settings.instanceName} className="h-10" />
          </Field>
          <Field id="base-url" label={m.baseUrl}>
            <Input id="base-url" type="url" defaultValue={settings.baseUrl} className="h-10" />
          </Field>
          <Field id="time-zone" label={m.timeZone}>
            <SettingsSelect
              id="time-zone"
              defaultValue={settings.timeZone}
              options={timeZones.map((tz) => ({ value: tz, label: tz }))}
            />
          </Field>
          <Field id="default-view" label={m.defaultProjectView}>
            <SettingsSelect
              id="default-view"
              defaultValue={settings.defaultProjectView}
              options={projectViews.map((view) => ({ value: view, label: m.projectViews[view] }))}
            />
          </Field>
          <Field id="retention" label={m.reportRetention}>
            <SettingsSelect
              id="retention"
              defaultValue={String(settings.reportRetentionDays)}
              options={retentionDays.map((days) => ({
                value: String(days),
                label: interpolate(m.retentionDays, { count: days }),
              }))}
            />
          </Field>
          <ProtectedAction type="submit" size="lg" className="mt-1 h-10 w-fit px-4">
            {messages.common.save}
          </ProtectedAction>
        </form>
      </CardContent>
    </Card>
  );
}
