"use client";

import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SearchField } from "@/components/common/SearchField";
import { useQueryUpdater } from "@/hooks/useQueryUpdater";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 300;

interface UrlSearchFieldProps {
  param: string;
  value: string;
  label: string;
  placeholder: string;
  className?: string;
}

/** Search input bound to a URL query parameter; resets pagination on change. */
export function UrlSearchField({ param, value, label, placeholder, className }: UrlSearchFieldProps) {
  const { update, isPending } = useQueryUpdater();
  const [text, setText] = useState(value);
  const [syncedValue, setSyncedValue] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  if (value !== syncedValue) {
    setSyncedValue(value);
    setText(value);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className={cn("relative", className)}>
      <SearchField
        label={label}
        placeholder={placeholder}
        value={text}
        onChange={(e) => {
          const next = e.target.value;
          setText(next);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => update({ [param]: next.trim(), page: null }), DEBOUNCE_MS);
        }}
      />
      {isPending && (
        <LoaderCircleIcon
          className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
          aria-hidden
        />
      )}
    </div>
  );
}
