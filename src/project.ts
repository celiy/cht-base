/**
 * The project module
 * This module is responsible for the project of the project.
 */

import type { App } from "vue";
import type { Router } from "vue-router";
import { reactive } from "vue";
import { applyTextContrast } from "@design/textContrast";
import type { ThemeName } from "../configs/theme/types";
import type {
    BackendStatus,
    BackendStatusState,
    UpdateStatus,
    UpdateStatusState
} from "../electron/types";
import { syncReactiveQuerySnapshot, syncReactiveParamsSnapshot } from "./js/utils/routeUtils";
import { loadStylesheet, unloadStylesheet } from "./js/utils/runtimeCss";
import {
    MOBILE_BREAKPOINT_PX,
    TABLET_BREAKPOINT_PX,
    viewportDeviceFlags
} from "./js/utils/viewportDevice";

/**
 * Parse the available themes from the environment variables.
 * @returns {ThemeName[]} The available themes.
 */
function parseAvailableThemes(): ThemeName[] {
    try {
        const raw = import.meta.env.VITE_AVAILABLE_THEMES;

        if (!raw) {
            return ["dark", "light"];
        }

        const parsed = JSON.parse(raw) as unknown;

        if (!Array.isArray(parsed)) {
            return ["dark", "light"];
        }

        return parsed.filter((theme): theme is ThemeName => theme === "light" || theme === "dark");
    } catch {
        return ["dark", "light"];
    }
}

/**
 * Parse the default theme from the environment variables.
 * @param availableThemes The available themes.
 * @returns {ThemeName} The default theme.
 */
function parseDefaultTheme(availableThemes: ThemeName[]): ThemeName {
    const configured = import.meta.env.VITE_DEFAULT_THEME;

    if (configured === "light" || configured === "dark") {
        return availableThemes.includes(configured) ? configured : (availableThemes[0] ?? "dark");
    }

    return availableThemes[0] ?? "dark";
}

const AVAILABLE_THEMES = parseAvailableThemes();
const DEFAULT_THEME = parseDefaultTheme(AVAILABLE_THEMES);
const THEME_STORAGE_KEY = import.meta.env.VITE_THEME_STORAGE_KEY || "cht-theme:dev";
const CUSTOM_THEME_STORAGE_KEY = `${THEME_STORAGE_KEY}:custom`;

export type CustomThemeName = "simplicia" | "hodiernus";

const CUSTOM_THEMES: CustomThemeName[] = ["simplicia", "hodiernus"];

/**
 * URL helpers bound to vue-router (requires initProjectRouter).
 *  - `query`  : reactive snapshot of the querystring (e.g. ?page=2 -> query.page)
 *  - `params` : reactive snapshot of the route params (e.g. /:id -> params.id)
 */
export interface ProjectUrlState {
    query: Record<string, string>;
    params: Record<string, string>;
}

export interface ProjectStyleState {
    activeTheme: ThemeName;
    availableThemes: ThemeName[];
    theme: (name: ThemeName) => void;
    customTheme: CustomThemeName;
    availableCustomThemes: CustomThemeName[];
    setCustomTheme: (name: CustomThemeName) => void;
    loadedCss: string[];
    loadCss: (id: string, href: string) => void;
    unloadCss: (id: string) => void;
}

export interface ProjectElectronState {
    isElectron: boolean;
    platform: string;
    hasBackend: boolean;
    backendReady: boolean;
    backendStatus: BackendStatusState;
    backendMessage: string;
}

export interface ProjectUpdateState {
    supported: boolean;
    status: UpdateStatusState;
    message: string;
    currentVersion: string;
    availableVersion: string | null;
    percent: number | null;
}

/**
 * The current project state.
 */
export interface ProjectState {
    device: {
        isMobile: boolean;
        isTablet: boolean;
        viewportWidth: number;
        viewportHeight: number;
        mobileBreakpointPx: number;
        tabletBreakpointPx: number;
    };
    labels: {
        siteTitle: string;
    };
    version: {
        current: string;
        checkUrl: string;
    };
    style: ProjectStyleState;
    user: {
        name: string | null;
    };
    url: ProjectUrlState;
    route: {
        isLoading: boolean;
    };
    electron: ProjectElectronState;
    update: ProjectUpdateState;
}

const urlQuerySnapshot = reactive<Record<string, string>>({});
const urlParamsSnapshot = reactive<Record<string, string>>({});

/**
 * Reads the stored theme from the local storage
 * @returns {ThemeName | null} The stored theme
 */
function readStoredTheme(): ThemeName | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

        if (stored === "light" || stored === "dark") {
            return stored;
        }
    } catch {
        return null;
    }

    return null;
}

/**
 * Persists the theme to the local storage
 * @param {ThemeName} theme The theme
 * @returns {void}
 */
