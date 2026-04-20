import type { App } from "vue";
import type { Router } from "vue-router";
import { reactive } from "vue";
import {
    createProjectUrlParams,
    syncReactiveQuerySnapshot
} from "./js/utils/routeUtils";

const MOBILE_BREAKPOINT_PX = 768;

/**
 * URL helpers bound to vue-router (requires initProjectRouter).
 */
export interface ProjectUrlState {
    /**
     * Reactive snapshot of querystring (string values). Use in templates, e.g. $project.url.query.page
     */
    query: Record<string, string>;
    params: ReturnType<typeof createProjectUrlParams>;
}

/**
 * The current project state.
 */
export interface ProjectState {
    device: {
        isMobile: boolean;
        viewportWidth: number;
        mobileBreakpointPx: number;
    };
    labels: {
        siteTitle: string;
    };
    user: {
        name: string | null;
    };
    url: ProjectUrlState;
}

const urlQuerySnapshot = reactive<Record<string, string>>({});

let routerRef: Router | null = null;

const urlParams = createProjectUrlParams(() => {
    if (!routerRef) {
        throw new Error("[project] Router not ready: call app.use(projectPlugin, { router }) before mount.");
    }

    return routerRef;
});

/**
 * The initial project state.
 */
export const project = reactive<ProjectState>({
    device: {
        isMobile: false,
        viewportWidth: 0,
        mobileBreakpointPx: MOBILE_BREAKPOINT_PX
    },
    labels: {
        siteTitle: ""
    },
    user: {
        name: null
    },
    url: {
        query: urlQuerySnapshot,
        params: urlParams
    }
});

/**
 * Wire router query sync and store router for $project.url.params.*.
 */
export function initProjectRouter(router: Router) {
    routerRef = router;

    syncReactiveQuerySnapshot(router.currentRoute.value.query, urlQuerySnapshot);

    router.afterEach((to) => {
        syncReactiveQuerySnapshot(to.query, urlQuerySnapshot);
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

    project.device.viewportWidth = width;
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

/**
 * Actions to interact with the project state.
 */
export const projectActions = {
    init() {
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
