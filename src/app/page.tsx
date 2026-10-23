import Link from "next/link";
import { ArrowRightIcon, ExternalLinkIcon, EyeIcon, ListChecksIcon, RadarIcon, ScaleIcon } from "lucide-react";

import { FeatureCard } from "@/components/landing/FeatureCard";
import { HeroVisual } from "@/components/landing/HeroVisual";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { getPortfolioMetrics } from "@/lib/data";
import { formatNumber, interpolate } from "@/lib/format";
import { Suspense } from "react";
import { externalLinks } from "@/lib/links";
import { messages } from "@/messages/en";

const m = messages.landing;
const featureIcons = [EyeIcon, RadarIcon, ScaleIcon, ListChecksIcon];

async function MonitoredProjects() {
  try {
    const metrics = await getPortfolioMetrics();
    return interpolate(m.heroBadgeValue, { count: formatNumber(metrics.projects) });
  } catch {
    return m.heroBadgeFallback;
  }
}

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="border-b bg-primary-50">
          <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-6">
              <p className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">{m.eyebrow}</p>
              <h1 className="text-4xl leading-[1.2] font-bold text-navy xl:text-[42px]">
                {m.headline}
                <span className="block text-primary">{m.headlineAccent}</span>
              </h1>
              <p className="max-w-lg text-[17px] leading-relaxed text-muted-foreground">{m.lead}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-10 px-4">
                  <Link href="/projects">
                    {m.ctaPrimary}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-10 bg-card px-4 text-primary">
                  <a href={externalLinks.documentation} target="_blank" rel="noreferrer">
                    {m.ctaSecondary}
                    <ExternalLinkIcon data-icon="inline-end" />
                  </a>
                </Button>
              </div>
            </div>
            <HeroVisual
              badgeLabel={m.heroBadge}
              badgeValue={
                <Suspense fallback={m.heroBadgeFallback}>
                  <MonitoredProjects />
                </Suspense>
              }
            />
          </div>
        </section>

        <section className="mx-auto max-w-screen-xl px-4 py-12 md:px-8">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {m.features.map((feature, i) => (
              <li key={feature.title}>
                <FeatureCard icon={featureIcons[i]} title={feature.title} body={feature.body} />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-xs font-medium text-muted-foreground">{m.accessNote}</p>
        </section>
      </main>
      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:px-8">
          <span>{messages.app.tagline.join(" ")}</span>
          <Link href="/design-system" className="hover:text-primary">
            {messages.nav.designSystem}
          </Link>
        </div>
      </footer>
    </div>
  );
}
