import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
}

export function FeatureCard({ icon: Icon, title, body }: FeatureCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-info-soft text-primary">
          <Icon className="size-[18px]" aria-hidden />
        </span>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-[13px] leading-relaxed text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  );
}
