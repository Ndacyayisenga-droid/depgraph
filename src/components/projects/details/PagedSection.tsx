import { PageSizeSelect } from "@/components/common/PageSizeSelect";
import { Pagination } from "@/components/common/Pagination";
import { UrlSearchField } from "@/components/common/UrlSearchField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Page } from "@/lib/data/types";
import { formatNumber } from "@/lib/format";
import { hrefWith } from "@/lib/query/url";

interface PagedSectionProps {
  title: string;
  searchLabel: string;
  query: string;
  page: Page<unknown>;
  pathname: string;
  base: Record<string, string>;
  children: React.ReactNode;
}

/** Card with a URL-bound search field, a table and server-side pagination. */
export function PagedSection({ title, searchLabel, query, page, pathname, base, children }: PagedSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>
          {title}
          <span className="ml-2 text-xs font-normal text-muted-foreground tabular-nums">{formatNumber(page.total)}</span>
        </CardTitle>
        <UrlSearchField param="q" value={query} label={searchLabel} placeholder={searchLabel} className="w-full sm:max-w-xs" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {children}
        {page.total > 0 && (
          <Pagination
            page={page.page}
            pageCount={page.pageCount}
            pageSize={page.pageSize}
            total={page.total}
            hrefFor={(p) => hrefWith(pathname, base, { page: p === 1 ? null : p })}
          >
            <PageSizeSelect value={page.pageSize} />
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}
