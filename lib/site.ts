export const site = {
  name: "Parker Feirstein",
  positioning:
    "Full-stack engineer. Obsessed with the craft gap between “works” and “feels great.”",
  tagline: "builder · engineer · product-minded",
  email: "pfeirstein@gmail.com",
  // TODO(parker): fill in real handles
  socials: {
    github: "https://github.com/pfeirstein",
    x: "",
    linkedin: "",
  },
  url: "https://portfolio.vercel.app",
} as const;

export type Site = typeof site;
