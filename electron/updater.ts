import { app } from "electron";
import { autoUpdater } from "electron-updater";
import type { UpdateStatus, UpdateStatusState } from "./types";

export type UpdateStatusListener = (status: UpdateStatus) => void;

const REVALIDATE_INTERVAL_MS = 30 * 60 * 1000;

function messageOf(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return String(error);
}

/**
 * Wraps `electron-updater` so the renderer can drive check/download/install
 * through IPC, mirroring the `BackendManager` listener contract.
 */
export class UpdateManager {
    private readonly listeners = new Set<UpdateStatusListener>();
    private readonly supported: boolean;
    private status: UpdateStatus;
    private interval: ReturnType<typeof setInterval> | null = null;
    private wired = false;

    constructor() {
        this.supported = app.isPackaged || process.env.CHT_UPDATE_DEV === "1";

        this.status = {
            state: "idle",
            message: "",
            currentVersion: app.getVersion(),
            supported: this.supported
        };
    }

    getStatus(): UpdateStatus {
        return { ...this.status };
    }

    onStatus(listener: UpdateStatusListener): () => void {
        this.listeners.add(listener);
        listener(this.getStatus());

        return () => {
            this.listeners.delete(listener);
        };
    }

    /**
     * Start the periodic revalidation. Safe to call more than once.
     */
    start(): void {
        if (!this.supported || this.interval) {
            return;
        }

        this.wireAutoUpdater();
        this.interval = setInterval(() => {
            void this.check();
        }, REVALIDATE_INTERVAL_MS);
    }

    stop(): void {
        if (!this.interval) {
            return;
        }

        clearInterval(this.interval);
        this.interval = null;
    }

    async check(): Promise<UpdateStatus> {
        if (!this.supported) {
            return this.getStatus();
        }

        this.wireAutoUpdater();
        this.setStatus("checking", "Verificando atualizações...");

        try {
            await autoUpdater.checkForUpdates();
        } catch (error) {
            this.setError(error);
        }

        return this.getStatus();
    }

    async download(): Promise<UpdateStatus> {
        if (!this.supported || this.status.state !== "available") {
            return this.getStatus();
        }

        this.setStatus("downloading", "Baixando atualização...", { percent: 0 });

        try {
            await autoUpdater.downloadUpdate();
        } catch (error) {
            this.setError(error);
        }

        return this.getStatus();
    }

    install(): void {
        if (!this.supported || this.status.state !== "downloaded") {
            return;
        }

        this.stop();
        // `isSilent` false so the NSIS wizard stays visible, `isForceRunAfter`
        // true so the app reopens on the freshly installed version.
        autoUpdater.quitAndInstall(false, true);
    }

    private wireAutoUpdater(): void {
        if (this.wired) {
            return;
        }

        this.wired = true;
        autoUpdater.autoDownload = false;
        autoUpdater.autoInstallOnAppQuit = true;

        if (!app.isPackaged && process.env.CHT_UPDATE_DEV === "1") {
            autoUpdater.forceDevUpdateConfig = true;
        }

        autoUpdater.on("checking-for-update", () => {
            this.setStatus("checking", "Verificando atualizações...");
        });

        autoUpdater.on("update-available", (info) => {
            this.setStatus("available", `Versão ${info.version} disponível.`, {
                availableVersion: info.version
            });
        });

        autoUpdater.on("update-not-available", () => {
            this.setStatus("not-available", "Você já está na versão mais recente.", {
                availableVersion: undefined
            });
        });

        autoUpdater.on("download-progress", (progress) => {
            this.setStatus("downloading", `Baixando... ${Math.round(progress.percent)}%`, {
                percent: Math.round(progress.percent),
                bytesPerSecond: progress.bytesPerSecond
            });
        });

        autoUpdater.on("update-downloaded", (info) => {
            this.setStatus("downloaded", "Atualização pronta para instalar.", {
                availableVersion: info.version,
                percent: 100
            });
        });

        autoUpdater.on("error", (error) => {
            this.setError(error);
        });
    }

    private setError(error: unknown): void {
        this.setStatus("error", `Falha ao atualizar: ${messageOf(error)}`);
    }

    private setStatus(
        state: UpdateStatusState,
        message: string,
        extra: Partial<UpdateStatus> = {}
    ): void {
        this.status = {
            ...this.status,
            availableVersion: undefined,
            percent: undefined,
            bytesPerSecond: undefined,
            state,
            message,
            ...extra
        };

        for (const listener of this.listeners) {
            listener(this.getStatus());
        }
    }
}
