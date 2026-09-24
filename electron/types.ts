export type BackendStatusState = "idle" | "starting" | "ready" | "error" | "stopped";

export interface BackendStatus {
    state: BackendStatusState;
    message: string;
    healthUrl?: string;
    apiBaseUrl?: string;
}

export interface ElectronBackendConfig {
    dir: string;
    cmd: string;
    /** Backend entry file, relative to `dir`, for the packaged Node runtime. */
    entry?: string;
    healthUrl: string;
    host: string;
    port: number;
    portScanLimit?: number;
    /** Absolute Node binary used to spawn the backend. */
    nodePath?: string;
    /** Set when `nodePath` is the Electron binary running as Node. */
    electronAsNode?: boolean;
    /** Absolute writable directory for the SQLite databases (userData). */
    dataDir?: string;
    /** Packaged desktop build (production env + owner setup file). */
    packaged?: boolean;
}

export type UpdateStatusState =
    | "idle"
    | "checking"
    | "available"
    | "not-available"
    | "downloading"
    | "downloaded"
    | "error";

export interface UpdateStatus {
    state: UpdateStatusState;
    message: string;
    /** Version offered by the update feed, when known. */
    availableVersion?: string;
    /** Version of the running build. */
    currentVersion: string;
    /** Download completion, 0-100. */
    percent?: number;
    bytesPerSecond?: number;
    /** Whether the packaged app can actually update itself. */
    supported: boolean;
}

export interface ElectronRuntimeConfig {
    client: string;
    siteTitle: string;
    isDev: boolean;
    viteUrl?: string;
    hasBackend: boolean;
    backend?: ElectronBackendConfig;
    /**
     * Tray icon: relative to `process.resourcesPath` when packaged, absolute in
     * dev. The tray is skipped when this is missing or the file does not exist.
     */
    trayIcon?: string;
    window?: {
        width?: number;
        height?: number;
    };
}

export interface ElectronAPI {
    isElectron: true;
    platform: string;
    appVersion: string;
    getBackendStatus: () => Promise<BackendStatus>;
    onBackendStatus: (callback: (status: BackendStatus) => void) => () => void;
    retryBackend: () => Promise<void>;
    getUpdateStatus: () => Promise<UpdateStatus>;
    onUpdateStatus: (callback: (status: UpdateStatus) => void) => () => void;
    checkForUpdates: () => Promise<UpdateStatus>;
    downloadUpdate: () => Promise<UpdateStatus>;
    installUpdate: () => Promise<void>;
}

export const IPC_CHANNELS = {
    getStatus: "cht:backend:get-status",
    status: "cht:backend:status",
    retry: "cht:backend:retry",
    updateGetStatus: "cht:update:get-status",
    updateStatus: "cht:update:status",
    updateCheck: "cht:update:check",
    updateDownload: "cht:update:download",
    updateInstall: "cht:update:install"
} as const;
