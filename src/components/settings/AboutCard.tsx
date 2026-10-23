import { Suspense } from "react";
import { ExternalLinkIcon } from "lucide-react";

import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInstanceVersion } from "@/lib/data";
import { getApiBaseUrl } from "@/lib/dt/client";
import { interpolate } from "@/lib/format";
import { externalLinks } from "@/lib/links";
import { messages } from "@/messages/en";

const m = messages.settings;

async function InstanceVersion() {
  const version = await getInstanceVersion().catch(() => null);
  return (
    <StatusBadge tone={version ? "success" : "neutral"} size="md">
      {version ? interpolate(m.version, { version }) : messages.errors.unavailable}
    </StatusBadge>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-primary hover:underline">
      {children}
      <ExternalLinkIcon className="size-3.5" aria-hidden />
    </a>
  );
}

export function AboutCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.about}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-lg font-bold text-navy">{messages.app.name}</p>
          <Suspense fallback={<span className="h-7 w-28 animate-pulse rounded-full bg-accent" />}>
            <InstanceVersion />
          </Suspense>
          <p className="text-xs break-all text-muted-foreground">{interpolate(m.connectedTo, { url: getApiBaseUrl() })}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-bold text-navy">{m.usefulLinks}</p>
          <ExternalLink href={externalLinks.documentation}>{m.documentation}</ExternalLink>
          <ExternalLink href={externalLinks.support}>{m.support}</ExternalLink>
        </div>
      </CardContent>
    </Card>
  );
}
