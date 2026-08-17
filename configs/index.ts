import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ClientConfig } from "./types";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(HERE, "..", "..");
const CLIENT_DIR_PREFIX = "cht-client-";
const CLIENT_CONFIG_FILE = "cht.config.json";

/**
 * Apply the monorepo convention `cht-client-<name>` when `clientDir`
 * is not explicitly set on the config.
 */
export function resolveClientDir(cfg: ClientConfig): string {
    return cfg.clientDir || `${CLIENT_DIR_PREFIX}${cfg.name}`;
}

function listDiscoveredClientNames(): string[] {
    if (!fs.existsSync(WORKSPACE_ROOT)) {
        return [];
    }

    const names: string[] = [];

    for (const entry of fs.readdirSync(WORKSPACE_ROOT, { withFileTypes: true })) {
        if (!entry.isDirectory() || !entry.name.startsWith(CLIENT_DIR_PREFIX)) {
            continue;
        }

        const name = entry.name.slice(CLIENT_DIR_PREFIX.length);

        if (!name) {
            continue;
        }

        const configPath = path.join(WORKSPACE_ROOT, entry.name, CLIENT_CONFIG_FILE);

        if (fs.existsSync(configPath)) {
            names.push(name);
        }
    }

    return names.sort();
}

/**
 * Load a client config by name from `cht-client-<name>/cht.config.json`.
 * Returns null when no client is active (base dev mode).
 */
export function loadConfig(name: string | undefined | null): ClientConfig | null {
    if (!name) {
        return null;
    }

    const clientDir = `${CLIENT_DIR_PREFIX}${name}`;
    const configPath = path.join(WORKSPACE_ROOT, clientDir, CLIENT_CONFIG_FILE);

    if (!fs.existsSync(configPath)) {
        const known = listDiscoveredClientNames().join(", ") || "(none)";

        throw new Error(
            `[configs] Client config not found: "${name}" (${configPath}). Known clients: ${known}`
        );
    }

    const raw = fs.readFileSync(configPath, "utf8");
    let parsed: ClientConfig;

    try {
        parsed = JSON.parse(raw) as ClientConfig;
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        throw new Error(`[configs] Invalid JSON in ${configPath}: ${message}`);
    }

    const configName = parsed.name || name;

    if (configName !== name) {
        throw new Error(
            `[configs] Config name "${configName}" does not match folder suffix "${name}" (${clientDir}).`
        );
    }

    return {
        ...parsed,
        name: configName,
        siteTitle: parsed.siteTitle || name,
        clientDir: parsed.clientDir || clientDir
    };
}

export type { ClientConfig } from "./types";
