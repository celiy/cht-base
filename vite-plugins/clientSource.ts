/**
 * The client source plugin module
 * This module is responsible for the client source plugin of the project.
 */

import type { Plugin } from "vite";
import { resolveActiveClientSrcDir, STYLE_CSS, toPosix } from "./clientStylePaths";
import path from "node:path";

const SOURCE_DIRECTIVE = '@source "virtual:client-source";';

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

            const sourceDir = resolveActiveClientSrcDir();

            if (!sourceDir) {
                return { code: code.replace(SOURCE_DIRECTIVE, ""), map: null };
            }

            const relative = toPosix(path.relative(path.dirname(STYLE_CSS), sourceDir));

            return {
                code: code.replace(SOURCE_DIRECTIVE, `@source ${JSON.stringify(relative)};`),
                map: null
            };
        }
    };
}
