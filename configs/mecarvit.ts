import type { ClientConfig } from "./types";

export default {
    name: "mecarvit",
    clientDir: "cht-client-mecarvit",
    siteTitle: "Mecarvit",
    sidebarNav: [
        {
            type: "section" as const,
            label: "Mecarvit"
        },
        {
            type: "link" as const,
            label: "Home",
            link: "/home"
        },
        {
            type: "link" as const,
            label: "Login",
            link: "/login"
        }
    ]
} satisfies ClientConfig;
