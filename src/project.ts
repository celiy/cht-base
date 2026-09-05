import type { App } from "vue";
import type { Router } from "vue-router";
import { reactive } from "vue";
import { applyTextContrast } from "@design/textContrast";
import type { ThemeName } from "../configs/theme/types";
import {
    syncReactiveQuerySnapshot,
    syncReactiveParamsSnapshot
} from "./js/utils/routeUtils";

const MOBILE_BREAKPOINT_PX = 768;

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

function parseDefaultTheme(availableThemes: ThemeName[]): ThemeName {
    const configured = import.meta.env.VITE_DEFAULT_THEME;

    if (configured === "light" || configured === "dark") {
        return availableThemes.includes(configured) ? configured : availableThemes[0] ?? "dark";
    }

    return availableThemes[0] ?? "dark";
}

const AVAILABLE_THEMES = parseAvailableThemes();
const DEFAULT_THEME = parseDefaultTheme(AVAILABLE_THEMES);
const THEME_STORAGE_KEY = import.meta.env.VITE_THEME_STORAGE_KEY || "cht-theme:dev";

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
}

/**
 * The current project state.
 */
export interface ProjectState {
    device: {
        isMobile: boolean;
        viewportWidth: number;
        viewportHeight: number;
        mobileBreakpointPx: number;
    };
    labels: {
        siteTitle: string;
    };
    style: ProjectStyleState;
    user: {
        name: string | null;
    };
    url: ProjectUrlState;
    route: {
        isLoading: boolean;
    };
}

const urlQuerySnapshot = reactive<Record<string, string>>({});
const urlParamsSnapshot = reactive<Record<string, string>>({});

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

function applyThemeToDocument(theme: ThemeName) {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.dataset.theme = theme;
    applyTextContrast(document);
}

function setTheme(theme: ThemeName) {
    if (!AVAILABLE_THEMES.includes(theme)) {
        return;
    }

    project.style.activeTheme = theme;
    applyThemeToDocument(theme);
    persistTheme(theme);
}

/**
 * The initial project state.
 */
export const project = reactive<ProjectState>({
    device: {
        isMobile: false,
        viewportWidth: 0,
        viewportHeight: 0,
        mobileBreakpointPx: MOBILE_BREAKPOINT_PX
    },
    labels: {
        siteTitle: ""
    },
    style: {
        activeTheme: DEFAULT_THEME,
        availableThemes: AVAILABLE_THEMES,
        theme: setTheme
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
    }
});

const ROUTE_LOADING_DELAY_MS = 150;

let routeLoadingTimer: ReturnType<typeof setTimeout> | null = null;

function clearRouteLoadingTimer() {
    if (routeLoadingTimer === null) {
        return;
    }

    clearTimeout(routeLoadingTimer);
    routeLoadingTimer = null;
}

function beginRouteLoading() {
    clearRouteLoadingTimer();

    routeLoadingTimer = setTimeout(() => {
        project.route.isLoading = true;
        routeLoadingTimer = null;
    }, ROUTE_LOADING_DELAY_MS);
}

function endRouteLoading() {
    clearRouteLoadingTimer();
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

        const forceSlow = import.meta.env.DEV
            && (to.query.slow === "1" || from.query.slow === "1");

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
    project.device.isMobile = width <= MOBILE_BREAKPOINT_PX;
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

function initTheme() {
    const storedTheme = readStoredTheme();
    const initialTheme = storedTheme ?? DEFAULT_THEME;

    setTheme(initialTheme);
}

/**
 * Actions to interact with the project state.
 */
export const projectActions = {
    init() {
        initTheme();
        startDeviceWatcher();
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
    }
};

export interface ProjectPluginOptions {
    router: Router;
}

/**
 * Plugin to install the project state into the Vue app.
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

export type { ThemeName } from "../configs/theme/types";
