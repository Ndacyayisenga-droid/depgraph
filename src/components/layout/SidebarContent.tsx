import Link from "next/link";
import { Suspense } from "react";

import { Logo } from "@/components/brand/Logo";
import { messages } from "@/messages/en";

import { NavLinks } from "./NavLinks";
import { SidebarNav } from "./SidebarNav";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar py-6">
      <Link href="/" onClick={onNavigate} className="mb-8 px-6">
        <Logo surface="dark" className="h-5" />
      </Link>
      <Suspense fallback={<NavLinks pathname={null} />}>
        <SidebarNav onNavigate={onNavigate} />
      </Suspense>
      <p className="mt-auto flex flex-col gap-1 px-6 text-xs leading-relaxed text-sidebar-muted">
        {messages.app.tagline.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}
