import { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } from "electron";
import type { MenuItemConstructorOptions } from "electron";
import fs from "node:fs";
import path from "node:path";
import { BackendManager } from "./backendManager";
import { UpdateManager } from "./updater";
import type { ElectronBackendConfig, ElectronRuntimeConfig, UpdateStatus } from "./types";
import { IPC_CHANNELS } from "./types";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 800;
const NODE_RUNTIME_DIR = "node";

let mainWindow: BrowserWindow | null = null;
let backendManager: BackendManager | null = null;
let updateManager: UpdateManager | null = null;
let tray: Tray | null = null;
let runtimeConfig: ElectronRuntimeConfig;
let isShuttingDown = false;

/**
 * Resolves the runtime config path
 * @returns {string} The runtime config path
 */
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

/**
 * Loads the runtime config
 * @returns {ElectronRuntimeConfig} The runtime config
 */
function loadRuntimeConfig(): ElectronRuntimeConfig {
    const configPath = resolveRuntimeConfigPath();
    const raw = fs.readFileSync(configPath, "utf8");
    return JSON.parse(raw) as ElectronRuntimeConfig;
}

/**
 * Resolves the backend directory
 * @param {string} dir The directory to resolve
 * @returns {string} The resolved backend directory
 */
function resolveBackendDir(dir: string): string {
    if (path.isAbsolute(dir)) {
        return dir;
    }

    if (app.isPackaged) {
        return path.join(process.resourcesPath, dir);
    }

    return path.resolve(dir);
}

/**
 * Node runtime shipped inside the installer. Using a plain Node build keeps the
 * backend's prebuilt native addons (`better-sqlite3`, `bcrypt`) on the ABI they
 * were installed for, instead of Electron's.
 */
function resolveBundledNode(): string | null {
    const binaryName = process.platform === "win32" ? "node.exe" : "node";
    const candidate = path.join(process.resourcesPath, NODE_RUNTIME_DIR, binaryName);

    if (!app.isPackaged || !fs.existsSync(candidate)) {
        return null;
    }

    return candidate;
}

function resolveBackendConfig(): ElectronBackendConfig | null {
    const base = runtimeConfig.backend;

    if (!base) {
        return null;
    }

    const config: ElectronBackendConfig = {
        ...base,
        dir: resolveBackendDir(base.dir)
    };

    if (!app.isPackaged) {
        return config;
    }

    const bundledNode = resolveBundledNode();

    config.nodePath = bundledNode || process.execPath;
    config.electronAsNode = !bundledNode;
    config.dataDir = app.getPath("userData");
    config.packaged = true;

    return config;
}

/**
 * Resolves the preload path
 * @returns {string} The preload path
 */
function preloadPath(): string {
    return path.join(__dirname, "preload.cjs");
}

/**
 * Attaches the context menu to the window
 * @param {BrowserWindow} window The window to attach the context menu to
 */
function attachContextMenu(window: BrowserWindow): void {
    window.webContents.on("context-menu", (_event, params) => {
        const template: MenuItemConstructorOptions[] = [];

        if (params.editFlags.canCut) {
            template.push({ label: "Recortar", role: "cut" });
        }

        if (params.editFlags.canCopy) {
            template.push({ label: "Copiar", role: "copy" });
        }

        if (params.editFlags.canPaste) {
            template.push({ label: "Colar", role: "paste" });
        }

        if (params.editFlags.canSelectAll) {
            template.push({ label: "Selecionar tudo", role: "selectAll" });
        }

        if (runtimeConfig.isDev) {
            if (template.length > 0) {
                template.push({ type: "separator" });
            }

            template.push({
                label: "Inspecionar elemento",
                click: () => {
                    window.webContents.inspectElement(params.x, params.y);

                    if (!window.webContents.isDevToolsOpened()) {
                        window.webContents.openDevTools({ mode: "bottom" });
                    }
                }
            });
        }

        if (template.length === 0) {
            return;
        }

        Menu.buildFromTemplate(template).popup({ window });
    });
}

/**
 * Creates a new window
 * @returns {BrowserWindow} The new window
 */
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
            sandbox: true,
            additionalArguments: [`--cht-app-version=${app.getVersion()}`]
        }
    });

    window.on("closed", () => {
        if (mainWindow === window) {
            mainWindow = null;
        }
    });

    attachContextMenu(window);

    return window;
}

