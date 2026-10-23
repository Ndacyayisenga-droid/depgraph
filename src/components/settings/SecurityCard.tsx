import { CheckCircle2Icon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { messages } from "@/messages/en";

const m = messages.settings;

export function SecurityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.securityTitle}</CardTitle>
        <CardDescription className="leading-relaxed">{m.securityBody}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3 text-[13px]">
          {m.securityItems.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
