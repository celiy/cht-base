import type { ClientThemeConfig } from "./theme/types";

/**
 * Config for a client (sister folder + build-time metadata).
 *
 * Loaded from `<folder>/cht.config.json`. The folder name is free; `name` in
 * the file is the client id used by `--client:<name>`.
 */
export interface ClientConfig {
    name: string;
    clientDir?: string;
    siteTitle: string;
    version?: string;
    versionCheckUrl?: string;
    theme?: ClientThemeConfig;
    apiBaseUrl?: string;
    api?: {
        dev?: string;
        web?: string;
        electron?: string;
        mobile?: string;
    };
    apiPortScanLimit?: number;
    frontend?: {
        repo?: string;
    };
    backend?: {
        /** Folder relative to the workspace root (required when `backend` is set). */
        dir: string;
        repo?: string;
        /** Full shell command run in `dir` for watch/dev (Node, Java, …). */
        cmd?: string;
        /** npm script used when `cmd` is omitted (default `dev`). */
        script?: string;
        /** Command used by Electron (local window). Defaults to `cmd`. */
        startCmd?: string;
        startScript?: string;
        /** Command used inside the packaged Electron app. Defaults to the Node `tsx` entry. */
        packagedCmd?: string;
        /**
         * Copy this backend into the Electron installer.
         * Default `true`. Set `false` when the API is remote or not Node.
         */
        packageWithElectron?: boolean;
        host?: string;
        port?: number;
        portScanLimit?: number;
        healthPath?: string;
    };
    electron?: {
        width?: number;
        height?: number;
    };
    /**
     * Debug FAB during `npx chtmain dev --client:<name>`.
     * Set to `false` or `{ enabled: false }` to hide it.
     * `repoUpdateNotifications: false` hides only the repo-update bell (default on).
     */
    devTools?: boolean | {
        enabled?: boolean;
        repoUpdateNotifications?: boolean;
    };
    publish?: {
        provider?: string;
        owner?: string;
        repo?: string;
    };
}
