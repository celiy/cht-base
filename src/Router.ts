import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import DevDesign from "./views/DevDesign.vue";
import DevForm from "./views/DevForm.vue";
import Index from "./views/index.vue";
import { buildClientPageChildren } from "./clientRouter";
import AppShellWithSidebar from "./layouts/AppShellWithSidebar.vue";

/**
 * Dev playground: `/devDesign` and `/devForm` with layout with sidebar (nested routes).
 */
const devRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: AppShellWithSidebar,
        children: [
            { path: "/", name: "index", component: Index },
            { path: "devDesign", name: "dev-design", component: DevDesign },
            { path: "devForm", name: "dev-form", component: DevForm }
        ]
    }
];

/**
 * Client: pages file-based as children of `/` with the same layout with sidebar.
 */
const clientRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: AppShellWithSidebar,
        children: buildClientPageChildren()
    }
];

/**
 * Routes for the current mode.
 * In client mode uses `clientRoutes`, in dev mode uses `devRoutes`.
 */
const routes: RouteRecordRaw[] = __CLIENT_CONFIG__ ? clientRoutes : devRoutes;

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
