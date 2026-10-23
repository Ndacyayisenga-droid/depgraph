"use client";

import { usePathname } from "next/navigation";

import { NavLinks } from "./NavLinks";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return <NavLinks pathname={pathname} onNavigate={onNavigate} />;
}
