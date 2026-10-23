import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  body?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, body, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-info-soft text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <p className="font-heading text-base font-semibold text-heading">{title}</p>
      {body && <p className="max-w-sm text-[13px] text-muted-foreground">{body}</p>}
      {action}
    </div>
  );
}
