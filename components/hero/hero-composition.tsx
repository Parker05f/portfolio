import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Hero composition — plays once, holds on final frame.
 *
 * Beats (at 30fps, ~90 frames total):
 *   0–20   Name letters assemble from a slight vertical offset + blur.
 *   15–40  Tag row slides in under the name.
 *   35–55  Tags cycle through roles; last tag ("builder") lands.
 *   45–90  Signal-color underline sweeps left-to-right under the name.
 */

export const HERO_DURATION_IN_FRAMES = 90;
export const HERO_FPS = 30;

const TAGS = ["engineer", "designer-adjacent", "product-minded", "builder"];

export type HeroProps = {
  name: string;
};

export const HeroComposition: React.FC<HeroProps> = ({ name }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Name letters animate in with staggered spring
  const letters = name.split("");

  // Tag cycling: each tag gets a window of ~6 frames at 30fps
  const tagIndex = Math.min(
    Math.floor(interpolate(frame, [30, 60], [0, TAGS.length - 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })),
    TAGS.length - 1,
  );

  // Underline sweep
  const underlineProgress = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <div
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: Math.min(width * 0.12, 160),
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            fontStyle: "italic",
            position: "relative",
            display: "inline-block",
          }}
        >
          {letters.map((char, i) => {
            const enter = spring({
              frame: frame - i * 1.5,
              fps,
              config: { damping: 20, stiffness: 120, mass: 0.6 },
            });
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  transform: `translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
                  opacity: enter,
                  filter: `blur(${interpolate(enter, [0, 1], [6, 0])}px)`,
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            );
          })}

          {/* Underline sweep in signal color */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -8,
              height: 6,
              backgroundColor: "var(--signal)",
              transformOrigin: "left center",
              transform: `scaleX(${underlineProgress})`,
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 28,
            fontFamily: "var(--font-mono), monospace",
            fontSize: Math.min(width * 0.02, 18),
            letterSpacing: "0.04em",
            color: "var(--muted-foreground)",
            opacity: interpolate(frame, [20, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textTransform: "uppercase",
          }}
        >
          <span>· {TAGS[tagIndex]} ·</span>
        </div>
      </div>

      {/* Height used purely to silence unused-var lint in the rare case. */}
      <span style={{ display: "none" }} aria-hidden>
        {height}
      </span>
    </AbsoluteFill>
  );
};
