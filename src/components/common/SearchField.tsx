import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchFieldProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  label: string;
};

export function SearchField({ label, className, ...props }: SearchFieldProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        aria-label={label}
        className="h-10 rounded-lg bg-card pl-10 text-[13px] shadow-none"
        {...props}
      />
    </div>
  );
}
