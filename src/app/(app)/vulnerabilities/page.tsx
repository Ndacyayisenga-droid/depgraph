import type { Metadata } from "next";
import { Suspense } from "react";

import { CardSkeleton } from "@/components/common/CardSkeleton";
import { MetricCardsSkeleton } from "@/components/common/MetricCardsSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { SeverityCards } from "@/components/vulnerabilities/SeverityCards";
import { VulnerabilityList } from "@/components/vulnerabilities/VulnerabilityList";
import { messages } from "@/messages/en";

const m = messages.vulnerabilities;

export const metadata: Metadata = { title: m.title };

export default function VulnerabilitiesPage({ searchParams }: PageProps<"/vulnerabilities">) {
  return (
    <>
      <PageHeader title={m.title} subtitle={m.subtitle} />
      <Suspense fallback={<MetricCardsSkeleton />}>
        <SeverityCards />
      </Suspense>
      <Suspense fallback={<CardSkeleton className="h-[520px]" />}>
        <VulnerabilityList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
