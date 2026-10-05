/**
 * The runtime stylesheet module
 * This module is responsible for injecting and removing CSS files at runtime of the project.
 */

export const RUNTIME_STYLESHEET_PREFIX = "cht-runtime-css-";

type StylesheetLinkLike = {
    href: string;
    rel: string;
    sheet?: unknown;
    addEventListener?: (
        type: string,
        listener: () => void,
        options?: { once?: boolean }
    ) => void;
};

const STYLESHEET_WAIT_MS = 8000;

export function stylesheetLinkId(id: string): string {
    return RUNTIME_STYLESHEET_PREFIX + id;
}

export function loadStylesheet(id: string, href: string, doc: Document = document): StylesheetLinkLike {
    const linkId = stylesheetLinkId(id);
    const existing = doc.getElementById(linkId);
    const el = isHrefLink(existing) ? existing : createStylesheetLink(doc, linkId, existing);

    el.href = href;

    return el;
}

/**
 * Resolves when `el` has applied CSS, or after a timeout so boot cannot hang.
 *
 * @param el Stylesheet link
 * @returns Settled wait
 */
export function whenStylesheetReady(el: StylesheetLinkLike): Promise<void> {
    if (el.sheet) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        let settled = false;
        let timer: ReturnType<typeof setTimeout> | undefined;

        const done = () => {
            if (settled) {
                return;
            }

            settled = true;

            if (timer !== undefined) {
                globalThis.clearTimeout(timer);
            }

            resolve();
        };

        el.addEventListener?.("load", done, { once: true });
        el.addEventListener?.("error", done, { once: true });

        timer = globalThis.setTimeout(done, STYLESHEET_WAIT_MS);

        if (el.sheet) {
            done();
        }
    });
}

function isHrefLink(el: Element | null): el is HTMLLinkElement {
    return Boolean(el && "href" in el && "rel" in el);
}

function createStylesheetLink(
    doc: Document,
    linkId: string,
    existing: Element | null
): HTMLLinkElement {
    existing?.remove();

    const el = doc.createElement("link") as HTMLLinkElement;
    el.id = linkId;
    el.rel = "stylesheet";
    doc.head.appendChild(el);

    return el;
}

export function unloadStylesheet(id: string, doc: Document = document): void {
    doc.getElementById(stylesheetLinkId(id))?.remove();
}

export async function waitForDocumentStyles(doc: Document = document): Promise<void> {
    const links = [...doc.querySelectorAll("link[rel=\"stylesheet\"]")].filter(isHrefLink);

    await Promise.all(links.map((link) => whenStylesheetReady(link)));

    if (typeof requestAnimationFrame !== "function") {
        return;
    }

    await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
    });
}
