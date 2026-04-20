import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import DevDesign from "./views/DevDesign.vue";
import DevForm from "./views/DevForm.vue";
import { buildClientPageChildren } from "./clientRouter";
import AppShellWithSidebar from "./layouts/AppShellWithSidebar.vue";

/**
 * Dev playground: `/devDesign` e `/devForm` com layout com sidebar (rotas aninhadas).
 */
const devRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: AppShellWithSidebar,
        children: [
            { path: "devDesign", name: "dev-design", component: DevDesign },
            { path: "devForm", name: "dev-form", component: DevForm }
        ]
    }
];

/**
 * Cliente: páginas file-based como filhos de `/` com o mesmo layout com sidebar.
 */
const clientRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: AppShellWithSidebar,
        children: buildClientPageChildren()
    }
];

const routes: RouteRecordRaw[] = __CLIENT_CONFIG__ ? clientRoutes : devRoutes;

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
