/**
 * The Freedom Lab Vite config module
 * This module is responsible for the client-owned Vite config merged over cht-base.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import wasm from "vite-plugin-wasm";

const CLIENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const LAB_INFO_ID = "virtual:lab-info";

/**
 * Inline plugin: a virtual module plus an `index.html` rewrite.
 * @returns {Plugin} The plugin
 */
function labPlugin(): Plugin {
    return {
        name: "freedom-lab",

        resolveId(id) {
            return id === LAB_INFO_ID ? `\0${LAB_INFO_ID}` : undefined;
        },

        load(id) {
            if (id !== `\0${LAB_INFO_ID}`) {
                return undefined;
            }

            return `export default ${JSON.stringify({ plugin: "freedom-lab", builtAt: new Date().toISOString() })};`;
        },

        transformIndexHtml(html) {
            return html
                .replace("<html lang=\"en\">", "<html lang=\"pt-BR\">")
                .replace("</head>", "    <meta name=\"theme-color\" content=\"#6d28d9\" />\n</head>");
        }
    };
}

export default defineConfig({
    plugins: [wasm(), labPlugin()],
    resolve: {
        alias: {
            "@lab": path.join(CLIENT_DIR, "src", "lab")
        }
    },
    define: {
        __LAB_DEFINE__: JSON.stringify("define do cliente")
    },
    worker: {
        format: "es"
    },
    build: {
        // vite-plugin-wasm needs top-level await.
        target: "esnext"
    }
});
