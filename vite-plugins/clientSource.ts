import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { loadConfig, resolveClientDir } from "../configs";

const PLUGIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(PLUGIN_DIR, "..");
const STYLE_CSS = path.join(BASE_DIR, "src", "css", "style.css");
const SOURCE_DIRECTIVE = '@source "virtual:client-source";';

/**
 * CSS paths always use forward slashes, including on Windows.
 *
 * @param value Absolute path.
 * @returns Path with `/` separators.
 */
function toPosix(value: string): string {
    return value.split(path.sep).join("/");
}

/**
 * Registers the directory of the client being built as a Tailwind source.
 *
 * A glob such as `cht-client-*` does not expand: `*` inside a directory segment
 * silently matches nothing, so classes used only by the client never reach the
 * bundle. Resolving the active client here keeps the scan exact — it also avoids
 * pulling classes from the other clients into the stylesheet.
 *
 * Without `CLIENT` the build targets `src/devApp`, which `@source "../../"`
 * already covers, so the directive is dropped.
 */
export function clientSourcePlugin(): Plugin {
    return {
        name: "client-source",
        enforce: "pre",

        transform(code, id) {
            if (!id.endsWith("/src/css/style.css") || !code.includes(SOURCE_DIRECTIVE)) {
                return undefined;
            }

            const clientName = process.env.CLIENT;
            const clientConfig = clientName ? loadConfig(clientName) : null;

            if (!clientConfig) {
                return { code: code.replace(SOURCE_DIRECTIVE, ""), map: null };
            }

            const sourceDir = path.resolve(BASE_DIR, "..", resolveClientDir(clientConfig), "src");
            const relative = toPosix(path.relative(path.dirname(STYLE_CSS), sourceDir));

            return {
                code: code.replace(SOURCE_DIRECTIVE, `@source ${JSON.stringify(relative)};`),
                map: null
            };
        }
    };
}
