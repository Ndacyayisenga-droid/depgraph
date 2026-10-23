import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { messages } from "@/messages/en";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo surface="light" className="h-6" />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{messages.notFound.title}</h1>
        <p className="text-sm text-muted-foreground">{messages.notFound.body}</p>
      </div>
      <Button asChild size="lg" className="h-10 px-4">
        <Link href="/dashboard">{messages.notFound.back}</Link>
      </Button>
    </main>
  );
}
