import type { Metadata } from "next";
import { Suspense } from "react";

import { CardSkeleton } from "@/components/common/CardSkeleton";
import { MetricCardsSkeleton } from "@/components/common/MetricCardsSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { HighestRiskCard } from "@/components/dashboard/HighestRiskCard";
import { PortfolioCards } from "@/components/dashboard/PortfolioCards";
import { TrendCard } from "@/components/dashboard/TrendCard";
import { RecentImportsCard } from "@/components/projects/RecentImportsCard";
import { messages } from "@/messages/en";

const m = messages.dashboard;

export const metadata: Metadata = { title: m.title };

export default function DashboardPage() {
  return (
    <>
      <PageHeader title={m.title} subtitle={m.subtitle} />
      <Suspense fallback={<MetricCardsSkeleton />}>
        <PortfolioCards />
      </Suspense>
      <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <Suspense fallback={<CardSkeleton />}>
          <TrendCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <HighestRiskCard />
        </Suspense>
      </section>
      <Suspense fallback={<CardSkeleton className="h-56" />}>
        <RecentImportsCard />
      </Suspense>
    </>
  );
}
