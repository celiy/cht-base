/// <reference types="vite/client" />

import type { Router, RouteLocationNormalizedLoaded } from "vue-router";
import type { ProjectState } from "./project";
import type { ToastApi } from "@design/toast/toast";

declare module "vue" {
    interface ComponentCustomProperties {
        $router: Router;
        $route: RouteLocationNormalizedLoaded;
        $project: ProjectState;
        $toast: ToastApi;
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $router: Router;
        $route: RouteLocationNormalizedLoaded;
        $project: ProjectState;
        $toast: ToastApi;
    }
}

declare module "*.md?raw" {
    const content: string;
    export default content;
}

declare module "*.md" {
    const content: string;
    export default content;
}

export {};
