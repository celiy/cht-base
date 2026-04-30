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
 * Config internal for the base dev mode.
 */
export interface DevShellConfig {
    name: "dev";
    siteTitle: string;
    sidebarNav: SidebarNavItem[];
}

/**
 * Config for a client (sister folder + app shell).
 *
 * `clientDir` is optional. When omitted, the build falls back to the
 * convention `cht-client-<name>` (matching the monorepo's `clients.json`).
 */
export interface ClientConfig {
    name: string;
    clientDir?: string;
    siteTitle: string;
    sidebarNav: SidebarNavItem[];
}
