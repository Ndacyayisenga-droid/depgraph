"use client";

import { XIcon } from "lucide-react";

import { SelectField } from "@/components/common/SelectField";
import { UrlSearchField } from "@/components/common/UrlSearchField";
import { Button } from "@/components/ui/button";
import { useQueryUpdater } from "@/hooks/useQueryUpdater";
import { classifiers } from "@/lib/data/types";
import { interpolate } from "@/lib/format";
import { defaultProjectQuery, hasActiveFilters, type ProjectQuery } from "@/lib/query/projects";
import { messages } from "@/messages/en";

const m = messages.projects;
const ALL = "all";
const filterClass = "h-9 min-w-36 text-[13px]";

const classifierOptions = [
  { value: ALL, label: m.filters.allClassifiers },
  ...classifiers.map((c) => ({ value: c, label: messages.classifier[c] })),
];
const statusOptions = (["active", "all"] as const).map((s) => ({ value: s, label: m.status[s] }));
const scopeOptions = (["root", "all"] as const).map((s) => ({ value: s, label: m.scope[s] }));

interface ProjectFiltersProps {
  query: ProjectQuery;
  tags: string[];
  parentName?: string;
}

export function ProjectFilters({ query, tags, parentName }: ProjectFiltersProps) {
  const { update } = useQueryUpdater();
  const d = defaultProjectQuery;
  const set = (param: string, value: string, defaultValue: string) =>
    update({ [param]: value === defaultValue ? null : value, page: null });

  const tagValues = query.tag && !tags.includes(query.tag) ? [query.tag, ...tags] : tags;
  const tagOptions = [{ value: ALL, label: m.filters.allTags }, ...tagValues.map((t) => ({ value: t, label: t }))];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center">
        <UrlSearchField
          param="q"
          value={query.q}
          label={m.searchPlaceholder}
          placeholder={m.searchPlaceholder}
          className="max-w-xl 2xl:flex-1"
        />
        <div className="flex flex-wrap items-center gap-2">
          <SelectField
            label={m.filters.classifier}
            value={query.classifier}
            options={classifierOptions}
            className={filterClass}
            onValueChange={(v) => set("classifier", v, d.classifier)}
          />
          <SelectField
            label={m.filters.tag}
            value={query.tag || ALL}
            options={tagOptions}
            className={filterClass}
            onValueChange={(v) => set("tag", v === ALL ? "" : v, d.tag)}
          />
          <SelectField
            label={m.filters.status}
            value={query.status}
            options={statusOptions}
            className={filterClass}
            onValueChange={(v) => set("status", v, d.status)}
          />
          {!query.parent && (
            <SelectField
              label={m.filters.scope}
              value={query.scope}
              options={scopeOptions}
              className={filterClass}
              onValueChange={(v) => set("scope", v, d.scope)}
            />
          )}
          {hasActiveFilters(query) && (
            <Button
              variant="ghost"
              className="h-9 text-primary"
              onClick={() =>
                update({ q: null, classifier: null, tag: null, status: null, scope: null, parent: null, page: null })
              }
            >
              {messages.common.clearFilters}
            </Button>
          )}
        </div>
      </div>
      {query.parent && (
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-info-soft py-1 pr-1 pl-3 text-xs font-semibold text-info">
            {interpolate(m.parentFilter, { name: parentName ?? query.parent })}
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-full text-info hover:bg-info/10"
              aria-label={m.removeParentFilter}
              onClick={() => update({ parent: null, page: null })}
            >
              <XIcon />
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}
