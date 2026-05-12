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
 * Beats (30fps, 90 frames total):
 *   0–24   Name letters assemble from a vertical offset + blur.
 *   18–36  Tag row fades in below the name.
 *   30–60  Tags cycle through roles; last tag lands.
 *   42–72  Signal-color underline sweeps left-to-right under the name.
 *   60–90  A thin mono-style "currently:" caption fades in at top-left.
 */

export const HERO_DURATION_IN_FRAMES = 90;
export const HERO_FPS = 30;

const TAGS = ["engineer", "designer-adjacent", "product-minded", "builder"];

export type HeroProps = {
  name: string;
};

export const HeroComposition: React.FC<HeroProps> = ({ name }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const letters = name.split("");

  const tagIndex = Math.min(
    Math.floor(
      interpolate(frame, [30, 60], [0, TAGS.length - 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
    TAGS.length - 1,
  );

  const underlineProgress = interpolate(frame, [42, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fontSize = Math.min(width * 0.14, 220);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "56px 80px",
      }}
    >
      {/* Top-left small caption */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: Math.min(width * 0.018, 18),
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          opacity: captionOpacity,
          marginBottom: "auto",
        }}
      >
        <span style={{ color: "var(--signal)" }}>●</span>{" "}
        <span>portfolio · v3 · 2026</span>
      </div>

      {/* Name + underline */}
      <div
        style={{
          fontFamily: "var(--font-display), serif",
          fontSize,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          fontStyle: "italic",
          position: "relative",
          display: "inline-block",
        }}
      >
        {letters.map((char, i) => {
          const enter = spring({
            frame: frame - i * 2,
            fps,
            config: { damping: 22, stiffness: 130, mass: 0.7 },
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translateY(${interpolate(enter, [0, 1], [28, 0])}px)`,
                opacity: enter,
                filter: `blur(${interpolate(enter, [0, 1], [8, 0])}px)`,
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </span>
          );
        })}

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -10,
            height: 8,
            backgroundColor: "var(--signal)",
            transformOrigin: "left center",
            transform: `scaleX(${underlineProgress})`,
            borderRadius: 1,
          }}
        />
      </div>

      {/* Cycling tag */}
      <div
        style={{
          marginTop: 28,
          fontFamily: "var(--font-mono), monospace",
          fontSize: Math.min(width * 0.018, 18),
          letterSpacing: "0.06em",
          color: "var(--muted-foreground)",
          opacity: interpolate(frame, [18, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          textTransform: "lowercase",
        }}
      >
        <span style={{ color: "var(--foreground)" }}>{TAGS[tagIndex]}</span>
        <span style={{ marginLeft: 12, opacity: 0.5 }}>
          / {tagIndex + 1} of {TAGS.length}
        </span>
      </div>
    </AbsoluteFill>
  );
};
