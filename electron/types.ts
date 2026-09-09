export type BackendStatusState = "idle" | "starting" | "ready" | "error" | "stopped";

export interface BackendStatus {
    state: BackendStatusState;
    message: string;
    healthUrl?: string;
}

export interface ElectronBackendConfig {
    dir: string;
    cmd: string;
    healthUrl: string;
    host: string;
    port: number;
    nodePath?: string;
}

export interface ElectronRuntimeConfig {
    client: string;
    siteTitle: string;
    isDev: boolean;
    viteUrl?: string;
    hasBackend: boolean;
    backend?: ElectronBackendConfig;
    window?: {
        width?: number;
        height?: number;
    };
}

export interface ElectronAPI {
    isElectron: true;
    platform: string;
    getBackendStatus: () => Promise<BackendStatus>;
    onBackendStatus: (callback: (status: BackendStatus) => void) => () => void;
    retryBackend: () => Promise<void>;
}

export const IPC_CHANNELS = {
    getStatus: "cht:backend:get-status",
    status: "cht:backend:status",
    retry: "cht:backend:retry"
} as const;
