import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { loadConfig, resolveClientDir } from "../configs";

const PLUGIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(PLUGIN_DIR, "..", "..");

function resolveClientFaviconPath(clientName: string | undefined): string | null {
    if (!clientName) {
        return null;
    }

    const cfg = loadConfig(clientName);
    const clientDir = path.resolve(WORKSPACE_ROOT, resolveClientDir(cfg));
    const candidates = [
        path.join(clientDir, "build", "icon.png"),
        path.join(clientDir, "src", "assets", "logo.png")
    ];

    return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

export function clientFaviconPlugin(): Plugin {
    let faviconPath: string | null = null;
    let base = "/";

    return {
        name: "client-favicon",

        configResolved(config) {
            base = config.base;
            faviconPath = resolveClientFaviconPath(process.env.CLIENT);
        },

        transformIndexHtml(html) {
            if (!faviconPath) {
                return html;
            }

            const normalizedBase = base.endsWith("/") ? base : `${base}/`;
            const href = `${normalizedBase}favicon.png`.replace(/\/\.\//g, "/");
            const link = `<link rel="icon" type="image/png" href="${href}" />`;

            if (html.includes('rel="icon"')) {
                return html.replace(/<link rel="icon"[^>]*>/, link);
            }

            return html.replace("</head>", `    ${link}\n  </head>`);
        },

        configureServer(server) {
            if (!faviconPath) {
                return;
            }

            server.middlewares.use((req, res, next) => {
                const pathname = req.url?.split("?")[0];

                if (pathname !== "/favicon.png" && pathname !== "/favicon.ico") {
                    next();
                    return;
                }

                res.setHeader("Content-Type", "image/png");
                fs.createReadStream(faviconPath!).pipe(res);
            });
        },

        generateBundle() {
            if (!faviconPath) {
                return;
            }

            this.emitFile({
                type: "asset",
                fileName: "favicon.png",
                source: fs.readFileSync(faviconPath)
            });
        }
    };
}
