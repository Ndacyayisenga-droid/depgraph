import type { Metadata } from "next";
import { FolderKanbanIcon } from "lucide-react";

import { MetricCard } from "@/components/common/MetricCard";
import { SearchField } from "@/components/common/SearchField";
import { StatusBadge } from "@/components/common/StatusBadge";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { messages } from "@/messages/en";

const m = messages.designSystem;

export const metadata: Metadata = { title: messages.nav.designSystem };

const palette = [
  { name: m.colors.primary, token: "--primary", className: "bg-primary" },
  { name: m.colors.navy, token: "--navy", className: "bg-navy" },
  { name: m.colors.lightBlue, token: "--secondary", className: "bg-secondary" },
  { name: m.colors.teal, token: "--teal", className: "bg-teal" },
  { name: m.colors.success, token: "--success", className: "bg-success" },
  { name: m.colors.warning, token: "--warning", className: "bg-warning" },
  { name: m.colors.danger, token: "--danger", className: "bg-danger" },
  { name: m.colors.neutral, token: "--neutral", className: "bg-neutral" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-navy">{children}</h2>;
}

function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-navy">{children}</h3>;
}

export default function DesignSystemPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <LandingHeader />
      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-10 px-4 py-10 md:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] font-bold text-navy">{m.title}</h1>
          <p className="text-sm text-muted-foreground">{m.subtitle}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <section className="flex flex-col gap-5">
              <SectionTitle>{m.colorPalette}</SectionTitle>
              <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                {palette.map((color) => (
                  <li key={color.token} className="flex flex-col gap-2">
                    <span className={`h-14 rounded-[10px] border ${color.className}`} />
                    <span className="text-xs font-semibold text-heading">{color.name}</span>
                    <code className="text-[11px] text-muted-foreground">{color.token}</code>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-4">
              <SectionTitle>{m.typography}</SectionTitle>
              <p className="font-heading text-[32px] leading-tight font-bold text-navy">{m.typeScale.h1}</p>
              <p className="font-heading text-2xl font-semibold text-navy">{m.typeScale.h2}</p>
              <p className="text-sm text-heading">{m.typeScale.body}</p>
              <p className="text-xs text-muted-foreground">{m.typeScale.caption}</p>
            </section>
          </div>

          <section className="flex flex-col gap-6">
            <SectionTitle>{m.components}</SectionTitle>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="h-10 px-4">
                {m.primaryButton}
              </Button>
              <Button variant="outline" size="lg" className="h-10 px-4 text-primary">
                {m.secondaryButton}
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <Subheading>{m.statusBadges}</Subheading>
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone="success" size="md">{m.badgeSuccess}</StatusBadge>
                <StatusBadge tone="warning" size="md">{m.badgeWarning}</StatusBadge>
                <StatusBadge tone="danger" size="md">{m.badgeDanger}</StatusBadge>
                <StatusBadge tone="info" size="md">{m.badgeInfo}</StatusBadge>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Subheading>{m.searchField}</Subheading>
              <SearchField label={m.searchPlaceholder} placeholder={m.searchPlaceholder} className="max-w-md" />
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex w-52 flex-col gap-3">
                <Subheading>{m.metricCard}</Subheading>
                <MetricCard label={messages.dashboard.totalProjects} value="12" icon={FolderKanbanIcon} tone="info" />
              </div>
              <div className="flex flex-col gap-3">
                <Subheading>{m.riskBadge}</Subheading>
                <StatusBadge tone="danger" size="md">{m.highRisk}</StatusBadge>
              </div>
            </div>

            <Card className="bg-transparent">
              <CardContent className="flex flex-col gap-3">
                <Subheading>{m.layoutPrinciples}</Subheading>
                <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
                  {m.principles.map((principle) => (
                    <li key={principle} className="flex items-center gap-3">
                      <span className="size-2 rounded-full bg-primary" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
