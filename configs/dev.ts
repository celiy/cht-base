import type { DevShellConfig } from "./types";

export default {
    name: "dev",
    siteTitle: "cht-base dev",
    sidebarNav: [
        {
            type: "section" as const,
            label: "Dev"
        },
        {
            type: "link" as const,
            label: "Dev design",
            link: "/devDesign"
        },
        {
            type: "link" as const,
            label: "Dev form",
            link: "/devForm"
        }
    ]
} satisfies DevShellConfig;
