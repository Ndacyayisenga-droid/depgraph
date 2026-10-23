import type { Metadata } from "next";

import { PageHeader } from "@/components/common/PageHeader";
import { ReportList } from "@/components/reports/ReportList";
import { getReports } from "@/lib/data";
import { messages } from "@/messages/en";

const m = messages.reports;

export const metadata: Metadata = { title: m.title };

export default async function ReportsPage() {
  const reports = await getReports();
  return (
    <>
      <PageHeader title={m.title} subtitle={m.subtitle} />
      <ReportList reports={reports} />
    </>
  );
}
