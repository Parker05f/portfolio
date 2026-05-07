/**
 * Decorative-accent prompts for the portfolio.
 *
 * Aesthetic: retro-futurist / vaporwave — synthwave grids, chrome geometry,
 * gradient suns, soft scanlines. SMALL accents only: dividers, spot
 * illustrations, footer ornaments. The site stays restrained; the AI art
 * earns its place by being specific and well-cropped.
 *
 * Output: public/ai/<id>.png
 *
 * gpt-image-1 supported sizes: 1024x1024, 1024x1536, 1536x1024.
 * Backgrounds: "transparent" lets us float pieces over the warm/dark surfaces
 * without fighting the existing palette.
 */

export const manifest = [
  {
    id: "divider-grid-sun",
    size: "1536x1024",
    background: "transparent",
    quality: "high",
    prompt:
      "Wide horizontal vaporwave decorative ornament, transparent background. " +
      "A thin neon-pink and cyan perspective grid stretching to a horizon, with " +
      "a small chartreuse-to-coral gradient half-sun cresting the horizon. " +
      "Faint scanlines, soft chromatic aberration. Centered, symmetric, looks " +
      "like a divider between page sections. No text, no logos, no people. " +
      "Crisp 80s-computing vector look — not photorealistic. Composition " +
      "leaves generous empty space top and bottom so it sits as a slim band.",
  },
  {
    id: "spot-chrome-shape",
    size: "1024x1024",
    background: "transparent",
    quality: "high",
    prompt:
      "Single chrome-and-magenta retro-futurist geometric ornament, transparent " +
      "background. A tilted chrome torus or twisted ribbon catching neon pink " +
      "and cyan reflections, faint gradient haze, no environment, no shadow on " +
      "ground. Clean centered composition with breathing room. 80s-album-cover " +
      "energy but minimal — one object, not a busy scene. No text.",
  },
  {
    id: "spot-palm-grid",
    size: "1024x1024",
    background: "transparent",
    quality: "high",
    prompt:
      "Small vaporwave spot illustration, transparent background. A single " +
      "wireframe palm tree silhouette in cyan over a faint magenta grid floor, " +
      "compact composition centered in the frame. Thin clean lines, no " +
      "photorealism, no text, no extra decoration. Reads as a tiny ornament " +
      "next to a paragraph, not a hero image.",
  },
  {
    id: "footer-band",
    size: "1536x1024",
    background: "transparent",
    quality: "high",
    prompt:
      "Wide thin footer ornament band, transparent background. Subtle " +
      "horizontal synthwave gradient strip — magenta to cyan — overlaid with " +
      "tiny pixel stars and a faint scanline texture. Extremely minimal, sits " +
      "as a 6%-opacity-feeling decoration. No text, no characters, no logos. " +
      "Composition heavy bottom edge, lots of empty space above so the band is " +
      "visually thin.",
  },
];
