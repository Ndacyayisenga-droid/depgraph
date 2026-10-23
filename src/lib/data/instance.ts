import "server-only";

import { dtGet } from "@/lib/dt/client";
import type { DtVersion } from "@/lib/dt/types";

import * as staticContent from "./staticContent";
import type { InstanceSettings, Integration, NotificationRule, Report } from "./types";

/** Dependency-Track version; served by a public endpoint, no API key required. */
export async function getInstanceVersion(): Promise<string> {
  const { data } = await dtGet<DtVersion>("/version", {}, { auth: false });
  return data.version;
}

export async function getReports(): Promise<Report[]> {
  return staticContent.reports;
}

export async function getIntegrations(): Promise<Integration[]> {
  return staticContent.integrations;
}

export async function getNotificationRules(): Promise<NotificationRule[]> {
  return staticContent.notificationRules;
}

export async function getInstanceSettings(): Promise<InstanceSettings> {
  return staticContent.instanceSettings;
}
