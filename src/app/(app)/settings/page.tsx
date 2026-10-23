import type { Metadata } from "next";
import { Suspense } from "react";

import { CardSkeleton } from "@/components/common/CardSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { TabNav } from "@/components/common/TabNav";
import { AboutCard } from "@/components/settings/AboutCard";
import { AccessModelCard } from "@/components/settings/AccessModelCard";
import { GeneralSettingsCard } from "@/components/settings/GeneralSettingsCard";
import { IntegrationsCard } from "@/components/settings/IntegrationsCard";
import { NotificationsCard } from "@/components/settings/NotificationsCard";
import { SecurityCard } from "@/components/settings/SecurityCard";
import { firstValue, parseOneOf } from "@/lib/query/url";
import { messages } from "@/messages/en";

const m = messages.settings;
const tabs = ["general", "security", "integrations", "notifications"] as const;

export const metadata: Metadata = { title: m.title };

type Props = PageProps<"/settings">;

export default function SettingsPage({ searchParams }: Props) {
  return (
    <>
      <PageHeader title={m.title} subtitle={m.subtitle} />
      <Suspense fallback={<CardSkeleton className="h-96" />}>
        <SettingsView searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function SettingsView({ searchParams }: Pick<Props, "searchParams">) {
  const tab = parseOneOf(firstValue((await searchParams).tab), tabs, "general");
  return (
    <>
      <TabNav
        label={m.title}
        items={tabs.map((t) => ({
          href: t === "general" ? "/settings" : `/settings?tab=${t}`,
          label: m.tabs[t],
          active: t === tab,
        }))}
      />
      <div className="grid items-start gap-4 lg:grid-cols-[1.65fr_1fr]">
        <div>
          {tab === "general" && <GeneralSettingsCard />}
          {tab === "security" && <SecurityCard />}
          {tab === "integrations" && <IntegrationsCard />}
          {tab === "notifications" && <NotificationsCard />}
        </div>
        <div className="flex flex-col gap-4">
          <AboutCard />
          <AccessModelCard />
        </div>
      </div>
    </>
  );
}
