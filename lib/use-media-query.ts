"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. Uses useSyncExternalStore so React doesn't
 * complain about setState-in-effect lint rules, and so SSR gets a stable
 * server snapshot.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
