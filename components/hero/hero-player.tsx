"use client";

import { Player } from "@remotion/player";
import Image from "next/image";
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
 * - Holds on last frame (moveToBeginningWhenEnded=false) so text persists
 * - Respects prefers-reduced-motion — renders last frame immediately
 * - Click to replay
 * - Decorative AI art sits behind the player (composition is transparent)
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
        position: "relative",
        width: "100%",
        height: "clamp(220px, 38vw, 380px)",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Image
        src="/ai/divider-grid-sun.png"
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-contain opacity-60 dark:opacity-80 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
      />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Player
          key={key}
          acknowledgeRemotionLicense
          component={HeroComposition}
          inputProps={{ name }}
          durationInFrames={HERO_DURATION_IN_FRAMES}
          fps={HERO_FPS}
          compositionWidth={1600}
          compositionHeight={600}
          style={{ width: "100%", height: "100%" }}
          autoPlay={!prefersReducedMotion}
          initialFrame={
            prefersReducedMotion ? HERO_DURATION_IN_FRAMES - 1 : undefined
          }
          controls={false}
          loop={false}
          clickToPlay={false}
          showVolumeControls={false}
          moveToBeginningWhenEnded={false}
        />
      </div>
    </button>
  );
}
