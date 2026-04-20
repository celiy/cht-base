import type { Component } from "vue";
import type { RouteRecordRaw } from "vue-router";

/**
 * Eagerly-loaded pages from the active client under `@client/pages/**\/*.vue`.
 * When no client is active, this resolves to an empty stub folder and returns {}.
 */
const pageModules = import.meta.glob("@client/pages/**/*.vue");

/**
 * Convert a file path like `/.../pages/foo/[id]/bar.vue` to an absolute vue-router path.
 *
 * Rules:
 *  - strip everything up to and including `/pages`
 *  - drop `.vue`
 *  - `index` segments become the parent path
 *  - `[param]` segments become `:param`
 *  - empty string becomes `/`
 */
function filePathToAbsoluteRoute(filePath: string): string {
    const withoutPrefix = filePath.replace(/^.*\/pages/, "");
    const withoutExt = withoutPrefix.replace(/\.vue$/, "");
    const withoutIndex = withoutExt.replace(/\/index$/, "");
    const withParams = withoutIndex.replace(/\[([^\]]+)\]/g, ":$1");

    return withParams === "" ? "/" : withParams;
}

/**
 * Derive a unique, human-friendly route name from its file path.
 * e.g. `/.../pages/[id]/product.vue` -> `:id/product`.
 */
function filePathToName(filePath: string): string {
    const route = filePathToAbsoluteRoute(filePath);

    return route === "/" ? "index" : route.slice(1);
}

/**
 * Turn an absolute path (`/`, `/foo`, `/:id/bar`) into a child path segment
 * for a parent route with `path: '/'`.
 */
function absoluteRouteToChildPath(absolutePath: string): string {
    if (absolutePath === "/") {
        return "";
    }

    return absolutePath.startsWith("/") ? absolutePath.slice(1) : absolutePath;
}

/**
 * Page routes as **children** of a layout parent (`path: '/'`, component shell).
 */
export function buildClientPageChildren(): RouteRecordRaw[] {
    const children: RouteRecordRaw[] = [];

    for (const [file, loader] of Object.entries(pageModules)) {
        const absolutePath = filePathToAbsoluteRoute(file);

        const route: RouteRecordRaw = {
            path: absoluteRouteToChildPath(absolutePath),
            name: filePathToName(file),
            component: loader as () => Promise<Component>
        };

        children.push(route);
    }

    return children;
}
