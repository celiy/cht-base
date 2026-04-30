import type { RouteRecordRaw } from "vue-router";

import MainLayout from "./layouts/MainLayout.vue";
import IndexPage from "./pages/index.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: MainLayout,
        children: [{ path: "", name: "index", component: IndexPage }]
    }
];

export default routes;
