#!/usr/bin/env node
/**
 * The build script
 * This script is responsible for building the main and preload files for the electron app.
 */

import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * The directory of the script
 */
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "..", "electron-dist");

/**
 * The output directory
 */
fs.mkdirSync(outDir, { recursive: true });

/**
 * The shared build options
 */
const shared = {
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    sourcemap: true,
    external: ["electron"]
};

/**
 * Build the main file
 */
await esbuild.build({
    ...shared,
    entryPoints: [path.join(here, "main.ts")],
    outfile: path.join(outDir, "main.cjs")
});

/**
 * Build the preload file
 */
await esbuild.build({
    ...shared,
    entryPoints: [path.join(here, "preload.ts")],
    outfile: path.join(outDir, "preload.cjs")
});

console.log(`[electron] Compiled main and preload to ${path.relative(process.cwd(), outDir)}`);
