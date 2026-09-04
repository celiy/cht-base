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

    interface GlobalDirectives {
        vTooltip: import("vue").Directive<HTMLElement, string | {
            content: string;
            placement?: "top" | "bottom" | "left" | "right" | "center";
            html?: boolean;
            offset?: number;
            maxWidth?: string;
        }>;
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $router: Router;
        $route: RouteLocationNormalizedLoaded;
        $project: ProjectState;
        $toast: ToastApi;
    }

    interface GlobalDirectives {
        vTooltip: import("vue").Directive<HTMLElement, string | {
            content: string;
            placement?: "top" | "bottom" | "left" | "right" | "center";
            html?: boolean;
            offset?: number;
            maxWidth?: string;
        }>;
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
