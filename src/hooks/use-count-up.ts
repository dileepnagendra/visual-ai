"use client";

import { useRef } from "react";

/**
 * Previously animated count-up hook.
 * Now returns the final value immediately to avoid flickering
 * caused by streaming renders and re-mounts.
 */
export function useCountUp(
  formattedValue: string | undefined,
  _duration: number = 1200
): { displayValue: string; ref: React.RefObject<HTMLElement | null> } {
  const ref = useRef<HTMLElement | null>(null);
  return { displayValue: formattedValue || "", ref };
}
