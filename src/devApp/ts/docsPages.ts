/**
 * The dev app docs pages module
 * This module is responsible for the single list of docs pages, from which routes, navigation and readiness are derived.
 */
import type { Component } from "vue";

export type ComponentReadinessStatus = "success" | "info" | "warning" | "destructive";

export type DocsNavGroup = {
    label: string;
    openByDefault?: boolean;
};

export type DocsPage = {
    path: string;
    label: string;
    icon: string;
    section: string;
    group?: DocsNavGroup;
    readiness?: ComponentReadinessStatus;
    load: () => Promise<{ default: Component }>;
};

const DOCS = "Docs";
const SYSTEM = "Sistema";
const FUNDAMENTALS = "Fundamentos";
const COMPONENTS = "Componentes";
const CUSTOM = "Custom";
const CHARTS = "Charts";
const FORM = "Form";

const INTRO_GROUP: DocsNavGroup = { label: "Introdução", openByDefault: true };
const GUIDE_GROUP: DocsNavGroup = { label: "Guia", openByDefault: true };

/**
 * Ordered list of the docs pages. The order here is the order of the navigation.
 */
export const DOCS_PAGES: DocsPage[] = [
    {
        path: "/docs",
        label: "Bem-Vindo",
        icon: "fa-book",
        section: DOCS,
        group: INTRO_GROUP,
        load: () => import("../pages/docs/docs.vue")
    },
    {
        path: "/docs/about",
        label: "Sobre",
        icon: "fa-book",
        section: DOCS,
        group: INTRO_GROUP,
        load: () => import("../pages/docs/about.vue")
    },
    {
        path: "/docs/installation",
        label: "Instalação",
        icon: "fa-book",
        section: DOCS,
        group: INTRO_GROUP,
        load: () => import("../pages/docs/installation.vue")
    },
    {
        path: "/docs/usage",
        label: "Uso",
        icon: "fa-book",
        section: DOCS,
        group: INTRO_GROUP,
        load: () => import("../pages/docs/usage.vue")
    },
    {
        path: "/docs/create-client",
        label: "Criar frontend",
        icon: "fa-book",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/create-client.vue")
    },
    {
        path: "/docs/backend",
        label: "Criar backend",
        icon: "fa-book",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/backend.vue")
    },
    {
        path: "/docs/cht-config",
        label: "cht.config",
        icon: "fa-book",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/cht-config.vue")
    },
    {
        path: "/docs/dev-mode",
        label: "Modo dev",
        icon: "fa-book",
        section: SYSTEM,
        group: GUIDE_GROUP,
        readiness: "warning",
        load: () => import("../pages/docs/dev-mode.vue")
    },
    {
        path: "/docs/override-css",
        label: "CSS do cliente",
        icon: "fa-palette",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/override-css.vue")
    },
    {
        path: "/docs/client-tailwind-plugin",
        label: "Plugin Tailwind do cliente",
        icon: "fa-palette",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/client-tailwind-plugin.vue")
    },
    {
        path: "/docs/client-extensions",
        label: "Extensões do cliente",
        icon: "fa-puzzle-piece",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/client-extensions.vue")
    },
    {
        path: "/docs/themes",
        label: "Temas",
        icon: "fa-palette",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/themes.vue")
    },
    {
        path: "/docs/custom-themes",
        label: "Temas do sistema",
        icon: "fa-palette",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/custom-themes.vue")
    },
    {
        path: "/docs/websocket",
        label: "Websocket",
        icon: "fa-book",
        section: SYSTEM,
        group: GUIDE_GROUP,
        readiness: "warning",
        load: () => import("../pages/docs/websocket.vue")
    },
    {
        path: "/docs/project",
        label: "$project",
        icon: "fa-book",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/project.vue")
    },
    {
        path: "/docs/http",
        label: "$http",
        icon: "fa-book",
        section: SYSTEM,
        group: GUIDE_GROUP,
        load: () => import("../pages/docs/http.vue")
    },
    {
        path: "/docs/components/colors",
        label: "Cores",
        icon: "fa-palette",
        section: FUNDAMENTALS,
        load: () => import("../pages/docs/components/colors.vue")
    },
    {
        path: "/docs/styling",
        label: "Estilização",
        icon: "fa-palette",
        section: FUNDAMENTALS,
        load: () => import("../pages/docs/styling.vue")
    },
    {
        path: "/docs/components/toast",
        label: "Toasts",
        icon: "fa-cube",
        section: FUNDAMENTALS,
        readiness: "info",
        load: () => import("../pages/docs/components/toast.vue")
    },
    {
        path: "/docs/components/tooltip",
        label: "Tooltips",
        icon: "fa-cube",
        section: FUNDAMENTALS,
        readiness: "info",
        load: () => import("../pages/docs/components/tooltip.vue")
    },
    {
        path: "/docs/components/typography",
        label: "Tipografia",
        icon: "fa-font",
        section: FUNDAMENTALS,
        load: () => import("../pages/docs/components/typography.vue")
    },
    {
        path: "/docs/components/accordion",
        label: "Acordion",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/accordion.vue")
    },
    {
        path: "/docs/components/avatar",
        label: "Avatar",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/avatar.vue")
    },
    {
        path: "/docs/components/badges",
        label: "Badges",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/badges.vue")
    },
    {
        path: "/docs/components/buttons",
        label: "Button & Btn Group",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/buttons.vue")
    },
    {
        path: "/docs/components/card",
        label: "Card",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/card.vue")
    },
    {
        path: "/docs/components/carousel",
        label: "Carousel",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "info",
        load: () => import("../pages/docs/components/carousel.vue")
    },
    {
        path: "/docs/components/checkbox",
        label: "Checkbox & Switch",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/checkbox.vue")
    },
    {
        path: "/docs/components/chip",
        label: "Chip",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "info",
        load: () => import("../pages/docs/components/chip.vue")
    },
    {
        path: "/docs/components/drawer",
        label: "Drawer",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "warning",
        load: () => import("../pages/docs/components/drawer.vue")
    },
    {
        path: "/docs/components/dropdown",
        label: "Dropdown",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/dropdown.vue")
    },
    {
        path: "/docs/components/floating-panel",
        label: "Floating Panel",
        icon: "fa-cube",
        section: COMPONENTS,
        load: () => import("../pages/docs/components/floating-panel.vue")
    },
    {
        path: "/docs/components/inputs",
        label: "Inputs",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/inputs.vue")
    },
    {
        path: "/docs/components/image",
        label: "Image",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/image.vue")
    },
    {
        path: "/docs/components/item",
        label: "Item",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/item.vue")
    },
    {
        path: "/docs/components/keybind",
        label: "Keybind",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/keybind.vue")
    },
    {
        path: "/docs/components/marker",
        label: "Marker / Separator",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/marker.vue")
    },
    {
        path: "/docs/components/media-uploader",
        label: "Media uploader",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "warning",
        load: () => import("../pages/docs/components/media-uploader.vue")
    },
    {
        path: "/docs/components/modal",
        label: "Modal",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/modal.vue")
    },
    {
        path: "/docs/components/option",
        label: "Option",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/option.vue")
    },
    {
        path: "/docs/components/options-list",
        label: "Options List",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/options-list.vue")
    },
    {
        path: "/docs/components/popover",
        label: "Popover",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/popover.vue")
    },
    {
        path: "/docs/components/progressbar",
        label: "Progress Bar / Slider",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "warning",
        load: () => import("../pages/docs/components/progressbar.vue")
    },
    {
        path: "/docs/components/qr-code",
        label: "QR code",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/qr-code.vue")
    },
    {
        path: "/docs/components/radio",
        label: "Radio",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/radio.vue")
    },
    {
        path: "/docs/components/scrollable",
        label: "Scrollable",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "destructive",
        load: () => import("../pages/docs/components/scrollable.vue")
    },
    {
        path: "/docs/components/select",
        label: "Select",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/select.vue")
    },
    {
        path: "/docs/components/skeleton",
        label: "Skeleton",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/skeleton.vue")
    },
    {
        path: "/docs/components/table",
        label: "Table",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "info",
        load: () => import("../pages/docs/components/table.vue")
    },
    {
        path: "/docs/components/tabs",
        label: "Tabs",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/tabs.vue")
    },
    {
        path: "/docs/components/toggle",
        label: "Toggle",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "info",
        load: () => import("../pages/docs/components/toggle.vue")
    },
    {
        path: "/docs/components/toggleable",
        label: "Toggleable",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "info",
        load: () => import("../pages/docs/components/toggleable.vue")
    },
    {
        path: "/docs/components/viewport-center",
        label: "ViewportCenter",
        icon: "fa-cube",
        section: COMPONENTS,
        readiness: "success",
        load: () => import("../pages/docs/components/viewport-center.vue")
    },
    {
        path: "/docs/components/custom-tooltip",
        label: "Custom Tooltip",
        icon: "fa-cube",
        section: CUSTOM,
        readiness: "info",
        load: () => import("../pages/docs/components/custom-tooltip.vue")
    },
    {
        path: "/docs/components/chat",
        label: "Chat",
        icon: "fa-cube",
        section: CUSTOM,
        readiness: "destructive",
        load: () => import("../pages/docs/components/chat.vue")
    },
    {
        path: "/docs/components/confirmation-modal",
        label: "Confirmation modal",
        icon: "fa-cube",
        section: CUSTOM,
        readiness: "success",
        load: () => import("../pages/docs/components/confirmation-modal.vue")
    },
    {
        path: "/docs/components/context-menu",
        label: "Context menu",
        icon: "fa-cube",
        section: CUSTOM,
        readiness: "info",
        load: () => import("../pages/docs/components/context-menu.vue")
    },
    {
        path: "/docs/components/pagination",
        label: "Pagination",
        icon: "fa-cube",
        section: CUSTOM,
        readiness: "success",
        load: () => import("../pages/docs/components/pagination.vue")
    },
    {
        path: "/docs/components/resizable",
        label: "Resizable",
        icon: "fa-cube",
        section: CUSTOM,
        readiness: "warning",
        load: () => import("../pages/docs/components/resizable.vue")
    },
    {
        path: "/docs/components/sidebar",
        label: "Sidebar",
        icon: "fa-cube",
        section: CUSTOM,
        readiness: "info",
        load: () => import("../pages/docs/components/sidebar.vue")
    },
    {
        path: "/docs/components/steps",
        label: "Steps",
        icon: "fa-cube",
        section: CUSTOM,
        load: () => import("../pages/docs/components/steps.vue")
    },
    {
        path: "/docs/components/bar-chart",
        label: "Bar chart",
        icon: "fa-chart-column",
        section: CHARTS,
        readiness: "info",
        load: () => import("../pages/docs/components/bar-chart.vue")
    },
    {
        path: "/docs/components/wave-chart",
        label: "Wave chart",
        icon: "fa-chart-area",
        section: CHARTS,
        readiness: "info",
        load: () => import("../pages/docs/components/wave-chart.vue")
    },
    {
        path: "/docs/components/form-renderer",
        label: "Form renderer",
        icon: "fa-cube",
        section: FORM,
        readiness: "warning",
        load: () => import("../pages/docs/components/form-renderer.vue")
    }
];
