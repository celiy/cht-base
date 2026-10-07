/**
 * The client style directives module
 * This module is responsible for mapping the active client src folder into Tailwind CSS of the project.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig, resolveClientDir } from "../configs";

const PLUGIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(PLUGIN_DIR, "..");
const STYLE_CSS = path.join(BASE_DIR, "src", "css", "style.css");
const CLIENT_TAILWIND_PLUGIN_FILENAME = "tailwind.plugin.js";

/**
 * Converts a path to a POSIX path
 * @param {string} value The value
 * @returns {string} The POSIX path
 */
export function toPosix(value: string): string {
    return value.split(path.sep).join("/");
}

/**
 * Resolves the active client's `src` directory when `CLIENT` is set.
 *
 * @returns {string | null} Absolute client src path
 */
export function resolveActiveClientSrcDir(): string | null {
    const clientName = process.env.CLIENT;
    const clientConfig = clientName ? loadConfig(clientName) : null;

    if (!clientConfig) {
        return null;
    }

    return path.resolve(BASE_DIR, "..", resolveClientDir(clientConfig), "src");
}

/**
 * Relative POSIX path from `style.css` to a file under the active client.
 *
 * @param {string} filename File in `src/`
 * @returns {string | null} Relative path, or null when missing
 */
export function resolveClientSrcFileRelativeToStyle(filename: string): string | null {
    const sourceDir = resolveActiveClientSrcDir();

    if (!sourceDir) {
        return null;
    }

    const abs = path.join(sourceDir, filename);

    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
        return null;
    }

    return toPosix(path.relative(path.dirname(STYLE_CSS), abs));
}

export { STYLE_CSS, CLIENT_TAILWIND_PLUGIN_FILENAME };
