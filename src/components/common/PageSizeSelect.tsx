"use client";

import { useQueryUpdater } from "@/hooks/useQueryUpdater";
import { DEFAULT_PAGE_SIZE, pageSizes } from "@/lib/query/projects";
import { messages } from "@/messages/en";

import { SelectField } from "./SelectField";

const options = pageSizes.map((size) => ({ value: String(size), label: String(size) }));

export function PageSizeSelect({ value }: { value: number }) {
  const { update } = useQueryUpdater();
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>{messages.common.rowsPerPage}</span>
      <SelectField
        label={messages.common.rowsPerPage}
        value={String(value)}
        options={options}
        size="sm"
        className="w-[72px] text-xs"
        onValueChange={(size) => update({ size: Number(size) === DEFAULT_PAGE_SIZE ? null : size, page: null })}
      />
    </div>
  );
}