function persistTheme(theme: ThemeName) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Ignore storage failures (private mode, quota, etc.).
    }
}

/**
 * Applies the theme to the document
 * @param {ThemeName} theme The theme
 * @returns {void}
 */
function applyThemeToDocument(theme: ThemeName) {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    applyTextContrast(document);
}

/**
 * Sets the theme
 * @param {ThemeName} theme The theme
 * @returns {void}
 */
function setTheme(theme: ThemeName) {
    if (!AVAILABLE_THEMES.includes(theme)) {
        return;
    }

    project.style.activeTheme = theme;
    applyThemeToDocument(theme);
    persistTheme(theme);
}

function isCustomThemeName(value: string): value is CustomThemeName {
    return CUSTOM_THEMES.includes(value as CustomThemeName);
}

function readStoredCustomTheme(): CustomThemeName | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const stored = window.localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);

        if (stored === "secondary") {
            return "simplicia";
        }

        if (stored === "tertiary") {
            return "hodiernus";
        }

        if (stored && isCustomThemeName(stored)) {
            return stored;
        }
    } catch {
        return null;
    }

    return null;
}

function persistCustomTheme(name: CustomThemeName) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, name);
    } catch {
        // Ignore storage failures (private mode, quota, etc.).
    }
}

function applyCustomThemeToDocument(name: CustomThemeName) {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.dataset.customTheme = name;
}

function setCustomTheme(name: CustomThemeName) {
    if (!isCustomThemeName(name)) {
        return;
    }

    project.style.customTheme = name;
    applyCustomThemeToDocument(name);
    persistCustomTheme(name);
}

function loadCss(id: string, href: string) {
    if (typeof document === "undefined") {
        return;
    }

    loadStylesheet(id, href);

    if (!project.style.loadedCss.includes(id)) {
        project.style.loadedCss.push(id);
    }
}

function unloadCss(id: string) {
    if (typeof document === "undefined") {
        return;
    }

    unloadStylesheet(id);
    project.style.loadedCss = project.style.loadedCss.filter((item) => item !== id);
}

/**
 * The initial project state.
 */
export const project = reactive<ProjectState>({
    device: {
        isMobile: false,
        isTablet: false,
        viewportWidth: 0,
        viewportHeight: 0,
        mobileBreakpointPx: MOBILE_BREAKPOINT_PX,
        tabletBreakpointPx: TABLET_BREAKPOINT_PX
    },
    labels: {
        siteTitle: ""
    },
    version: {
        current: import.meta.env.VITE_APP_VERSION || "1.0.0",
        checkUrl: import.meta.env.VITE_VERSION_CHECK_URL || ""
    },
    style: {
        activeTheme: DEFAULT_THEME,
        availableThemes: AVAILABLE_THEMES,
        theme: setTheme,
        customTheme: "hodiernus",
        availableCustomThemes: CUSTOM_THEMES,
        setCustomTheme,
        loadedCss: [],
        loadCss,
        unloadCss
    },
    user: {
        name: null
    },
    url: {
        query: urlQuerySnapshot,
        params: urlParamsSnapshot
    },
    route: {
        isLoading: false
    },
    electron: {
        isElectron: false,
        platform: "",
        hasBackend: import.meta.env.VITE_HAS_BACKEND === "true",
        backendReady: import.meta.env.VITE_HAS_BACKEND !== "true",
        backendStatus: "idle",
        backendMessage: ""
    },
    update: {
        supported: false,
        status: "idle",
        message: "",
        currentVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
        availableVersion: null,
        percent: null
    }
});

/**
 * Begins the route loading
 * @returns {void}
 */
function beginRouteLoading() {
    project.route.isLoading = true;
}

/**
 * Ends the route loading
 * @returns {void}
 */
function endRouteLoading() {
    project.route.isLoading = false;
}

/**
 * Wire router so $project.url.query and $project.url.params stay in sync.
 */
export function initProjectRouter(router: Router) {
    syncReactiveQuerySnapshot(router.currentRoute.value.query, urlQuerySnapshot);
    syncReactiveParamsSnapshot(router.currentRoute.value.params, urlParamsSnapshot);

    router.beforeEach(async (to, from) => {
        if (from.matched.length === 0) {
            return;
        }

        if (to.path === from.path) {
            return;
        }

        beginRouteLoading();

        const forceSlow = import.meta.env.DEV && (to.query.slow === "1" || from.query.slow === "1");

        if (forceSlow) {
            await new Promise<void>((resolve) => {
                setTimeout(resolve, 2000);
            });
        }
    });

    router.afterEach((to) => {
        endRouteLoading();
        syncReactiveQuerySnapshot(to.query, urlQuerySnapshot);
        syncReactiveParamsSnapshot(to.params, urlParamsSnapshot);
    });

    router.onError(() => {
        endRouteLoading();
    });
}

