import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { externalLinks } from "@/lib/links";
import { messages } from "@/messages/en";

const m = messages.landing;

export function LandingHeader() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex h-[72px] max-w-screen-xl items-center gap-6 px-4 md:px-8">
        <Link href="/" aria-label={messages.app.title}>
          <Logo surface="light" />
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-[13px] font-semibold text-navy md:flex">
          <Link href="/dashboard" className="hover:text-primary">
            {m.navPlatform}
          </Link>
          <a href={externalLinks.documentation} target="_blank" rel="noreferrer" className="hover:text-primary">
            {m.navDocumentation}
          </a>
          <a href={externalLinks.openElements} target="_blank" rel="noreferrer" className="hover:text-primary">
            {m.navOpenElements}
          </a>
        </nav>
        <Link
          href="/dashboard"
          className="ml-auto inline-flex h-7 items-center rounded-full bg-success-soft px-3 text-xs font-semibold text-success md:ml-0"
        >
          {m.liveDemo}
        </Link>
      </div>
    </header>
  );
}
