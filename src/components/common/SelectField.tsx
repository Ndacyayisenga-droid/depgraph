"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectFieldProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onValueChange: (value: T) => void;
  /** Accessible name; omit when an external `<label htmlFor={id}>` names the field. */
  label?: string;
  id?: string;
  size?: "sm" | "default";
  className?: string;
}

/**
 * Select with the current label rendered explicitly, so the value is visible
 * in server-rendered HTML before hydration.
 */
export function SelectField<T extends string>({
  value,
  options,
  onValueChange,
  label,
  id,
  size,
  className,
}: SelectFieldProps<T>) {
  return (
    <Select value={value} onValueChange={(next) => onValueChange(next as T)}>
      <SelectTrigger id={id} aria-label={label} size={size} className={cn("bg-card", className)}>
        <SelectValue>{options.find((o) => o.value === value)?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
