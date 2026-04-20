import devShellConfig from "../../configs/dev";
import type { SidebarNavItem } from "../../configs/types";

/**
 * Itens da sidebar para o shell atual.
 * Em modo cliente usa `__CLIENT_CONFIG__.sidebarNav` (injeto pelo Vite a partir de `configs/<cliente>.ts`).
 * Em modo dev usa `configs/dev.ts`.
 */
export function getSidebarNav(): SidebarNavItem[] {
    const cfg = __CLIENT_CONFIG__;

    if (cfg) {
        return cfg.sidebarNav;
    }

    return devShellConfig.sidebarNav;
}
