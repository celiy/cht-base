/**
 * The client theme plugin module
 * This module is responsible for the client theme plugin of the project.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { loadConfig } from "../configs";
import type { ClientThemeConfig } from "../configs/theme/types";
import { generateClientThemeCss } from "../configs/theme/generateThemeCss";
import { resolveThemeFromSources } from "../configs/theme/mergeTheme";

const THEME_IMPORT = '@import "virtual:client-theme";';
const DEV_THEME_CONFIG = path.join("src", "devApp", "theme.config.json");
const PLUGIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(PLUGIN_DIR, "..");
const STYLE_CSS = path.join(BASE_DIR, "src", "css", "style.css");

/**
 * Reads a JSON file
 * @param {string} filePath The file path
 * @returns {T | undefined} The JSON file
 * @param {string} filePath
 */
function readJsonFile<T>(filePath: string): T | undefined {
    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
    } catch {
        return undefined;
    }
}

/**
 * Loads the development theme config
 * @param {string} baseDir The base directory
 * @param {string | undefined} clientName The client name
 * @returns {ClientThemeConfig | undefined} The development theme config
 */
function loadDevThemeConfig(baseDir: string, clientName: string | undefined): ClientThemeConfig | undefined {
    if (clientName) {
        return undefined;
    }

    return readJsonFile<ClientThemeConfig>(path.join(baseDir, DEV_THEME_CONFIG));
}

/**
 * Gets the client config path
 * @param {string} baseDir The base directory
 * @param {string | undefined} clientName The client name
 * @returns {string | null} The client config path
 */
function getClientConfigPath(baseDir: string, clientName: string | undefined): string | null {
    if (!clientName) {
        return null;
    }

    const clientConfig = loadConfig(clientName);

    if (!clientConfig) {
        return null;
    }

    return path.join(baseDir, "..", clientConfig.clientDir ?? `cht-client-${clientName}`, "cht.config.json");
}

/**
 * The client theme plugin
 * @returns {Plugin} The client theme plugin
 */
export function clientThemePlugin(): Plugin {
    let generatedCss = "";
    let watchFiles: string[] = [];

    /**
     * Builds the theme
     * @param {string | undefined} clientName The client name
     * @returns {ClientThemeConfig} The resolved theme
     */
    const buildTheme = (clientName: string | undefined): ClientThemeConfig => {
        const clientConfig = clientName ? loadConfig(clientName) : null;
        const devThemeConfig = loadDevThemeConfig(BASE_DIR, clientName);
        const resolvedTheme = resolveThemeFromSources(clientConfig, devThemeConfig);

        generatedCss = generateClientThemeCss(resolvedTheme);

        const clientConfigPath = getClientConfigPath(BASE_DIR, clientName);

        watchFiles = [
            STYLE_CSS,
            path.join(BASE_DIR, "configs", "theme", "defaults.ts"),
            path.join(BASE_DIR, "configs", "theme", "mergeTheme.ts"),
            path.join(BASE_DIR, "configs", "theme", "generateThemeCss.ts"),
            path.join(BASE_DIR, "configs", "theme", "generateUtilities.ts"),
            path.join(BASE_DIR, DEV_THEME_CONFIG)
        ];

        if (clientConfigPath) {
            watchFiles.push(clientConfigPath);
        }

        return resolvedTheme;
    };

    return {
        name: "client-theme",
        enforce: "pre",

        /**
         * Configures the plugin
         * @returns {Config} The plugin config
         */
        config() {
            const clientName = process.env.CLIENT;
            const clientConfig = clientName ? loadConfig(clientName) : null;
            const devThemeConfig = loadDevThemeConfig(BASE_DIR, clientName);
            const resolvedTheme = resolveThemeFromSources(clientConfig, devThemeConfig);
            const storageKey = clientName ? `cht-theme:${clientName}` : "cht-theme:dev";

            buildTheme(clientName);

            return {
                define: {
                    "import.meta.env.VITE_DEFAULT_THEME": JSON.stringify(resolvedTheme.defaultTheme),
                    "import.meta.env.VITE_AVAILABLE_THEMES": JSON.stringify(resolvedTheme.availableThemes),
                    "import.meta.env.VITE_THEME_STORAGE_KEY": JSON.stringify(storageKey)
                }
            };
        },

        /**
         * Transforms the code
         * @param {string} code The code
         * @param {string} id The file ID
         * @returns {string | undefined} The transformed code
         */
        transform(code, id) {
            if (!id.endsWith("/src/css/style.css") || !code.includes(THEME_IMPORT)) {
                return undefined;
            }

            if (!generatedCss) {
                buildTheme(process.env.CLIENT);
            }

            return {
                code: code.replace(THEME_IMPORT, generatedCss),
                map: null
            };
        },

        /**
         * Handles the hot update
         * @param {string} file The file
         * @param {Server} server The server
         * @returns {Array<{type: string}>} The hot update
         */
        handleHotUpdate({ file, server }) {
            if (!watchFiles.includes(file)) {
                return undefined;
            }

            buildTheme(process.env.CLIENT);

            const styleModule = server.moduleGraph.getModulesByFile(STYLE_CSS)?.values().next().value;

            if (styleModule) {
                server.reloadModule(styleModule);
            }

            return [];
        },

        /**
         * Configures the server
         * @param {Server} server The server
         * @returns {void}
         */
        configureServer(server) {
            watchFiles.forEach((file) => {
                server.watcher.add(file);
            });
        }
    };
}