/**
 * Loads the frontend
 * @param {BrowserWindow} window The window to load the frontend into
 * @returns {Promise<void>} A promise that resolves when the frontend is loaded
 */
async function loadFrontend(window: BrowserWindow): Promise<void> {
    if (runtimeConfig.isDev && runtimeConfig.viteUrl) {
        await window.loadURL(runtimeConfig.viteUrl);
        return;
    }

    const indexHtml = path.join(app.getAppPath(), "dist", "index.html");
    await window.loadFile(indexHtml);
}

/**
 * Broadcasts the backend status
 */
function broadcastBackendStatus(): void {
    if (!backendManager) {
        return;
    }

    const status = backendManager.getStatus();

    for (const window of BrowserWindow.getAllWindows()) {
        window.webContents.send(IPC_CHANNELS.status, status);
    }

    refreshTrayMenu();
}

/**
 * Gets the current update status
 * @returns {UpdateStatus} The current update status
 */
function currentUpdateStatus(): UpdateStatus {
    if (updateManager) {
        return updateManager.getStatus();
    }

    return {
        state: "idle",
        message: "",
        currentVersion: app.getVersion(),
        supported: false
    };
}

/**
 * Broadcasts the update status
 */
function broadcastUpdateStatus(): void {
    const status = currentUpdateStatus();

    for (const window of BrowserWindow.getAllWindows()) {
        window.webContents.send(IPC_CHANNELS.updateStatus, status);
    }

    refreshTrayMenu();
}

/**
 * Resolves the tray icon path
 * @returns {string | null} The tray icon path
 */
function trayIconPath(): string | null {
    const configured = runtimeConfig.trayIcon;

    if (!configured) {
        return null;
    }

    const resolved = path.isAbsolute(configured)
        ? configured
        : path.join(process.resourcesPath, configured);

    return fs.existsSync(resolved) ? resolved : null;
}

/**
 * Gets the backend status label
 * @returns {string} The backend status label
 */
function backendStatusLabel(): string {
    const status = backendManager?.getStatus();

    if (!status) {
        return runtimeConfig.hasBackend
            ? "Servidor local: aguardando"
            : "Servidor local: desativado";
    }

    switch (status.state) {
        case "starting":
            return "Servidor local: iniciando...";
        case "ready":
            return "Servidor local: em execução";
        case "error":
            return "Servidor local: com erro";
        case "stopped":
            return "Servidor local: encerrado";
        default:
            return "Servidor local: aguardando";
    }
}

/**
 * Gets the update status label
 * @returns {string | null} The update status label
 */
function updateStatusLabel(): string | null {
    const status = currentUpdateStatus();

    switch (status.state) {
        case "checking":
            return "Atualizações: procurando...";
        case "available":
            return `Atualizações: versão ${status.availableVersion ?? "nova"} disponível`;
        case "not-available":
            return "Atualizações: nenhuma disponível";
        case "downloading":
            return `Atualizações: baixando (${Math.round(status.percent ?? 0)}%)`;
        case "downloaded":
            return "Atualizações: pronta para instalar";
        case "error":
            return "Atualizações: falhou";
        default:
            return null;
    }
}

/**
 * Shows the main window
 */
function showMainWindow(): void {
    if (!mainWindow) {
        void createAppWindow();

        return;
    }

    if (mainWindow.isMinimized()) {
        mainWindow.restore();
    }

    mainWindow.show();
    mainWindow.focus();
}

/**
 * Builds the tray template
 * @returns {MenuItemConstructorOptions[]} The tray template
 */
