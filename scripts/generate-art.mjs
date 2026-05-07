#!/usr/bin/env node
/**
 * Generate decorative AI accent images via OpenAI gpt-image-1.
 *
 * Reads prompts from `scripts/art-manifest.mjs`, calls the Images API,
 * and writes PNGs to `public/ai/<id>.png`. Idempotent: skips any file
 * that already exists. Use `--force` to regenerate.
 *
 * Required env: OPENAI_API_KEY (loaded from .env.local if present).
 *
 *   npm run generate:art
 *   npm run generate:art -- --force
 *   npm run generate:art -- --only=divider-grid-sun,spot-chrome-shape
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { manifest } from "./art-manifest.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const outDir = join(repoRoot, "public", "ai");

function loadDotEnvLocal() {
  const path = join(repoRoot, ".env.local");
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function parseArgs(argv) {
  const flags = { force: false, only: null };
  for (const arg of argv.slice(2)) {
    if (arg === "--force") flags.force = true;
    else if (arg.startsWith("--only=")) {
      flags.only = new Set(
        arg
          .slice("--only=".length)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    }
  }
  return flags;
}

async function generateOne(item, apiKey) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: item.prompt,
      size: item.size,
      background: item.background ?? "auto",
      quality: item.quality ?? "high",
      n: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body}`);
  }

  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data in response");
  return Buffer.from(b64, "base64");
}

async function main() {
  loadDotEnvLocal();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error(
      "Missing OPENAI_API_KEY. Add it to .env.local (which is gitignored).",
    );
    process.exit(1);
  }

  const { force, only } = parseArgs(process.argv);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  let made = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of manifest) {
    if (only && !only.has(item.id)) continue;
    const outPath = join(outDir, `${item.id}.png`);
    if (existsSync(outPath) && !force) {
      console.log(`skip ${item.id} (exists)`);
      skipped += 1;
      continue;
    }
    process.stdout.write(`gen  ${item.id} (${item.size})... `);
    try {
      const buf = await generateOne(item, apiKey);
      writeFileSync(outPath, buf);
      console.log(`ok (${buf.length.toLocaleString()} bytes)`);
      made += 1;
    } catch (err) {
      console.log("fail");
      console.error(`  → ${err.message}`);
      failed += 1;
    }
  }

  console.log(`\ndone — ${made} made, ${skipped} skipped, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
