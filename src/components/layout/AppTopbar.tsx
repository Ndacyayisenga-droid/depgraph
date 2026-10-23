import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { messages } from "@/messages/en";

import { MobileNav } from "./MobileNav";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur md:px-8">
      <MobileNav />
      <Link href="/" className="lg:hidden">
        <Logo surface="light" className="h-5" />
      </Link>
      <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-success">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        {messages.app.liveEnvironment}
      </div>
    </header>
  );
}
