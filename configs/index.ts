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
                    typeof parsed.versionCheckUrl === "string" ? parsed.versionCheckUrl.trim() : undefined
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

export function loadVersionFromFile(dirPath: string): { version?: string; versionCheckUrl?: string } {
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

export function loadWorkspaceVersion(): { version?: string; versionCheckUrl?: string } {
    return loadVersionFromFile(WORKSPACE_ROOT);
}

export function loadDevAppVersion(): { version?: string; versionCheckUrl?: string } {
    const devAppDir = path.resolve(HERE, "..", "src", "devApp");
    const devInfo = loadVersionFromFile(devAppDir);

    if (devInfo.version || devInfo.versionCheckUrl) {
        return devInfo;
    }

    return loadWorkspaceVersion();
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
    const clientDirPath = path.join(WORKSPACE_ROOT, clientDir);
    const configPath = path.join(clientDirPath, CLIENT_CONFIG_FILE);

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

    const fileVersion = loadVersionFromFile(clientDirPath);
    const workspaceVersion = loadWorkspaceVersion();

    return {
        ...parsed,
        name: configName,
        siteTitle: parsed.siteTitle || name,
        clientDir: parsed.clientDir || clientDir,
        version: parsed.version || fileVersion.version || workspaceVersion.version || "1.0.0",
        versionCheckUrl:
            parsed.versionCheckUrl ||
            fileVersion.versionCheckUrl ||
            workspaceVersion.versionCheckUrl ||
            ""
    };
}

export type { ClientConfig } from "./types";
