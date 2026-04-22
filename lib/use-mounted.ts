"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true once the component has hydrated on the client, false on the
 * server. Uses useSyncExternalStore to avoid setState-in-effect lint.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
