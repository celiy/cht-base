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
        children: [
            { path: "", name: "docs", component: docs },
            { path: "components/accordion", name: "components-accordion", component: () => import("./pages/docs/components/accordion.vue") },
            { path: "components/badges", name: "components-badges", component: () => import("./pages/docs/components/badges.vue") },
            { path: "components/buttons", name: "components-buttons", component: () => import("./pages/docs/components/buttons.vue") },
            { path: "components/card", name: "components-card", component: () => import("./pages/docs/components/card.vue") },
            { path: "components/carousel", name: "components-carousel", component: () => import("./pages/docs/components/carousel.vue") },
            { path: "components/checkbox", name: "components-checkbox", component: () => import("./pages/docs/components/checkbox.vue") },
            { path: "components/drawer", name: "components-drawer", component: () => import("./pages/docs/components/drawer.vue") },
            { path: "components/dropdown", name: "components-dropdown", component: () => import("./pages/docs/components/dropdown.vue") },
            { path: "components/inputs", name: "components-inputs", component: () => import("./pages/docs/components/inputs.vue") },
            { path: "components/modal", name: "components-modal", component: () => import("./pages/docs/components/modal.vue") },
            { path: "components/confirmation-modal", name: "components-confirmation-modal", component: () => import("./pages/docs/components/confirmation-modal.vue") },
            { path: "components/pagination", name: "components-pagination", component: () => import("./pages/docs/components/pagination.vue") },
            { path: "components/popover", name: "components-popover", component: () => import("./pages/docs/components/popover.vue") },
            { path: "components/progressbar", name: "components-progressbar", component: () => import("./pages/docs/components/progressbar.vue") },
            { path: "components/radio", name: "components-radio", component: () => import("./pages/docs/components/radio.vue") },
            { path: "components/select", name: "components-select", component: () => import("./pages/docs/components/select.vue") },
            { path: "components/sidebar", name: "components-sidebar", component: () => import("./pages/docs/components/sidebar.vue") },
            { path: "components/table", name: "components-table", component: () => import("./pages/docs/components/table.vue") },
            { path: "components/tabs", name: "components-tabs", component: () => import("./pages/docs/components/tabs.vue") },
            { path: "components/charts", name: "components-charts", component: () => import("./pages/docs/components/charts.vue") },
            { path: "components/media-uploader", name: "components-media-uploader", component: () => import("./pages/docs/components/media-uploader.vue") },
            { path: "components/form-renderer", name: "components-form-renderer", component: () => import("./pages/docs/components/form-renderer.vue") },
            { path: "components/toast", name: "components-toast", component: () => import("./pages/docs/components/toast.vue") },
            { path: "components/tooltip", name: "components-tooltip", component: () => import("./pages/docs/components/tooltip.vue") },
            { path: "components/colors", name: "components-colors", component: () => import("./pages/docs/components/colors.vue") }
        ]
    }
];

export default routes;
