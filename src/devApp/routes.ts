import type { RouteRecordRaw } from "vue-router";

import DevDesign from "../views/DevDesign.vue";
import DevForm from "../views/DevForm.vue";
import Index from "../views/index.vue";
import ComponentsLayout from "./DocsLayout.vue";
import DevLayout from "./DevLayout.vue";
import docs from "./pages/docs/docs.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: DevLayout,
        children: [
            { path: "", name: "index", component: Index },
            { path: "devDesign", name: "dev-design", component: DevDesign },
            { path: "devForm", name: "dev-form", component: DevForm }
        ]
    },
    {
        path: "/docs",
        component: ComponentsLayout,
        redirect: { name: "components-accordion" },
        children: [
            { path: "", name: "docs", component: docs },
            { path: "/docs/components/accordion", name: "components-accordion", component: () => import("./pages/docs/components/accordion.vue") },
            { path: "/docs/components/badges", name: "components-badges", component: () => import("./pages/docs/components/badges.vue") },
            { path: "/docs/components/buttons", name: "components-buttons", component: () => import("./pages/docs/components/buttons.vue") },
            { path: "/docs/components/card", name: "components-card", component: () => import("./pages/docs/components/card.vue") },
            { path: "/docs/components/carousel", name: "components-carousel", component: () => import("./pages/docs/components/carousel.vue") },
            { path: "/docs/components/checkbox", name: "components-checkbox", component: () => import("./pages/docs/components/checkbox.vue") },
            { path: "/docs/components/drawer", name: "components-drawer", component: () => import("./pages/docs/components/drawer.vue") },
            { path: "/docs/components/dropdown", name: "components-dropdown", component: () => import("./pages/docs/components/dropdown.vue") },
            { path: "/docs/components/inputs", name: "components-inputs", component: () => import("./pages/docs/components/inputs.vue") },
            { path: "/docs/components/modal", name: "components-modal", component: () => import("./pages/docs/components/modal.vue") },
            { path: "/docs/components/pagination", name: "components-pagination", component: () => import("./pages/docs/components/pagination.vue") },
            { path: "/docs/components/popover", name: "components-popover", component: () => import("./pages/docs/components/popover.vue") },
            { path: "/docs/components/progressbar", name: "components-progressbar", component: () => import("./pages/docs/components/progressbar.vue") },
            { path: "/docs/components/radio", name: "components-radio", component: () => import("./pages/docs/components/radio.vue") },
            { path: "/docs/components/select", name: "components-select", component: () => import("./pages/docs/components/select.vue") },
            { path: "/docs/components/sidebar", name: "components-sidebar", component: () => import("./pages/docs/components/sidebar.vue") },
            { path: "/docs/components/table", name: "components-table", component: () => import("./pages/docs/components/table.vue") },
            { path: "/docs/components/tabs", name: "components-tabs", component: () => import("./pages/docs/components/tabs.vue") }
        ]
    }
];

export default routes;
