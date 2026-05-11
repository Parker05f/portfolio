/**
 * Decorative-accent prompts for the portfolio.
 *
 * Aesthetic: retro-futurist linework, dialed to the site's actual palette
 * (warm cream/parchment surface + deep ink, chartreuse-lime signal, coral
 * flame accent). NOT magenta-and-cyan vaporwave — that clashed with the
 * warm cream. Pieces should read as ornament/line-art, not full scenes.
 *
 * Output: public/ai/<id>.png (transparent backgrounds).
 *
 * gpt-image-1 supported sizes: 1024x1024, 1024x1536, 1536x1024.
 */

const PALETTE = [
  "STRICT palette: only these colors are allowed —",
  "chartreuse lime green (#cdf24a-like), warm coral (#f08367-like),",
  "deep ink charcoal (#21222b-like) for line strokes, and the implicit",
  "transparent background. Absolutely no magenta, no cyan, no purple,",
  "no neon pink, no dark navy fills.",
].join(" ");

const STYLE = [
  "Style: thin clean linework, retro-futurist ornament, hand-drawn",
  "vector feel, no photoreal rendering, no gradients except a single",
  "subtle chartreuse-to-coral wash on the sun/light source.",
  "Composition: minimal — one or two simple shapes with lots of empty",
  "transparent space. This is a tiny decoration sitting next to text,",
  "not a hero image.",
].join(" ");

const RULES = [
  "MUST be transparent PNG — no rectangular background fill of any color.",
  "MUST have generous empty space around the subject.",
  "Do not add text, logos, watermarks, or signatures.",
  "Do not add people, characters, or faces.",
].join(" ");

export const manifest = [
  {
    id: "divider-grid-sun",
    size: "1536x1024",
    background: "transparent",
    quality: "high",
    prompt: [
      "Slim horizontal ornamental divider, transparent background.",
      "A thin one-point-perspective grid in deep-ink charcoal strokes",
      "stretching to a centered horizon line, with a small half-sun",
      "cresting the horizon — the sun has a soft chartreuse-to-coral",
      "gradient fill, everything else is line only.",
      "The composition is a wide thin band: the subject occupies only",
      "the middle vertical third, with empty transparent space above",
      "and below so it sits as a quiet divider, not a poster.",
      PALETTE,
      STYLE,
      RULES,
    ].join(" "),
  },
  {
    id: "spot-chrome-shape",
    size: "1024x1024",
    background: "transparent",
    quality: "high",
    prompt: [
      "Single tilted ring ornament centered in a square frame,",
      "transparent background. A clean elliptical band drawn in",
      "deep-ink charcoal linework, with a soft chartreuse-to-coral",
      "gradient fill inside the band only — like a planet ring viewed",
      "at an angle. No environment, no shadow, no extra geometry.",
      "Lots of empty transparent space around the ring.",
      PALETTE,
      STYLE,
      RULES,
    ].join(" "),
  },
  {
    id: "spot-palm-grid",
    size: "1024x1024",
    background: "transparent",
    quality: "high",
    prompt: [
      "Tiny ornamental palm-and-grid spot, transparent background.",
      "A single small wireframe palm tree drawn in deep-ink charcoal",
      "thin strokes, standing on a faint chartreuse perspective grid",
      "floor. The whole subject occupies only the center 50% of the",
      "frame, surrounded by empty transparent space. Linework only —",
      "no fills except a tiny coral dot for a setting sun behind the",
      "palm.",
      PALETTE,
      STYLE,
      RULES,
    ].join(" "),
  },
  {
    id: "footer-band",
    size: "1536x1024",
    background: "transparent",
    quality: "high",
    prompt: [
      "Very thin horizontal footer ornament, transparent background.",
      "A subtle chartreuse-to-coral gradient hairline running across",
      "the middle of the frame, with a sparse scatter of tiny pixel",
      "stars in deep-ink charcoal above and below it. Extremely",
      "minimal — feels like a 1px decorative rule with a few dots,",
      "not an image. Heavy empty transparent space top and bottom.",
      PALETTE,
      STYLE,
      RULES,
    ].join(" "),
  },
];
