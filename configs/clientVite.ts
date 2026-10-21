/**
 * The client Vite config module
 * This module is responsible for loading the optional Vite config of the active client.
 */

import fs from "node:fs";
import path from "node:path";
import { loadConfigFromFile } from "vite";
import type { ConfigEnv, UserConfig } from "vite";

/** Filenames tried in order at the client root. The first that exists wins. */
export const CLIENT_VITE_CONFIG_FILENAMES = [
    "vite.config.ts",
    "vite.config.mts",
    "vite.config.js",
    "vite.config.mjs"
];

/**
 * Loads `<client>/vite.config.*` so the client can add plugins, aliases, `define`, `build`, etc.
 * The caller merges it over the base config with `mergeConfig`.
 *
 * @param clientDirPath Absolute client folder
 * @param env The Vite config env (`command`, `mode`)
 * @returns The client config, or `null` when the client has none
 */
export async function loadClientViteConfig(
    clientDirPath: string,
    env: ConfigEnv
): Promise<UserConfig | null> {
    const configFile = CLIENT_VITE_CONFIG_FILENAMES.map((name) => path.join(clientDirPath, name)).find(
        (file) => fs.existsSync(file)
    );

    if (!configFile) {
        return null;
    }

    const loaded = await loadConfigFromFile(env, configFile, clientDirPath);

    return loaded?.config ?? null;
}