/**
 * Update the project state from the viewport size.
 */
function updateDeviceFromViewport() {
    if (typeof window === "undefined") {
        return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    project.device.viewportWidth = width;
    project.device.viewportHeight = height;

    const flags = viewportDeviceFlags(width);
    project.device.isMobile = flags.isMobile;
    project.device.isTablet = flags.isTablet;
}

let deviceWatcherStarted = false;

/**
 * Start watching the viewport size and update the project state accordingly.
 */
function startDeviceWatcher() {
    if (deviceWatcherStarted || typeof window === "undefined") {
        return;
    }

    updateDeviceFromViewport();
    window.addEventListener("resize", updateDeviceFromViewport);
    deviceWatcherStarted = true;
}

/**
 * Applies the backend status to the project state
 * @param {BackendStatus} status The backend status
 * @returns {void}
 */
function applyBackendStatus(status: BackendStatus) {
    project.electron.backendStatus = status.state;
    project.electron.backendMessage = status.message;
    project.electron.backendReady = status.state === "ready" || !project.electron.hasBackend;
}

let electronStarted = false;

/**
 * Initializes the electron
 * @returns {void}
 */
function initElectron() {
    if (electronStarted || typeof window === "undefined") {
        return;
    }

    electronStarted = true;

    const api = window.electronAPI;

    if (!api?.isElectron) {
        project.electron.backendReady = true;
        return;
    }

    project.electron.isElectron = true;
    project.electron.platform = api.platform;

    if (!project.electron.hasBackend) {
        project.electron.backendReady = true;
        return;
    }

    project.electron.backendReady = false;
    project.electron.backendStatus = "starting";

    void api.getBackendStatus().then((status) => {
        applyBackendStatus(status);
    });

    api.onBackendStatus((status) => {
        applyBackendStatus(status);
    });
}

/**
 * Initializes the theme
 * @returns {void}
 */
function initTheme() {
    const storedTheme = readStoredTheme();
    const initialTheme = storedTheme ?? DEFAULT_THEME;

    setTheme(initialTheme);
    setCustomTheme(readStoredCustomTheme() ?? "hodiernus");
}

/**
 * Applies the update status to the project state
 * @param {UpdateStatus} status The update status
 * @returns {void}
 */
function applyUpdateStatus(status: UpdateStatus) {
    project.update.supported = status.supported;
    project.update.status = status.state;
    project.update.message = status.message;
    project.update.currentVersion = status.currentVersion;
    project.update.availableVersion = status.availableVersion ?? null;
    project.update.percent = status.percent ?? null;
    project.version.current = status.currentVersion;
}

let updatesStarted = false;

/**
 * Wire the desktop updater into the reactive state. No-op outside Electron.
 */
function initElectronUpdates(): void {
    if (updatesStarted || typeof window === "undefined") {
        return;
    }

    const api = window.electronAPI;

    if (!api?.isElectron) {
        return;
    }

    updatesStarted = true;

    void api.getUpdateStatus().then((status) => {
        applyUpdateStatus(status);
    });

    api.onUpdateStatus((status) => {
        applyUpdateStatus(status);
    });
}

/**
 * Actions to interact with the project state.
 */
export const projectActions = {
    init() {
        initTheme();
        startDeviceWatcher();
        initElectron();
        initElectronUpdates();
    },

    setSiteTitle(title: string) {
        project.labels.siteTitle = title;
    },

    setUserName(name: string | null) {
        project.user.name = name;
    },

    refreshDevice() {
        updateDeviceFromViewport();
    },

    setTheme(theme: ThemeName) {
        setTheme(theme);
    },

    setCustomTheme(name: CustomThemeName) {
        setCustomTheme(name);
    },

    loadCss(id: string, href: string) {
        loadCss(id, href);
    },

    unloadCss(id: string) {
        unloadCss(id);
    },

    checkForUpdates() {
        return window.electronAPI?.checkForUpdates();
    },

    downloadUpdate() {
        return window.electronAPI?.downloadUpdate();
    },

    installUpdate() {
        return window.electronAPI?.installUpdate();
    }
};

/** The project plugin options type */
export interface ProjectPluginOptions {
    router: Router;
}

/**
 * Plugin to install the project state into the Vue app.
 * @param {App} app The app
 * @param {ProjectPluginOptions} options The options
 * @returns {void}
 */
export const projectPlugin = {
    install(app: App, options?: ProjectPluginOptions) {
        projectActions.init();

        if (options?.router) {
            initProjectRouter(options.router);
        }

        app.config.globalProperties.$project = project;
    }
};

/** The theme name type */
export type { ThemeName } from "../configs/theme/types";
