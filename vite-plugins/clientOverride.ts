import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { loadConfig, resolveClientDir } from "../configs";

const PLUGIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(PLUGIN_DIR, "..");
const WORKSPACE_ROOT = path.resolve(BASE_DIR, "..");
const OVERRIDE_DEV_URL = "/__client-override.css";
const OVERRIDE_BUILD_FILE = "client-override.css";

function resolveOverridePath(clientName: string | undefined): string | null {
    if (!clientName) {
        return null;
    }

    const clientConfig = loadConfig(clientName);

    if (!clientConfig) {
        return null;
    }

    const overridePath = path.join(
        WORKSPACE_ROOT,
        resolveClientDir(clientConfig),
        "src",
        "override.css"
    );

    return fs.existsSync(overridePath) ? overridePath : null;
}

/**
 * Serves the active client's `src/override.css` as a later stylesheet so
 * unlayered rules beat Tailwind `@layer utilities` without mutating the
 * compiled `style.css` JS module.
 */
export function clientOverridePlugin(): Plugin {
    let overridePath: string | null = null;
    let isBuild = false;

    const syncOverridePath = () => {
        overridePath = resolveOverridePath(process.env.CLIENT);
    };

    return {
        name: "client-override",
        enforce: "post",

        configResolved(config) {
            isBuild = config.command === "build";
            syncOverridePath();
        },

        configureServer(server) {
            syncOverridePath();

            if (overridePath) {
                server.watcher.add(overridePath);
            }

            server.middlewares.use((req, res, next) => {
                const url = req.url?.split("?")[0];

                if (url !== OVERRIDE_DEV_URL || !overridePath) {
                    next();
                    return;
                }

                res.setHeader("Content-Type", "text/css; charset=utf-8");
                res.setHeader("Cache-Control", "no-store");
                res.end(fs.readFileSync(overridePath, "utf8"));
            });
        },

        transformIndexHtml() {
            if (!overridePath) {
                return [];
            }

            const href = isBuild
                ? `./${OVERRIDE_BUILD_FILE}`
                : `${OVERRIDE_DEV_URL}?t=${fs.statSync(overridePath).mtimeMs}`;

            return [
                {
                    tag: "link",
                    attrs: {
                        rel: "stylesheet",
                        href
                    },
                    injectTo: "body"
                }
            ];
        },

        generateBundle() {
            if (!overridePath) {
                return;
            }

            this.emitFile({
                type: "asset",
                fileName: OVERRIDE_BUILD_FILE,
                source: fs.readFileSync(overridePath, "utf8")
            });
        },

        handleHotUpdate({ file, server }) {
            if (!overridePath || file !== overridePath) {
                return undefined;
            }

            server.ws.send({ type: "full-reload" });
            return [];
        }
    };
}
