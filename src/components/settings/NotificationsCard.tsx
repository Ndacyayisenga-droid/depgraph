import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getNotificationRules } from "@/lib/data";
import { messages } from "@/messages/en";

const m = messages.settings;

export async function NotificationsCard() {
  const rules = await getNotificationRules();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.notificationsTitle}</CardTitle>
        <CardDescription>{messages.common.protectedAction}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {rules.map((rule, i) => (
            <li key={rule.id}>
              {i > 0 && <Separator className="my-4" />}
              <div className="flex items-center gap-4">
                <Label htmlFor={`rule-${rule.id}`} className="flex flex-col items-start gap-1">
                  <span className="text-sm font-semibold text-heading">{rule.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{rule.description}</span>
                </Label>
                <Switch id={`rule-${rule.id}`} checked={rule.enabled} disabled className="ml-auto" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
