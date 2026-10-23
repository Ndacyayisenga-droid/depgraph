import type { Tone } from "@/lib/data/types";
import { toneSolid } from "@/lib/tones";
import { cn } from "@/lib/utils";

const ringSoft: Record<Tone, string> = {
  success: "bg-success-soft",
  warning: "bg-warning-soft",
  danger: "bg-danger-soft",
  info: "bg-info-soft",
  neutral: "bg-neutral-soft",
};

interface PostureRingProps {
  label: string;
  tone: Tone;
}

export function PostureRing({ label, tone }: PostureRingProps) {
  return (
    <div className={cn("flex size-28 shrink-0 items-center justify-center rounded-full", ringSoft[tone])}>
      <div className="flex size-[86px] items-center justify-center rounded-full bg-card">
        <div
          className={cn(
            "flex size-[70px] items-center justify-center rounded-full text-[13px] font-bold tracking-wide text-white uppercase",
            toneSolid[tone],
          )}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
