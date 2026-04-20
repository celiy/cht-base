import type { App } from "vue";
import type { Router } from "vue-router";
import { reactive } from "vue";
import {
    syncReactiveQuerySnapshot,
    syncReactiveParamsSnapshot
} from "./js/utils/routeUtils";

const MOBILE_BREAKPOINT_PX = 768;

/**
 * URL helpers bound to vue-router (requires initProjectRouter).
 *  - `query`  : reactive snapshot of the querystring (e.g. ?page=2 -> query.page)
 *  - `params` : reactive snapshot of the route params (e.g. /:id -> params.id)
 */
export interface ProjectUrlState {
    query: Record<string, string>;
    params: Record<string, string>;
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
const urlParamsSnapshot = reactive<Record<string, string>>({});

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
        params: urlParamsSnapshot
    }
});

/**
 * Wire router so $project.url.query and $project.url.params stay in sync.
 */
export function initProjectRouter(router: Router) {
    syncReactiveQuerySnapshot(router.currentRoute.value.query, urlQuerySnapshot);
    syncReactiveParamsSnapshot(router.currentRoute.value.params, urlParamsSnapshot);

    router.afterEach((to) => {
        syncReactiveQuerySnapshot(to.query, urlQuerySnapshot);
        syncReactiveParamsSnapshot(to.params, urlParamsSnapshot);
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
