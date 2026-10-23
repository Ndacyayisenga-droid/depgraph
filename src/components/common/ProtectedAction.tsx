"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { messages } from "@/messages/en";

type ProtectedActionProps = React.ComponentProps<typeof Button>;

/**
 * Write operations are only available through the authenticated
 * Dependency-Track API, so the public frontend renders them as inert
 * buttons that explain where the action is enforced.
 */
export function ProtectedAction({ children, ...props }: ProtectedActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button aria-disabled="true" onClick={(e) => e.preventDefault()} {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-64 text-center">
        {messages.common.protectedAction}
      </TooltipContent>
    </Tooltip>
  );
}
