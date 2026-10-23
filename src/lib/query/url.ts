export type RawSearchParams = Record<string, string | string[] | undefined>;
export type QueryChanges = Record<string, string | number | null | undefined>;

export function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseOneOf<T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T {
  return allowed.find((candidate) => candidate === value) ?? fallback;
}

export function parsePositiveInt(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

export function parseSearchText(value: string | undefined): string {
  return (value ?? "").trim().slice(0, 200);
}

export function toRecord(params: RawSearchParams | URLSearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  if (params instanceof URLSearchParams) {
    params.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }
  for (const [key, value] of Object.entries(params)) {
    const v = firstValue(value);
    if (v !== undefined) out[key] = v;
  }
  return out;
}

/** Applies changes to a query; `null`, `undefined` and `""` remove the key. */
export function hrefWith(pathname: string, base: Record<string, string>, changes: QueryChanges): string {
  const params = new URLSearchParams(base);
  for (const [key, value] of Object.entries(changes)) {
    if (value === null || value === undefined || value === "") params.delete(key);
    else params.set(key, String(value));
  }
  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}
