import Image from "next/image";
import { artSrc, hasArt } from "./has-art";

/**
 * Thin gradient strip that sits at the very top of the footer. AI-generated
 * if available, otherwise an inline gradient with faint pixel stars.
 */
export function DecorFooterBand({ className = "" }: { className?: string }) {
  const id = "footer-band";
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative h-6 w-full overflow-hidden select-none ${className}`}
    >
      {hasArt(id) ? (
        <Image
          src={artSrc(id)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60 dark:opacity-80"
        />
      ) : (
        <FallbackBand />
      )}
    </div>
  );
}

function FallbackBand() {
  return (
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="h-full w-full opacity-70">
      <defs>
        <linearGradient id="band-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--flame)" stopOpacity="0" />
          <stop offset="20%" stopColor="var(--flame)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--signal)" stopOpacity="0.6" />
          <stop offset="80%" stopColor="var(--flame)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--flame)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="14" width="1200" height="2" fill="url(#band-grad)" />
      {/* Pixel stars */}
      <g fill="var(--foreground)" opacity="0.45">
        <rect x="120" y="6" width="2" height="2" />
        <rect x="280" y="3" width="2" height="2" />
        <rect x="440" y="8" width="2" height="2" />
        <rect x="610" y="2" width="2" height="2" />
        <rect x="780" y="7" width="2" height="2" />
        <rect x="930" y="4" width="2" height="2" />
        <rect x="1080" y="6" width="2" height="2" />
      </g>
    </svg>
  );
}
