/**
 * The client Tailwind plugin module
 * This module is responsible for wiring optional client Tailwind plugins into the base stylesheet of the project.
 */

import type { Plugin } from "vite";
import {
    CLIENT_TAILWIND_PLUGIN_FILENAME,
    resolveClientSrcFileRelativeToStyle
} from "./clientStylePaths";

const PLUGIN_DIRECTIVE = '@plugin "virtual:client-tailwind-plugin";';

/**
 * Injects `@plugin` for `<client>/src/tailwind.plugin.js` when that file exists.
 * Dropped when there is no CLIENT or no plugin file (docs / lab).
 */
export function clientTailwindPlugin(): Plugin {
    return {
        name: "client-tailwind-plugin",
        enforce: "pre",

        transform(code, id) {
            if (!id.endsWith("/src/css/style.css") || !code.includes(PLUGIN_DIRECTIVE)) {
                return undefined;
            }

            const relative = resolveClientSrcFileRelativeToStyle(CLIENT_TAILWIND_PLUGIN_FILENAME);

            if (!relative) {
                return { code: code.replace(PLUGIN_DIRECTIVE, ""), map: null };
            }

            return {
                code: code.replace(PLUGIN_DIRECTIVE, `@plugin ${JSON.stringify(relative)};`),
                map: null
            };
        }
    };
}
