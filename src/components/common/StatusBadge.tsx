import { Badge } from "@/components/ui/badge";
import type { Tone } from "@/lib/data/types";
import { toneSoft } from "@/lib/tones";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  tone: Tone;
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ tone, children, size = "sm", className }: StatusBadgeProps) {
  return (
    <Badge
      variant="ghost"
      className={cn(
        "font-semibold hover:bg-current/0",
        toneSoft[tone],
        size === "md" && "h-7 px-3 text-xs",
        className,
      )}
    >
      {children}
    </Badge>
  );
}
