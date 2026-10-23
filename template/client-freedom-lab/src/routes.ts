/**
 * The Freedom Lab routes module
 * This module is responsible for the routes of the client.
 */

import type { RouteRecordRaw } from "vue-router";

import IndexPage from "./pages/index.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "index",
        component: IndexPage
    },
    {
        path: "/graphics",
        name: "graphics",
        component: () => import("./pages/graphics.vue")
    },
    {
        path: "/files",
        name: "files",
        component: () => import("./pages/files.vue")
    }
];

export default routes;
