import { CheckIcon, ShieldCheckIcon } from "lucide-react";

interface HeroVisualProps {
  badgeLabel: string;
  badgeValue: React.ReactNode;
}

export function HeroVisual({ badgeLabel, badgeValue }: HeroVisualProps) {
  return (
    <div className="relative mx-auto aspect-[14/11] w-full max-w-sm" aria-hidden>
      <div className="absolute inset-0 rounded-[26px] bg-primary-100" />
      <div className="absolute top-[18%] right-[8%] bottom-[9%] left-[14%] rounded-[20px] bg-primary-200" />
      <div className="absolute top-[9%] right-[8%] bottom-[27%] left-[29%] rounded-[18px] bg-primary-400" />
      <div className="absolute top-[45%] left-[68%] flex aspect-square w-[39%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
        <CheckIcon className="size-1/2 text-white" strokeWidth={3} />
      </div>
      <div className="absolute bottom-[14%] -left-4 flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-md sm:-left-8">
        <span className="flex size-8 items-center justify-center rounded-full bg-success-soft text-success">
          <ShieldCheckIcon className="size-4" />
        </span>
        <span className="flex flex-col">
          <span className="text-[11px] text-muted-foreground">{badgeLabel}</span>
          <span className="text-[13px] font-semibold text-heading">{badgeValue}</span>
        </span>
      </div>
    </div>
  );
}
