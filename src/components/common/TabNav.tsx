import Link from "next/link";

import { cn } from "@/lib/utils";

interface TabNavProps {
  label: string;
  items: { href: string; label: string; active: boolean }[];
}

/** Link-based tabs, so the selected tab is part of the URL. */
export function TabNav({ label, items }: TabNavProps) {
  return (
    <nav aria-label={label} className="flex gap-6 overflow-x-auto border-b">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          scroll={false}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "relative shrink-0 pb-3 text-[13px] whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full",
            item.active
              ? "font-semibold text-primary after:bg-primary"
              : "text-muted-foreground hover:text-heading",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
