export interface SidebarNavSection {
    type: "section";
    label: string;
}

export interface SidebarNavLink {
    type: "link";
    label: string;
    link: string;
}

export interface SidebarNavGroupLink {
    label: string;
    link: string;
}

export interface SidebarNavGroup {
    type: "group";
    label: string;
    open: boolean;
    links: SidebarNavGroupLink[];
}

export type SidebarNavItem =
    | SidebarNavSection
    | SidebarNavLink
    | SidebarNavGroup;

/**
 * Config do modo dev do base (sem `CLIENT` no Vite).
 */
export interface DevShellConfig {
    name: "dev";
    siteTitle: string;
    sidebarNav: SidebarNavItem[];
}

/**
 * Config de um cliente (pasta irmã + shell da app).
 */
export interface ClientConfig {
    name: string;
    clientDir: string;
    siteTitle: string;
    sidebarNav: SidebarNavItem[];
}
