/// <reference types="vite/client" />

import type { Router, RouteLocationNormalizedLoaded } from "vue-router";
import type { ProjectState } from "./project";

declare module "vue" {
    interface ComponentCustomProperties {
        $router: Router;
        $route: RouteLocationNormalizedLoaded;
        $project: ProjectState;
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $router: Router;
        $route: RouteLocationNormalizedLoaded;
        $project: ProjectState;
    }
}

export {};
