import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatNumber, interpolate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

interface PaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  hrefFor: (page: number) => string;
  children?: React.ReactNode;
}

/** Page numbers to show, with `null` marking a gap. */
function pageWindow(page: number, pageCount: number): (number | null)[] {
  const pages = new Set([1, pageCount, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pageCount));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? [null, p] : [p]));
}

export function Pagination({ page, pageCount, pageSize, total, hrefFor, children }: PaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <p className="text-xs text-muted-foreground tabular-nums">
          {interpolate(messages.common.range, {
            from: formatNumber(from),
            to: formatNumber(to),
            total: formatNumber(total),
          })}
        </p>
        {children}
      </div>
      {pageCount > 1 && (
        <nav aria-label={messages.common.pagination} className="flex items-center gap-1">
          <PageLink href={hrefFor(page - 1)} disabled={page <= 1} label={messages.common.previous}>
            <ChevronLeftIcon />
          </PageLink>
          {pageWindow(page, pageCount).map((p, i) =>
            p === null ? (
              <span key={`gap-${i}`} className="px-1 text-xs text-muted-foreground">
                …
              </span>
            ) : (
              <PageLink
                key={p}
                href={hrefFor(p)}
                current={p === page}
                label={interpolate(messages.common.goToPage, { page: p })}
              >
                {formatNumber(p)}
              </PageLink>
            ),
          )}
          <PageLink href={hrefFor(page + 1)} disabled={page >= pageCount} label={messages.common.next}>
            <ChevronRightIcon />
          </PageLink>
        </nav>
      )}
    </div>
  );
}

interface PageLinkProps {
  href: string;
  label: string;
  disabled?: boolean;
  current?: boolean;
  children: React.ReactNode;
}

function PageLink({ href, label, disabled, current, children }: PageLinkProps) {
  const className = cn("min-w-8 tabular-nums", current && "pointer-events-none");
  if (disabled) {
    return (
      <Button variant="ghost" size="icon-sm" disabled aria-label={label} className={className}>
        {children}
      </Button>
    );
  }
  return (
    <Button asChild variant={current ? "default" : "ghost"} size="sm" className={className}>
      <Link href={href} scroll={false} aria-label={label} aria-current={current ? "page" : undefined}>
        {children}
      </Link>
    </Button>
  );
}
