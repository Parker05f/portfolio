import { existsSync } from "node:fs";
import { join } from "node:path";

const publicDir = join(process.cwd(), "public");

export function hasArt(id: string): boolean {
  return existsSync(join(publicDir, "ai", `${id}.png`));
}

export function artSrc(id: string): string {
  return `/ai/${id}.png`;
}
