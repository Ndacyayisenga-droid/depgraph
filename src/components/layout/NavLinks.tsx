import Link from "next/link";
import {
  BoxesIcon,
  FileBarChartIcon,
  FolderKanbanIcon,
  HouseIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShieldAlertIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: messages.nav.home, icon: HouseIcon },
  { href: "/dashboard", label: messages.nav.dashboard, icon: LayoutDashboardIcon },
  { href: "/projects", label: messages.nav.projects, icon: FolderKanbanIcon },
  { href: "/vulnerabilities", label: messages.nav.vulnerabilities, icon: ShieldAlertIcon },
  { href: "/sbom", label: messages.nav.sbom, icon: BoxesIcon },
  { href: "/reports", label: messages.nav.reports, icon: FileBarChartIcon },
  { href: "/settings", label: messages.nav.settings, icon: SettingsIcon },
];

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavLinksProps {
  pathname: string | null;
  onNavigate?: () => void;
}

export function NavLinks({ pathname, onNavigate }: NavLinksProps) {
  return (
    <nav aria-label={messages.app.navigation} className="flex flex-col gap-1 px-3">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
              active
                ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0 text-sidebar-muted" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
