import Image from "next/image";
import { artSrc, hasArt } from "./has-art";

type Variant = "chrome" | "palm";

const idByVariant: Record<Variant, string> = {
  chrome: "spot-chrome-shape",
  palm: "spot-palm-grid",
};

/**
 * Small square spot illustration — sits next to a paragraph or in a corner.
 * Uses the AI accent if available; otherwise inline SVG. Default size is
 * conservative — bump via className when needed.
 */
export function DecorSpot({
  variant = "chrome",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const id = idByVariant[variant];
  return (
    <div
      aria-hidden
      className={`relative aspect-square w-24 select-none sm:w-28 ${className}`}
    >
      {hasArt(id) ? (
        <Image
          src={artSrc(id)}
          alt=""
          fill
          sizes="112px"
          className="object-contain opacity-90"
        />
      ) : variant === "chrome" ? (
        <FallbackChrome />
      ) : (
        <FallbackPalm />
      )}
    </div>
  );
}

function FallbackChrome() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full opacity-80">
      <defs>
        <linearGradient id="spot-chrome" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--signal)" />
          <stop offset="100%" stopColor="var(--flame)" />
        </linearGradient>
      </defs>
      {/* Tilted ring */}
      <ellipse
        cx="50"
        cy="50"
        rx="34"
        ry="14"
        fill="none"
        stroke="url(#spot-chrome)"
        strokeWidth="2.5"
        transform="rotate(-22 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="22"
        ry="9"
        fill="none"
        stroke="var(--foreground)"
        strokeOpacity="0.5"
        strokeWidth="1"
        transform="rotate(-22 50 50)"
      />
    </svg>
  );
}

function FallbackPalm() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full opacity-80">
      <defs>
        <linearGradient id="spot-palm" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--flame)" />
          <stop offset="100%" stopColor="var(--signal)" />
        </linearGradient>
      </defs>
      <g stroke="url(#spot-palm)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* Trunk */}
        <path d="M50 80 L50 50" />
        {/* Fronds */}
        <path d="M50 50 Q40 40 26 36" />
        <path d="M50 50 Q60 40 74 36" />
        <path d="M50 50 Q42 38 36 28" />
        <path d="M50 50 Q58 38 64 28" />
        <path d="M50 50 Q50 36 50 24" />
      </g>
      {/* Grid floor */}
      <g stroke="var(--border)" strokeWidth="0.5" opacity="0.7">
        <line x1="6" y1="84" x2="94" y2="84" />
        <line x1="14" y1="92" x2="86" y2="92" />
      </g>
    </svg>
  );
}
