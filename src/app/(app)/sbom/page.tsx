import type { Metadata } from "next";
import { Suspense } from "react";

import { CardSkeleton } from "@/components/common/CardSkeleton";
import { MetricCardsSkeleton } from "@/components/common/MetricCardsSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { RecentImportsCard } from "@/components/projects/RecentImportsCard";
import { PostureCard } from "@/components/sbom/PostureCard";
import { SbomMetricCards } from "@/components/sbom/SbomMetricCards";
import { ViolationsByStateCard } from "@/components/sbom/ViolationsByStateCard";
import { ViolationsByTypeCard } from "@/components/sbom/ViolationsByTypeCard";
import { messages } from "@/messages/en";

const m = messages.sbom;

export const metadata: Metadata = { title: m.title };

export default function SbomPage() {
  return (
    <>
      <PageHeader title={m.title} subtitle={m.subtitle} />
      <Suspense fallback={<MetricCardsSkeleton />}>
        <SbomMetricCards />
      </Suspense>
      <section className="grid gap-4 lg:grid-cols-2">
        <Suspense fallback={<CardSkeleton className="h-64" />}>
          <ViolationsByStateCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton className="h-64" />}>
          <ViolationsByTypeCard />
        </Suspense>
      </section>
      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Suspense fallback={<CardSkeleton />}>
          <RecentImportsCard limit={6} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <PostureCard />
        </Suspense>
      </section>
    </>
  );
}
