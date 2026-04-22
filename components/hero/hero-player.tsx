"use client";

import { Player } from "@remotion/player";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import {
  HeroComposition,
  HERO_DURATION_IN_FRAMES,
  HERO_FPS,
  type HeroProps,
} from "./hero-composition";

type Props = HeroProps & {
  className?: string;
};

/**
 * Embeds the Remotion hero composition as a browser-playable Player.
 * - Autoplays on mount
 * - Holds on last frame instead of looping (no "overstay welcome")
 * - Respects prefers-reduced-motion — renders last frame immediately
 * - Click to replay
 */
export function HeroPlayer({ name, className }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [key, setKey] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setKey((k) => k + 1)}
      aria-label="Replay hero animation"
      className={className}
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <Player
        key={key}
        acknowledgeRemotionLicense
        component={HeroComposition}
        inputProps={{ name }}
        durationInFrames={HERO_DURATION_IN_FRAMES}
        fps={HERO_FPS}
        compositionWidth={1600}
        compositionHeight={900}
        style={{ width: "100%", height: "100%" }}
        autoPlay={!prefersReducedMotion}
        initialFrame={
          prefersReducedMotion ? HERO_DURATION_IN_FRAMES - 1 : undefined
        }
        controls={false}
        loop={false}
        clickToPlay={false}
        showVolumeControls={false}
      />
    </button>
  );
}
