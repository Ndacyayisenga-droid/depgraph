import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Tone } from "@/lib/data/types";
import { toneSolid, toneText } from "@/lib/tones";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: Tone;
  hint?: string;
  hintTone?: Tone;
}

export function MetricCard({ label, value, icon: Icon, tone, hint, hintTone }: MetricCardProps) {
  return (
    <Card className="gap-0">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full text-white",
              toneSolid[tone],
            )}
          >
            <Icon className="size-3.5" strokeWidth={2.5} aria-hidden />
          </span>
        </div>
        <p className="font-heading text-[28px] leading-none font-bold text-heading tabular-nums">
          {value}
        </p>
        {hint && (
          <p
            className={cn(
              "text-xs font-medium",
              hintTone ? toneText[hintTone] : "text-muted-foreground",
            )}
          >
            {hint}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
