import { app, contextBridge, ipcRenderer } from "electron";
import type { BackendStatus, ElectronAPI, UpdateStatus } from "./types";
import { IPC_CHANNELS } from "./types";

const electronAPI: ElectronAPI = {
    isElectron: true,
    platform: process.platform,
    appVersion: app.getVersion(),
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
    retryBackend: () => ipcRenderer.invoke(IPC_CHANNELS.retry) as Promise<void>,
    getUpdateStatus: () => ipcRenderer.invoke(IPC_CHANNELS.updateGetStatus) as Promise<UpdateStatus>,
    onUpdateStatus: (callback) => {
        const listener = (_event: unknown, status: UpdateStatus) => {
            callback(status);
        };

        ipcRenderer.on(IPC_CHANNELS.updateStatus, listener);

        return () => {
            ipcRenderer.removeListener(IPC_CHANNELS.updateStatus, listener);
        };
    },
    checkForUpdates: () => ipcRenderer.invoke(IPC_CHANNELS.updateCheck) as Promise<UpdateStatus>,
    downloadUpdate: () => ipcRenderer.invoke(IPC_CHANNELS.updateDownload) as Promise<UpdateStatus>,
    installUpdate: () => ipcRenderer.invoke(IPC_CHANNELS.updateInstall) as Promise<void>
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
