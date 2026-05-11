import Image from "next/image";
import { artSrc, hasArt } from "./has-art";

/**
 * Wide thin decorative band between sections. Renders the AI accent if
 * generated; otherwise falls back to an inline synthwave SVG grid so the
 * site still looks intentional without running the generation script.
 *
 * Kept low-opacity by default — this is supposed to whisper, not shout.
 */
export function DecorDivider({ className = "" }: { className?: string }) {
  const id = "divider-grid-sun";
  return (
    <div
      aria-hidden
      className={`relative mx-auto h-12 w-full max-w-3xl select-none ${className}`}
    >
      {hasArt(id) ? (
        <Image
          src={artSrc(id)}
          alt=""
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-contain opacity-60 dark:opacity-80 mix-blend-multiply dark:mix-blend-screen"
          priority={false}
        />
      ) : (
        <FallbackGridSun />
      )}
    </div>
  );
}

function FallbackGridSun() {
  return (
    <svg
      viewBox="0 0 768 96"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full opacity-60"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="dec-sun" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--signal)" />
          <stop offset="100%" stopColor="var(--flame)" />
        </linearGradient>
        <linearGradient id="dec-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--border)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--border)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--border)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Half-sun centered */}
      <circle cx="384" cy="60" r="22" fill="url(#dec-sun)" opacity="0.85" />

      {/* Thin perspective grid lines, faded at edges */}
      <g stroke="url(#dec-fade)" strokeWidth="1" fill="none">
        <line x1="0" y1="60" x2="768" y2="60" />
        <line x1="80" y1="60" x2="240" y2="96" />
        <line x1="200" y1="60" x2="320" y2="96" />
        <line x1="320" y1="60" x2="384" y2="96" />
        <line x1="448" y1="60" x2="448" y2="96" />
        <line x1="568" y1="60" x2="528" y2="96" />
        <line x1="688" y1="60" x2="608" y2="96" />
      </g>
    </svg>
  );
}
