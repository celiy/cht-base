/**
 * The client bootstrap contract module
 * This module is responsible for the shape of `@client/bootstrap` that main.ts consumes.
 */

import type { App } from "vue";
import type { Router, RouterOptions } from "vue-router";

export interface ClientBootstrap {
    setupAuthGuard: (router: Router) => void;
    installClientPlugins: (app: App, router: Router) => void | Promise<void>;
    /**
     * Merged over the base router options. `history` defaults to hash history under `file:`
     * (packaged Electron) and web history elsewhere; `routes` defaults to `@client/routes`.
     */
    routerOptions?: Partial<RouterOptions>;
}
