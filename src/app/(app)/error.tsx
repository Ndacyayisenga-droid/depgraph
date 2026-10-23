"use client";

import { useEffect } from "react";

import { DataError } from "@/components/common/DataError";
import { Button } from "@/components/ui/button";
import { messages } from "@/messages/en";

export default function AppError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <DataError
      action={
        <Button variant="outline" className="text-primary" onClick={() => retry()}>
          {messages.errors.retry}
        </Button>
      }
    />
  );
}
