/* Build wrapper. Exists only because `SITE_URL=... eleventy` is POSIX shell
   syntax and this repo is driven from Windows, where npm runs scripts through
   cmd.exe. Node sets the variable itself, so one script works everywhere,
   including Cloudflare's Linux build image.

   Usage:  node scripts/build.mjs            production, canonical domain
           node scripts/build.mjs --preview  workers.dev preview, noindex   */
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const PREVIEW_HOST = "https://findingbalancepllc.daveg-689.workers.dev";
const preview = process.argv.includes("--preview");

fs.rmSync("dist", { recursive: true, force: true });

const env = { ...process.env };
if (preview) env.SITE_URL = PREVIEW_HOST;
else delete env.SITE_URL;

const result = spawnSync("npx", ["eleventy"], { stdio: "inherit", env, shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);

console.log(preview
  ? `\nPreview build: ${PREVIEW_HOST}, noindex, robots.txt disallows everything.`
  : "\nProduction build: canonical domain, indexable.");
