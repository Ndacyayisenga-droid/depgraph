import "server-only";

import { connection } from "next/server";

const DEFAULT_BASE_URL = "https://apiserver-mglnxlm8fsyhwlp7xgwjqa56.production.open-elements.cloud";
const TIMEOUT_MS = 15_000;

export type QueryValue = string | number | boolean | null | undefined;

export class DtApiError extends Error {
  constructor(
    readonly status: number,
    readonly endpoint: string,
  ) {
    super(`Dependency-Track API request failed: ${endpoint} (${status})`);
    this.name = "DtApiError";
  }
}

class DtConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DtConfigError";
  }
}

function config() {
  return {
    baseUrl: (process.env.DT_API_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, ""),
    apiKey: process.env.DT_API_KEY,
  };
}

export function getApiBaseUrl(): string {
  return config().baseUrl;
}

const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [300, 1000];
const RETRYABLE_STATUS = new Set([502, 503, 504]);
const RETRYABLE_NETWORK_CODES = new Set([
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_SOCKET",
  "ECONNRESET",
  "ECONNREFUSED",
  "EPIPE",
  "ETIMEDOUT",
  "EAI_AGAIN",
]);

/** Connection-level failures where the request never reached the API, so a GET is safe to repeat. */
function isRetryableNetworkError(error: unknown): boolean {
  const cause = error instanceof Error ? (error.cause as { code?: string } | undefined) : undefined;
  return typeof cause?.code === "string" && RETRYABLE_NETWORK_CODES.has(cause.code);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: URL, init: { headers: Record<string, string> }): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const isLast = attempt >= MAX_ATTEMPTS;
    try {
      const response = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (isLast || !RETRYABLE_STATUS.has(response.status)) return response;
      console.warn(`[dependency-track] GET ${url.pathname} -> ${response.status}, retrying (attempt ${attempt + 1}/${MAX_ATTEMPTS})`);
    } catch (error) {
      if (isLast || !isRetryableNetworkError(error)) {
        console.error(`[dependency-track] GET ${url.pathname} failed after ${attempt} attempt(s):`, error);
        throw new DtApiError(0, url.pathname);
      }
      console.warn(
        `[dependency-track] GET ${url.pathname} network error (${(error as Error & { cause?: { code?: string } }).cause?.code}), retrying (attempt ${attempt + 1}/${MAX_ATTEMPTS})`,
      );
    }
    await delay(RETRY_DELAYS_MS[attempt - 1] ?? 1000);
  }
}

export interface DtResponse<T> {
  data: T;
  /** Value of `X-Total-Count`, present on paginated endpoints. */
  total: number | null;
}

/**
 * Performs an authenticated GET against the Dependency-Track REST API.
 * Must only run on the server: the API key is read from the environment and
 * never sent to the browser.
 */
export async function dtGet<T>(
  path: string,
  query: Record<string, QueryValue> = {},
  { auth = true }: { auth?: boolean } = {},
): Promise<DtResponse<T>> {
  // Portfolio data is always read at request time, never baked in at build time.
  await connection();
  const { baseUrl, apiKey } = config();
  if (auth && !apiKey) {
    throw new DtConfigError("DT_API_KEY is not set. Add it to .env.local (see .env.example).");
  }

  const url = new URL(`${baseUrl}/api${path}`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== null && value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const response = await fetchWithRetry(url, {
    headers: { Accept: "application/json", ...(auth && apiKey ? { "X-Api-Key": apiKey } : {}) },
  });

  if (!response.ok) {
    // 404 is an expected outcome (e.g. unknown project) that callers handle themselves.
    if (response.status !== 404) {
      const body = await response.text().catch(() => "");
      console.error(`[dependency-track] GET ${url.pathname}${url.search} -> ${response.status}`, body.slice(0, 500));
    }
    throw new DtApiError(response.status, url.pathname);
  }

  const total = response.headers.get("X-Total-Count");
  const text = await response.text();
  return {
    data: (text ? JSON.parse(text) : null) as T,
    total: total === null ? null : Number(total),
  };
}
