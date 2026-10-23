/**
 * The dev app routes module
 * This module is responsible for the route table of the dev app, with the docs pages taken from the docs pages list.
 */
import type { RouteRecordRaw } from "vue-router";

import Index from "./pages/index.vue";
import DevAppLayout from "./DevAppLayout.vue";
import NotFoundPage from "@design/components/custom/NotFoundPage.vue";
import { DOCS_PAGES } from "./ts/docsPages";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: DevAppLayout,
        children: [
            { path: "", name: "index", component: Index },
            ...DOCS_PAGES.map(page => ({ path: page.path, component: page.load })),
            {
                path: "docs/components/charts",
                redirect: "/docs/components/bar-chart"
            },
            {
                path: ":pathMatch(.*)*",
                name: "not-found",
                component: NotFoundPage,
                props: {
                    homeHref: "/"
                }
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found-root",
        component: NotFoundPage,
        props: {
            homeHref: "/"
        }
    }
];

export default routes;
