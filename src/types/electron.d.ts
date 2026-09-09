import type { BackendStatus, ElectronAPI } from "../../electron/types";

declare global {
    interface Window {
        electronAPI?: ElectronAPI;
    }
}

export type { BackendStatus, ElectronAPI };
