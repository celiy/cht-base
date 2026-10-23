/**
 * The Freedom Lab bootstrap module
 * This module is responsible for the auth guard, plugins and router options of the client.
 */

import type { App } from "vue";
import type { Router, RouterOptions } from "vue-router";

export const routerOptions: Partial<RouterOptions> = {
    linkActiveClass: "lab-link-active",
    scrollBehavior(to) {
        return to.hash ? { el: to.hash } : { top: 0 };
    }
};

export function setupAuthGuard(_router: Router): void {
    void _router;
}

export async function installClientPlugins(app: App, _router: Router): Promise<void> {
    void _router;
    // Global error hook without any base support.
    app.config.errorHandler = (error) => {
        console.error("[freedom-lab] erro capturado:", error);
    };
}
