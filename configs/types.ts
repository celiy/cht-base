import type { ClientThemeConfig } from "./theme/types";

/**
 * Config for a client (sister folder + build-time metadata).
 *
 * Loaded from `cht-client-<name>/cht.config.json`. `clientDir` is optional;
 * when omitted, the build falls back to the convention `cht-client-<name>`.
 */
export interface ClientConfig {
    name: string;
    clientDir?: string;
    siteTitle: string;
    theme?: ClientThemeConfig;
    frontend?: {
        repo?: string;
    };
    backend?: {
        dir?: string;
        repo?: string;
        script?: string;
    };
}
