import devShellConfig from "../../configs/dev";
import type { SidebarNavItem } from "../../configs/types";

/**
 * Navigation items for the current shell.
 * In client mode uses `__CLIENT_CONFIG__.sidebarNav`, injected by Vite from `configs/<client>.ts`.
 * In dev mode uses `configs/dev.ts`.
 */
export function getSidebarNav(): SidebarNavItem[] {
    const cfg = __CLIENT_CONFIG__;

    if (cfg) {
        return cfg.sidebarNav;
    }

    return devShellConfig.sidebarNav;
}
