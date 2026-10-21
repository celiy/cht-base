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
 * Client folder whose optional `electron/main.ts` and `electron/preload.ts` get bundled in.
 */
const clientDir = process.env.CHT_CLIENT_DIR || "";

/**
 * Resolves `@client-electron/<main|preload>` to the client hook, or to an empty module
 * when the client has none.
 */
const clientHooksPlugin = {
    name: "client-electron-hooks",
    setup(build) {
        build.onResolve({ filter: /^@client-electron\/(main|preload)$/ }, (args) => {
            const hook = args.path.split("/")[1];
            const candidates = clientDir
                ? [".ts", ".mts", ".js", ".mjs"].map((ext) =>
                      path.join(clientDir, "electron", `${hook}${ext}`)
                  )
                : [];
            const file = candidates.find((candidate) => fs.existsSync(candidate));

            return file ? { path: file } : { path: args.path, namespace: "client-electron-empty" };
        });

        build.onLoad({ filter: /.*/, namespace: "client-electron-empty" }, () => ({
            contents: "export {};",
            loader: "js"
        }));
    }
};

/**
 * The shared build options
 */
const shared = {
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    sourcemap: true,
    external: ["electron"],
    plugins: [clientHooksPlugin]
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
