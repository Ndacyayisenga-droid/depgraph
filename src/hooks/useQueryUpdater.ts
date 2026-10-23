"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

import { hrefWith, toRecord, type QueryChanges } from "@/lib/query/url";

/** Updates URL query parameters without scrolling, keeping the current UI visible while the server re-renders. */
export function useQueryUpdater() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    (changes: QueryChanges) => {
      const href = hrefWith(pathname, toRecord(new URLSearchParams(searchParams.toString())), changes);
      startTransition(() => router.replace(href, { scroll: false }));
    },
    [pathname, router, searchParams],
  );

  return { update, isPending };
}
