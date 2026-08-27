import type { RouteRecordRaw } from "vue-router";

import Index from "../views/index.vue";
import DevAppLayout from "./DevAppLayout.vue";
import docs from "./pages/docs/docs.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: DevAppLayout,
        children: [
            { path: "", name: "index", component: Index },
            { path: "/docs", name: "docs", component: docs },
            { path: "docs/about", name: "docs-about", component: () => import("./pages/docs/about.vue") },
            { path: "docs/installation", name: "docs-installation", component: () => import("./pages/docs/installation.vue") },
            { path: "docs/usage", name: "docs-usage", component: () => import("./pages/docs/usage.vue") },
            { path: "docs/components/accordion", name: "components-accordion", component: () => import("./pages/docs/components/accordion.vue") },
            { path: "docs/components/avatar", name: "components-avatar", component: () => import("./pages/docs/components/avatar.vue") },
            { path: "docs/components/badges", name: "components-badges", component: () => import("./pages/docs/components/badges.vue") },
            { path: "docs/components/buttons", name: "components-buttons", component: () => import("./pages/docs/components/buttons.vue") },
            { path: "docs/components/chat", name: "components-chat", component: () => import("./pages/docs/components/chat.vue") },
            { path: "docs/components/card", name: "components-card", component: () => import("./pages/docs/components/card.vue") },
            { path: "docs/components/carousel", name: "components-carousel", component: () => import("./pages/docs/components/carousel.vue") },
            { path: "docs/components/checkbox", name: "components-checkbox", component: () => import("./pages/docs/components/checkbox.vue") },
            { path: "docs/components/context-menu", name: "components-context-menu", component: () => import("./pages/docs/components/context-menu.vue") },
            { path: "docs/components/drawer", name: "components-drawer", component: () => import("./pages/docs/components/drawer.vue") },
            { path: "docs/components/dropdown", name: "components-dropdown", component: () => import("./pages/docs/components/dropdown.vue") },
            { path: "docs/components/inputs", name: "components-inputs", component: () => import("./pages/docs/components/inputs.vue") },
            { path: "docs/components/item", name: "components-item", component: () => import("./pages/docs/components/item.vue") },
            { path: "docs/components/marker", name: "components-marker", component: () => import("./pages/docs/components/marker.vue") },
            { path: "docs/components/modal", name: "components-modal", component: () => import("./pages/docs/components/modal.vue") },
            { path: "docs/components/confirmation-modal", name: "components-confirmation-modal", component: () => import("./pages/docs/components/confirmation-modal.vue") },
            { path: "docs/components/pagination", name: "components-pagination", component: () => import("./pages/docs/components/pagination.vue") },
            { path: "docs/components/resizable", name: "components-resizable", component: () => import("./pages/docs/components/resizable.vue") },
            { path: "docs/components/popover", name: "components-popover", component: () => import("./pages/docs/components/popover.vue") },
            { path: "docs/components/progressbar", name: "components-progressbar", component: () => import("./pages/docs/components/progressbar.vue") },
            { path: "docs/components/radio", name: "components-radio", component: () => import("./pages/docs/components/radio.vue") },
            { path: "docs/components/select", name: "components-select", component: () => import("./pages/docs/components/select.vue") },
            { path: "docs/components/sidebar", name: "components-sidebar", component: () => import("./pages/docs/components/sidebar.vue") },
            { path: "docs/components/steps", name: "components-steps", component: () => import("./pages/docs/components/steps.vue") },
            { path: "docs/components/skeleton", name: "components-skeleton", component: () => import("./pages/docs/components/skeleton.vue") },
            { path: "docs/components/table", name: "components-table", component: () => import("./pages/docs/components/table.vue") },
            { path: "docs/components/tabs", name: "components-tabs", component: () => import("./pages/docs/components/tabs.vue") },
            { path: "docs/components/charts", name: "components-charts", component: () => import("./pages/docs/components/charts.vue") },
            { path: "docs/components/media-uploader", name: "components-media-uploader", component: () => import("./pages/docs/components/media-uploader.vue") },
            { path: "docs/components/form-renderer", name: "components-form-renderer", component: () => import("./pages/docs/components/form-renderer.vue") },
            { path: "docs/components/toast", name: "components-toast", component: () => import("./pages/docs/components/toast.vue") },
            { path: "docs/components/tooltip", name: "components-tooltip", component: () => import("./pages/docs/components/tooltip.vue") },
            { path: "docs/components/colors", name: "components-colors", component: () => import("./pages/docs/components/colors.vue") },
            { path: "docs/components/typography", name: "components-typography", component: () => import("./pages/docs/components/typography.vue") }
        ]
    }
];

export default routes;
