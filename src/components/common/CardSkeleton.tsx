import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

/** Placeholder shown while a streamed section loads. */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label={messages.common.loading}
      className={cn("h-72 animate-pulse rounded-xl border bg-card", className)}
    />
  );
}
