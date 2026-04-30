import mecarvit from "./mecarvit";
import type { ClientConfig } from "./types";

/**
 * Registry of known clients. Add a new client by importing its config here.
 */
const registry: Record<string, ClientConfig> = {
    mecarvit
};

/**
 * Load a client config by name. Returns null when no client is active (base dev mode).
 */
export function loadConfig(name: string | undefined | null): ClientConfig | null {
    if (!name) {
        return null;
    }

    const cfg = registry[name];

    if (!cfg) {
        const known = Object.keys(registry).join(", ") || "(none)";
        throw new Error(`[configs] Client config not found: "${name}". Known clients: ${known}`);
    }

    return {
        ...cfg,
        clientDir: resolveClientDir(cfg)
    };
}

/**
 * Apply the monorepo convention `cht-client-<name>` when `clientDir`
 * is not explicitly set on the registered config.
 */
export function resolveClientDir(cfg: ClientConfig): string {
    return cfg.clientDir || `cht-client-${cfg.name}`;
}

export type { ClientConfig } from "./types";
