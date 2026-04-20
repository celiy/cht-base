import type { ClientConfig } from "../../configs/types";

declare global {
    /**
     * Active client config injected by Vite at build time.
     * `null` when running in base dev mode (no CLIENT env var).
     */
    const __CLIENT_CONFIG__: ClientConfig | null;
}

export {};