function buildTrayTemplate(): MenuItemConstructorOptions[] {
    const backendStatus = backendManager?.getStatus();
    const template: MenuItemConstructorOptions[] = [
        { label: runtimeConfig.siteTitle, enabled: false },
        { label: `Versão ${app.getVersion()}`, enabled: false },
        { type: "separator" },
        { label: backendStatusLabel(), enabled: false }
    ];

    if (backendStatus?.state === "error" && backendStatus.message) {
        template.push({ label: backendStatus.message, enabled: false });
    }

    if (backendStatus?.healthUrl) {
        template.push({ label: backendStatus.healthUrl, enabled: false });
    }

    const updateLabel = updateStatusLabel();

    if (updateLabel) {
        template.push({ label: updateLabel, enabled: false });
    }

    template.push(
        { type: "separator" },
        {
            label: "Abrir janela",
            click: () => showMainWindow()
        }
    );

    if (runtimeConfig.hasBackend) {
        template.push({
            label: "Reiniciar servidor local",
            click: () => {
                void backendManager?.retry();
            }
        });
    }

    const updateStatus = currentUpdateStatus();

    if (updateStatus.supported) {
        if (updateStatus.state === "downloaded") {
            template.push({
                label: "Instalar atualização",
                click: () => updateManager?.install()
            });
        } else if (updateStatus.state === "available") {
            template.push({
                label: "Baixar atualização",
                click: () => {
                    void updateManager?.download();
                }
            });
        } else {
            template.push({
                label: "Verificar atualizações",
                click: () => {
                    void updateManager?.check();
                }
            });
        }
    }

    template.push(
        { type: "separator" },
        {
            label: "Sair",
            click: () => app.quit()
        }
    );

    return template;
}

/**
 * Refreshes the tray menu
 */
function refreshTrayMenu(): void {
    if (!tray) {
        return;
    }

    tray.setContextMenu(Menu.buildFromTemplate(buildTrayTemplate()));
    tray.setToolTip(`${runtimeConfig.siteTitle} - ${backendStatusLabel()}`);
}

/**
 * The tray is a convenience, not a requirement: a desktop that does not support
 * it must not stop the app from starting.
 */
function createTray(): void {
    const iconPath = trayIconPath();

    if (!iconPath) {
        return;
    }

    try {
        tray = new Tray(nativeImage.createFromPath(iconPath));
        tray.on("click", () => showMainWindow());
        refreshTrayMenu();
    } catch (error) {
        console.warn("[electron] Tray indisponível:", error);
        tray = null;
    }
}

/**
 * Registers the update IPC handlers
 */
function registerUpdateIpc(): void {
    ipcMain.handle(IPC_CHANNELS.updateGetStatus, () => currentUpdateStatus());

    ipcMain.handle(IPC_CHANNELS.updateCheck, async () => {
        if (!updateManager) {
            return currentUpdateStatus();
        }

        return updateManager.check();
    });

    ipcMain.handle(IPC_CHANNELS.updateDownload, async () => {
        if (!updateManager) {
            return currentUpdateStatus();
        }

        return updateManager.download();
    });

    ipcMain.handle(IPC_CHANNELS.updateInstall, () => {
        updateManager?.install();
    });
}

/**
 * Registers the IPC handlers
 */
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

    registerUpdateIpc();
}

/**
 * Starts the updates
 */
function startUpdates(): void {
    updateManager = new UpdateManager();
    updateManager.onStatus(() => {
        broadcastUpdateStatus();
    });
    updateManager.start();
}

/**
 * Starts the backend
 * @returns {Promise<void>} A promise that resolves when the backend is started
 */
async function startBackend(): Promise<void> {
    if (!runtimeConfig.hasBackend) {
        return;
    }

    const backendConfig = resolveBackendConfig();

    if (!backendConfig) {
        return;
    }

    backendManager = new BackendManager(backendConfig);
    backendManager.onStatus(() => {
        broadcastBackendStatus();
    });

    void backendManager.start();
}

/**
 * Creates the app window
 * @returns {Promise<void>} A promise that resolves when the app window is created
 */
async function createAppWindow(): Promise<void> {
    mainWindow = createWindow();
    await loadFrontend(mainWindow);
}

/**
 * Shuts down the app
 * @returns {Promise<void>} A promise that resolves when the app is shut down
 */
async function shutdown(): Promise<void> {
    updateManager?.stop();
    updateManager = null;

    if (tray) {
        tray.destroy();
        tray = null;
    }

    if (backendManager) {
        await backendManager.stop();
        backendManager = null;
    }
}

/**
 * The main function
 */
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
        startUpdates();
        await Promise.all([startBackend(), createAppWindow()]);
        createTray();
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
