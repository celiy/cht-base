/**
 * Config for a client (sister folder + build-time metadata).
 *
 * `clientDir` is optional. When omitted, the build falls back to the
 * convention `cht-client-<name>` (matching the monorepo's `clients.json`).
 */
export interface ClientConfig {
    name: string;
    clientDir?: string;
    siteTitle: string;
}
