#!/usr/bin/env node
import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "..", "electron-dist");

fs.mkdirSync(outDir, { recursive: true });

const shared = {
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    sourcemap: true,
    external: ["electron"]
};

await esbuild.build({
    ...shared,
    entryPoints: [path.join(here, "main.ts")],
    outfile: path.join(outDir, "main.cjs")
});

await esbuild.build({
    ...shared,
    entryPoints: [path.join(here, "preload.ts")],
    outfile: path.join(outDir, "preload.cjs")
});

console.log(`[electron] Compiled main and preload to ${path.relative(process.cwd(), outDir)}`);
