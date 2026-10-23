import { CloudOffIcon } from "lucide-react";

import { messages } from "@/messages/en";

export function DataError({ action }: { action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-card px-6 py-12 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-danger-soft text-danger">
        <CloudOffIcon className="size-5" aria-hidden />
      </span>
      <p className="font-heading text-base font-semibold text-heading">{messages.errors.title}</p>
      <p className="max-w-md text-[13px] text-muted-foreground">{messages.errors.body}</p>
      {action}
    </div>
  );
}
