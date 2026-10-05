/**
 * The docs component catalog module
 * This module is responsible for mapping docs slugs to design-system components of the project.
 */

import {
    parseNamedStringUnions,
    propsTableRows,
    resolveDocsComponentNames,
    type DocsComponentPropsTable
} from "./docsComponentProps";

type CatalogComponent = {
    name?: string;
    props?: unknown;
};

const vueGlob = {
    ...import.meta.glob("../../../../cht-design-system/src/components/*.vue", { eager: true }),
    ...import.meta.glob("../../../../cht-design-system/src/components/custom/*.vue", { eager: true }),
    ...import.meta.glob("../../../../cht-design-system/src/components/custom/charts/*.vue", {
        eager: true
    }),
    ...import.meta.glob("../../../../cht-design-system/src/components/internal/*.vue", {
        eager: true
    }),
    ...import.meta.glob("../../../../cht-design-system/src/components/form/*.vue", { eager: true })
} as Record<string, { default: CatalogComponent }>;

const vueSourceGlob = {
    ...import.meta.glob("../../../../cht-design-system/src/components/*.vue", {
        eager: true,
        query: "?raw",
        import: "default"
    }),
    ...import.meta.glob("../../../../cht-design-system/src/components/custom/*.vue", {
        eager: true,
        query: "?raw",
        import: "default"
    }),
    ...import.meta.glob("../../../../cht-design-system/src/components/custom/charts/*.vue", {
        eager: true,
        query: "?raw",
        import: "default"
    }),
    ...import.meta.glob("../../../../cht-design-system/src/components/internal/*.vue", {
        eager: true,
        query: "?raw",
        import: "default"
    }),
    ...import.meta.glob("../../../../cht-design-system/src/components/form/*.vue", {
        eager: true,
        query: "?raw",
        import: "default"
    })
} as Record<string, string>;

const sharedTypeGlob = import.meta.glob("../../../../cht-shared/src/constants/*.ts", {
    eager: true,
    query: "?raw",
    import: "default"
}) as Record<string, string>;

const catalogByName = new Map<string, { component: CatalogComponent; source: string }>();
const namedUnions: Record<string, string[]> = {};

for (const source of Object.values(sharedTypeGlob)) {
    Object.assign(namedUnions, parseNamedStringUnions(source));
}

for (const source of Object.values(vueSourceGlob)) {
    Object.assign(namedUnions, parseNamedStringUnions(source));
}

for (const [path, mod] of Object.entries(vueGlob)) {
    const component = mod.default;
    const file = path.split("/").pop()?.replace(/\.vue$/, "") ?? "";
    const name = component?.name || file;

    if (name) {
        catalogByName.set(name, {
            component,
            source: vueSourceGlob[path] ?? ""
        });
    }
}

/**
 * Builds Props tables for a component docs slug.
 *
 * @param slug Docs route slug
 * @returns One table per matching component
 */
export function docsPropsTablesForSlug(slug: string | null): DocsComponentPropsTable[] {
    if (!slug) {
        return [];
    }

    const names = resolveDocsComponentNames(slug, [...catalogByName.keys()]);

    return names
        .map((name) => {
            const entry = catalogByName.get(name);

            return {
                name,
                rows: propsTableRows(entry?.component, entry?.source, namedUnions)
            };
        })
        .filter((table) => table.rows.length > 0);
}
