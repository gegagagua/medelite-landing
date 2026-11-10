import "server-only";

import type { CRMAdapter } from "./types";
import { mockAdapter } from "./mock-adapter";

let cached: CRMAdapter | null = null;

export async function getCRM(): Promise<CRMAdapter> {
  if (cached) return cached;
  const mode = process.env.CRM_ADAPTER ?? "mock";
  if (mode === "laravel") {
    const { laravelAdapter } = await import("./laravel-adapter");
    cached = laravelAdapter;
  } else {
    cached = mockAdapter;
  }
  return cached;
}

export type * from "./types";
