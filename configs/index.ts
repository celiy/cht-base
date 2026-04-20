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

    return cfg;
}

export type { ClientConfig, DevShellConfig, SidebarNavItem } from "./types";
export { default as devShellConfig } from "./dev";
