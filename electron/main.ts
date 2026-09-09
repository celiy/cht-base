import { app, BrowserWindow, ipcMain } from "electron";
import fs from "node:fs";
import path from "node:path";
import { BackendManager } from "./backendManager";
import type { ElectronRuntimeConfig } from "./types";
import { IPC_CHANNELS } from "./types";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 800;

let mainWindow: BrowserWindow | null = null;
let backendManager: BackendManager | null = null;
let runtimeConfig: ElectronRuntimeConfig;
let isShuttingDown = false;

function resolveRuntimeConfigPath(): string {
    const fromEnv = process.env.CHT_ELECTRON_CONFIG;

    if (fromEnv && fs.existsSync(fromEnv)) {
        return fromEnv;
    }

    const nextToMain = path.join(__dirname, "runtime-config.json");

    if (fs.existsSync(nextToMain)) {
        return nextToMain;
    }

    if (app.isPackaged) {
        const fromResources = path.join(process.resourcesPath, "runtime-config.json");

        if (fs.existsSync(fromResources)) {
            return fromResources;
        }
    }

    throw new Error("Arquivo de configuração do Electron não encontrado (runtime-config.json).");
}

function loadRuntimeConfig(): ElectronRuntimeConfig {
    const configPath = resolveRuntimeConfigPath();
    const raw = fs.readFileSync(configPath, "utf8");
    return JSON.parse(raw) as ElectronRuntimeConfig;
}

function resolveBackendDir(dir: string): string {
    if (path.isAbsolute(dir)) {
        return dir;
    }

    if (app.isPackaged) {
        return path.join(process.resourcesPath, dir);
    }

    return path.resolve(dir);
}

function preloadPath(): string {
    return path.join(__dirname, "preload.cjs");
}

function createWindow(): BrowserWindow {
    const width = runtimeConfig.window?.width ?? DEFAULT_WIDTH;
    const height = runtimeConfig.window?.height ?? DEFAULT_HEIGHT;

    const window = new BrowserWindow({
        width,
        height,
        minWidth: 800,
        minHeight: 600,
        title: runtimeConfig.siteTitle,
        backgroundColor: "#171717",
        show: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: preloadPath(),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    window.on("closed", () => {
        if (mainWindow === window) {
            mainWindow = null;
        }
    });

    return window;
}

async function loadFrontend(window: BrowserWindow): Promise<void> {
    if (runtimeConfig.isDev && runtimeConfig.viteUrl) {
        await window.loadURL(runtimeConfig.viteUrl);
        return;
    }

    const indexHtml = path.join(app.getAppPath(), "dist", "index.html");
    await window.loadFile(indexHtml);
}

function broadcastBackendStatus(): void {
    if (!backendManager) {
        return;
    }

    const status = backendManager.getStatus();

    for (const window of BrowserWindow.getAllWindows()) {
        window.webContents.send(IPC_CHANNELS.status, status);
    }
}

function registerIpc(): void {
    ipcMain.handle(IPC_CHANNELS.getStatus, () => {
        if (!backendManager) {
            return {
                state: "idle",
                message: ""
            };
        }

        return backendManager.getStatus();
    });

    ipcMain.handle(IPC_CHANNELS.retry, async () => {
        if (!backendManager) {
            return;
        }

        await backendManager.retry();
    });
}

async function startBackend(): Promise<void> {
    if (!runtimeConfig.hasBackend || !runtimeConfig.backend) {
        return;
    }

    const backendConfig = {
        ...runtimeConfig.backend,
        dir: resolveBackendDir(runtimeConfig.backend.dir)
    };

    backendManager = new BackendManager(backendConfig);
    backendManager.onStatus(() => {
        broadcastBackendStatus();
    });

    void backendManager.start();
}

async function createAppWindow(): Promise<void> {
    mainWindow = createWindow();
    await loadFrontend(mainWindow);
}

async function shutdown(): Promise<void> {
    if (backendManager) {
        await backendManager.stop();
        backendManager = null;
    }
}

function main(): void {
    runtimeConfig = loadRuntimeConfig();

    const gotLock = app.requestSingleInstanceLock();

    if (!gotLock) {
        app.quit();
        return;
    }

    app.on("second-instance", () => {
        if (!mainWindow) {
            return;
        }

        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }

        mainWindow.focus();
    });

    app.whenReady().then(async () => {
        registerIpc();
        await Promise.all([startBackend(), createAppWindow()]);
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            void createAppWindow();
        }
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("before-quit", (event) => {
        if (isShuttingDown || !backendManager) {
            return;
        }

        isShuttingDown = true;
        event.preventDefault();
        void shutdown().finally(() => {
            app.exit(0);
        });
    });
}

main();
