import type { LucideIcon } from "lucide-react";
import { GlobeIcon, LockKeyholeIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tone } from "@/lib/data/types";
import { toneSoft } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

const m = messages.settings;

const items: { icon: LucideIcon; tone: Tone; title: string; body: string }[] = [
  { icon: GlobeIcon, tone: "info", title: m.publicFrontend, body: m.publicFrontendBody },
  { icon: LockKeyholeIcon, tone: "success", title: m.protectedBackend, body: m.protectedBackendBody },
];

export function AccessModelCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.accessModel}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {items.map(({ icon: Icon, tone, title, body }) => (
          <div key={title} className="flex gap-3">
            <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", toneSoft[tone])}>
              <Icon className="size-4" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-navy">{title}</p>
              <p className="text-xs text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
