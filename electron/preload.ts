import { contextBridge, ipcRenderer } from "electron";
import type { BackendStatus, ElectronAPI } from "./types";
import { IPC_CHANNELS } from "./types";

const electronAPI: ElectronAPI = {
    isElectron: true,
    platform: process.platform,
    getBackendStatus: () => ipcRenderer.invoke(IPC_CHANNELS.getStatus) as Promise<BackendStatus>,
    onBackendStatus: (callback) => {
        const listener = (_event: unknown, status: BackendStatus) => {
            callback(status);
        };

        ipcRenderer.on(IPC_CHANNELS.status, listener);

        return () => {
            ipcRenderer.removeListener(IPC_CHANNELS.status, listener);
        };
    },
    retryBackend: () => ipcRenderer.invoke(IPC_CHANNELS.retry) as Promise<void>
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
