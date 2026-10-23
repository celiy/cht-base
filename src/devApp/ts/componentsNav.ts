/**
 * The dev app docs navigation module
 * This module is responsible for the sidebar tree of the docs, built from the docs pages list.
 */
import { DOCS_PAGES, type DocsPage } from "./docsPages";

export type NavSection = { type: "section"; label: string };

export type NavLinkItem = { label: string; link: string; searchIcon: string };

export type NavGroup = {
    type: "group";
    label: string;
    openByDefault?: boolean;
    links: NavLinkItem[];
};

export type NavLink = NavLinkItem & { type: "link" };

export type NavItem = NavSection | NavGroup | NavLink;

/**
 * Builds the nav tree in the same order the pages are declared
 */
function buildNav(pages: DocsPage[]): NavItem[] {
    const items: NavItem[] = [];
    let section: string | undefined;
    let group: NavGroup | undefined;

    for (const page of pages) {
        if (page.section !== section) {
            section = page.section;
            group = undefined;
            items.push({ type: "section", label: section });
        }

        const link = { label: page.label, link: page.path, searchIcon: page.icon };

        if (!page.group) {
            items.push({ type: "link", ...link });
            continue;
        }

        if (group?.label !== page.group.label) {
            group = {
                type: "group",
                label: page.group.label,
                openByDefault: page.group.openByDefault,
                links: []
            };
            items.push(group);
        }

        group.links.push(link);
    }

    return items;
}

export const componentsNav: NavItem[] = buildNav(DOCS_PAGES);
