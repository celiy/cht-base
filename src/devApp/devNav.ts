/**
 * Dev shell sidebar (lab routes). Same shape as Sidebar `navItems`.
 */
export const devNav = [
    {
        type: "section" as const,
        label: "Dev"
    },
    {
        type: "link" as const,
        label: "Home",
        link: "/"
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
];
