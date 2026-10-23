import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getIntegrations } from "@/lib/data";
import { messages } from "@/messages/en";

const m = messages.settings;

export async function IntegrationsCard() {
  const integrations = await getIntegrations();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.integrationsTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col">
          {integrations.map((integration, i) => (
            <li key={integration.id}>
              {i > 0 && <Separator className="my-4" />}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-heading">{integration.name}</span>
                  <span className="text-xs text-muted-foreground">{integration.description}</span>
                </div>
                <StatusBadge tone={integration.connected ? "success" : "neutral"} className="ml-auto">
                  {integration.connected ? m.connected : m.notConnected}
                </StatusBadge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
