export const locale = "en";

export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

const numberFormat = new Intl.NumberFormat(locale);
const decimalFormat = new Intl.NumberFormat(locale, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const percentFormat = new Intl.NumberFormat(locale, {
  style: "percent",
  maximumFractionDigits: 0,
});
const relativeFormat = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
const dateTimeFormat = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});
const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" });
const signedFormat = new Intl.NumberFormat(locale, { signDisplay: "exceptZero" });
const signedPercentFormat = new Intl.NumberFormat(locale, {
  style: "percent",
  maximumFractionDigits: 0,
  signDisplay: "exceptZero",
});
const monthFormat = new Intl.DateTimeFormat(locale, {
  month: "short",
  timeZone: "UTC",
});

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

export function formatDecimal(value: number): string {
  return decimalFormat.format(value);
}

export function formatPercent(ratio: number): string {
  return percentFormat.format(ratio);
}

function formatRelativeMinutes(minutesAgo: number): string {
  if (minutesAgo < 60) return relativeFormat.format(-minutesAgo, "minute");
  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) return relativeFormat.format(-hours, "hour");
  return relativeFormat.format(-Math.round(hours / 24), "day");
}

/** Relative time for an epoch timestamp. Server-only: depends on the current time. */
export function formatSince(epochMs: number | null, never: string): string {
  if (epochMs === null) return never;
  return formatRelativeMinutes(Math.max(0, Math.round((Date.now() - epochMs) / 60_000)));
}

export function formatDateTime(value: string | number): string {
  return dateTimeFormat.format(new Date(value));
}

export function formatDate(epochMs: number | null, fallback: string): string {
  return epochMs === null ? fallback : dateFormat.format(new Date(epochMs));
}

export function formatSignedNumber(value: number): string {
  return signedFormat.format(value);
}

export function formatSignedPercent(ratio: number): string {
  return signedPercentFormat.format(ratio);
}

export function formatMonth(iso: string): string {
  return monthFormat.format(new Date(iso));
}
