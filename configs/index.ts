import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ClientConfig } from "./types";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(HERE, "..", "..");
const CLIENT_CONFIG_FILE = "cht.config.json";

const SKIP_DISCOVERY_DIRS = new Set([
    "node_modules",
    ".git",
    "cht-base",
    "cht-design-system",
    "cht-shared",
    "scripts",
    "builds",
    "dist"
]);

/**
 * Folder that contained `cht.config.json`. `clientDir` is filled by `loadConfig`.
 */
export function resolveClientDir(cfg: ClientConfig): string {
    if (cfg.clientDir) {
        return cfg.clientDir;
    }

    throw new Error(`[configs] clientDir missing for "${cfg.name}". Call loadConfig first.`);
}

/**
 * Parses the version information from the content
 * @param {string} content The content to parse
 * @returns {Object} The version information
 * @returns {string} version The version
 * @returns {string} versionCheckUrl The version check URL
 */
export function parseVersionInfo(content: string): { version?: string; versionCheckUrl?: string } {
    if (!content || typeof content !== "string") {
        return {};
    }

    const trimmed = content.trim();

    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
            const parsed = JSON.parse(trimmed) as { version?: unknown; versionCheckUrl?: unknown };

            return {
                version: typeof parsed.version === "string" ? parsed.version.trim() : undefined,
                versionCheckUrl:
                    typeof parsed.versionCheckUrl === "string"
                        ? parsed.versionCheckUrl.trim()
                        : undefined
            };
        } catch {
            // Fallback to plain text parsing
        }
    }

    const result: { version?: string; versionCheckUrl?: string } = {};
    const lines = trimmed.split(/\r?\n/);

    for (const rawLine of lines) {
        const line = rawLine.trim();

        if (!line || line.startsWith("#") || line.startsWith("//")) {
            continue;
        }

        const matchVersion = line.match(/^version[:\s=]+(.+)$/i);
        const matchUrl = line.match(/^versionCheckUrl[:\s=]+(.+)$/i);

        if (matchVersion && matchVersion[1]) {
            result.version = matchVersion[1].trim();
        } else if (matchUrl && matchUrl[1]) {
            result.versionCheckUrl = matchUrl[1].trim();
        } else if (!result.version && /^\d+(\.\d+)+/.test(line)) {
            result.version = line.trim();
        }
    }

    return result;
}

/**
 * Loads the version information from the file
 * @param {string} dirPath The directory path to load the version information from
 * @returns {Object} The version information
 * @returns {string} version The version
 * @returns {string} versionCheckUrl The version check URL
 */
export function loadVersionFromFile(dirPath: string): {
    version?: string;
    versionCheckUrl?: string;
} {
    const candidateFiles = ["version", "version.json", "version.txt"];

    for (const filename of candidateFiles) {
        const filePath = path.join(dirPath, filename);

        if (fs.existsSync(filePath)) {
            try {
                const content = fs.readFileSync(filePath, "utf8");

                return parseVersionInfo(content);
            } catch {
                // Ignore read failures
            }
        }
    }

    return {};
}

/**
 * Loads the workspace version information
 * @returns {Object} The version information
 * @returns {string} version The version
 * @returns {string} versionCheckUrl The version check URL
 */
export function loadWorkspaceVersion(): { version?: string; versionCheckUrl?: string } {
    return loadVersionFromFile(WORKSPACE_ROOT);
}

/**
 * Loads the development application version information
 * @returns {Object} The version information
 * @returns {string} version The version
 * @returns {string} versionCheckUrl The version check URL
 */
export function loadDevAppVersion(): { version?: string; versionCheckUrl?: string } {
    const devAppDir = path.resolve(HERE, "..", "src", "devApp");
    const devInfo = loadVersionFromFile(devAppDir);

    if (devInfo.version || devInfo.versionCheckUrl) {
        return devInfo;
    }

    return loadWorkspaceVersion();
}

/**
 * Lists the discovered clients
 * @returns {Map<string, { dir: string; configPath: string }>} The discovered clients
 */
function listDiscoveredClients(): Map<string, { dir: string; configPath: string }> {
    const found = new Map<string, { dir: string; configPath: string }>();

    if (!fs.existsSync(WORKSPACE_ROOT)) {
        return found;
    }

    for (const entry of fs.readdirSync(WORKSPACE_ROOT, { withFileTypes: true })) {
        if (
            !entry.isDirectory() ||
            SKIP_DISCOVERY_DIRS.has(entry.name) ||
            entry.name.startsWith(".")
        ) {
            continue;
        }

        const configPath = path.join(WORKSPACE_ROOT, entry.name, CLIENT_CONFIG_FILE);

        if (!fs.existsSync(configPath)) {
            continue;
        }

        let parsed: { name?: unknown };

        try {
            parsed = JSON.parse(fs.readFileSync(configPath, "utf8")) as { name?: unknown };
        } catch {
            continue;
        }

        const name = typeof parsed.name === "string" ? parsed.name.trim() : "";

        if (!name || found.has(name)) {
            continue;
        }

        found.set(name, { dir: entry.name, configPath });
    }

    return found;
}

/**
 * Lists the discovered client names
 * @returns {string[]} The discovered client names
 */
function listDiscoveredClientNames(): string[] {
    return [...listDiscoveredClients().keys()].sort();
}

/**
 * Load a client config by `name` from any sibling folder that has `cht.config.json`.
 * Returns null when no client is active (base dev mode).
 * @param {string | undefined | null} name The name of the client to load
 * @returns {ClientConfig | null} The client config
 */
export function loadConfig(name: string | undefined | null): ClientConfig | null {
    if (!name) {
        return null;
    }

    const found = listDiscoveredClients().get(name);

    if (!found) {
        const known = listDiscoveredClientNames().join(", ") || "(none)";

        throw new Error(
            `[configs] Client config not found: "${name}". Add cht.config.json to a sibling folder. Known clients: ${known}`
        );
    }

    const clientDir = found.dir;
    const clientDirPath = path.join(WORKSPACE_ROOT, clientDir);
    const configPath = found.configPath;

    const raw = fs.readFileSync(configPath, "utf8");
    let parsed: ClientConfig;

    try {
        parsed = JSON.parse(raw) as ClientConfig;
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        throw new Error(`[configs] Invalid JSON in ${configPath}: ${message}`);
    }

    const fileVersion = loadVersionFromFile(clientDirPath);
    const workspaceVersion = loadWorkspaceVersion();

    return {
        ...parsed,
        name,
        siteTitle: parsed.siteTitle || name,
        clientDir,
        version: parsed.version || fileVersion.version || workspaceVersion.version || "1.0.0",
        versionCheckUrl:
            parsed.versionCheckUrl ||
            fileVersion.versionCheckUrl ||
            workspaceVersion.versionCheckUrl ||
            ""
    };
}

/**
 * Exports the client config type
 * @type {ClientConfig}
 */
export type { ClientConfig } from "./types";
