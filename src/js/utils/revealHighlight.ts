/**
 * The reveal highlight module
 * This module is responsible for the page-wide border glow that follows the pointer of the project.
 */

export const REVEAL_CLASS = "reveal-highlight";
export const REVEAL_LAYER_CLASS = "cht-reveal-layer";
export const REVEAL_SIZE_REM = 12;
export const REVEAL_CUSTOM_THEME = "hodiernus";

/**
 * Reveal runs only when the flag is on and the custom theme is hodiernus.
 */
export function isRevealHighlightRuntimeEnabled(
    revealHighlight: boolean,
    customTheme: string
): boolean {
    return revealHighlight && customTheme === REVEAL_CUSTOM_THEME;
}

/**
 * Disables reveal at startup when the benchmark score is below the threshold.
 * Uncomment `MIN_REVEAL_HIGHLIGHT_PERFORMANCE_SCORE` and set your cutoff.
 *
 * @param style Project style slice (`revealHighlight` is mutated when gated)
 * @param performanceScore Result from `getDevicePerformanceScore`
 */
export function applyRevealHighlightPerformanceGate(
    style: { revealHighlight: boolean },
    performanceScore: number
): void {
    const MIN_REVEAL_HIGHLIGHT_PERFORMANCE_SCORE = 4000;

    if (performanceScore < MIN_REVEAL_HIGHLIGHT_PERFORMANCE_SCORE) {
        style.revealHighlight = false;
    }

    void style;
    void performanceScore;
}

const SKIP_TAGS = new Set([
    "AREA",
    "BASE",
    "BR",
    "COL",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR",
    "TEXTAREA",
    "SELECT",
    "OPTION",
    "IFRAME",
    "VIDEO",
    "AUDIO",
    "CANVAS",
    "SVG"
]);

type RevealEntry = {
    layer: HTMLElement;
    resizeObserver: ResizeObserver;
    local: boolean;
    rect: DOMRect | null;
    radiusPx: number;
};

type GetEnabled = () => boolean;

type ContainingBlockStyle = {
    transform: string;
    filter: string;
    perspective: string;
    willChange: string;
};

const registry = new Map<HTMLElement, RevealEntry>();
const localHosts = new Set<HTMLElement>();

let getEnabled: GetEnabled = () => true;
let started = false;
let attached = false;
let mutationObserver: MutationObserver | null = null;
let mutationRaf = 0;
let pointerRaf = 0;
let pendingX: number | null = null;
let pendingY: number | null = null;
let lastX = Number.NaN;
let lastY = Number.NaN;
let finePointerMq: MediaQueryList | null = null;
let reducedMotionMq: MediaQueryList | null = null;

/**
 * Checks if the browser supports the reveal mask.
 * @param supportsFn - The function to check if the browser supports the reveal mask.
 * @returns True if the browser supports the reveal mask, false otherwise.
 */
export function supportsRevealMask(
    supportsFn: ((property: string, value: string) => boolean) | undefined = typeof CSS !==
        "undefined" && typeof CSS.supports === "function"
        ? CSS.supports.bind(CSS)
        : undefined
): boolean {
    if (!supportsFn) {
        return false;
    }

    return (
        supportsFn("mask-image", "linear-gradient(#fff, #fff)") ||
        supportsFn("mask-composite", "exclude") ||
        supportsFn("-webkit-mask-composite", "xor")
    );
}

/**
 * Parses the border width from a string.
 * @param value - The string to parse.
 * @returns The border width in pixels.
 */
export function parseBorderPx(value: string): number {
    const parsed = Number.parseFloat(value);

    if (!Number.isFinite(parsed) || parsed < 0) {
        return 0;
    }

    return parsed;
}

export function isUniformPositiveBorder(
    top: number,
    right: number,
    bottom: number,
    left: number
): boolean {
    return top > 0 && top === right && right === bottom && bottom === left;
}

/**
 * Calculates the reveal radius in pixels.
 * @param rootFontPx - The root font size in pixels.
 * @param sizeRem - The size in rem.
 * @returns The reveal radius in pixels.
 */
export function revealRadiusPx(rootFontPx: number, sizeRem: number = REVEAL_SIZE_REM): number {
    return sizeRem * rootFontPx;
}

/**
 * Checks if the pointer is outside the reveal radius.
 * @param pointerX - The x coordinate of the pointer.
 * @param pointerY - The y coordinate of the pointer.
 * @param rect - The bounding rectangle of the element.
 * @param radiusPx - The radius in pixels.
 * @returns True if the pointer is outside the reveal radius, false otherwise.
 */
export function isOutsideRevealRadius(
    pointerX: number,
    pointerY: number,
    rect: { left: number; top: number; right: number; bottom: number },
    radiusPx: number
): boolean {
    const dx =
        pointerX < rect.left
            ? rect.left - pointerX
            : pointerX > rect.right
              ? pointerX - rect.right
              : 0;
    const dy =
        pointerY < rect.top
            ? rect.top - pointerY
            : pointerY > rect.bottom
              ? pointerY - rect.bottom
              : 0;

    return dx * dx + dy * dy > radiusPx * radiusPx;
}

/**
 * Checks if the style creates a containing block.
 * @param style - The style to check.
 * @returns True if the style creates a containing block, false otherwise.
 */
export function styleCreatesContainingBlock(style: ContainingBlockStyle): boolean {
    if (style.transform !== "none" && style.transform !== "") {
        return true;
    }

    if (style.filter !== "none" && style.filter !== "") {
        return true;
    }

    if (style.perspective !== "none" && style.perspective !== "") {
        return true;
    }

    const parts = style.willChange.split(",");

    for (const part of parts) {
        const value = part.trim();

        if (value === "transform" || value === "filter" || value === "perspective") {
            return true;
        }
    }

    return false;
}

/**
 * Applies the reveal highlight document flag.
 * @param enabled - True if the reveal highlight is enabled, false otherwise.
 * @param root - The root element.
 */
export function applyRevealHighlightDocumentFlag(
    enabled: boolean,
    root: { dataset: DOMStringMap | Record<string, string | undefined> } = document.documentElement
): void {
    if (enabled) {
        delete root.dataset.revealHighlight;
        return;
    }

    root.dataset.revealHighlight = "off";
}

/**
 * Initializes the reveal highlight engine.
 * @param readEnabled - The function to read the enabled state.
 */
export function initRevealHighlightEngine(readEnabled: GetEnabled): void {
    if (started || typeof window === "undefined" || typeof document === "undefined") {
        return;
    }

    started = true;
    getEnabled = readEnabled;
    finePointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    finePointerMq.addEventListener("change", syncRevealHighlightEngine);
    reducedMotionMq.addEventListener("change", syncRevealHighlightEngine);
    document.addEventListener("visibilitychange", syncRevealHighlightEngine);
    syncRevealHighlightEngine();
}

/**
 * Synchronizes the reveal highlight engine.
 */
export function syncRevealHighlightEngine(): void {
    if (!started || typeof document === "undefined") {
        return;
    }

    const effective = isEffectivelyEnabled();

    applyRevealHighlightDocumentFlag(effective);

    if (effective) {
        attachEngine();
        return;
    }

    detachEngine();
}

/**
 * Checks if the reveal highlight engine is effectively enabled.
 * @returns True if the reveal highlight engine is effectively enabled, false otherwise.
 */
function isEffectivelyEnabled(): boolean {
    if (!getEnabled()) {
        return false;
    }

    if (typeof document !== "undefined" && document.hidden) {
        return false;
    }

    if (reducedMotionMq?.matches) {
        return false;
    }

    if (finePointerMq && !finePointerMq.matches) {
        return false;
    }

    return supportsRevealMask();
}

/**
 * Attaches the reveal highlight engine.
 */
function attachEngine(): void {
    if (attached || typeof document === "undefined") {
        return;
    }

    attached = true;
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true, capture: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    mutationObserver = new MutationObserver(onMutations);
    mutationObserver.observe(document.body ?? document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class"]
    });

    for (const [host, entry] of registry) {
        if (host.isConnected) {
            entry.resizeObserver.observe(host);
        }
    }

    reconcile();
}

/**
 * Detaches the reveal highlight engine.
 */
function detachEngine(): void {
    if (!attached) {
        return;
    }

    attached = false;
    document.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScrollOrResize, true);
    window.removeEventListener("resize", onScrollOrResize);
    mutationObserver?.disconnect();
    mutationObserver = null;

    if (mutationRaf) {
        cancelAnimationFrame(mutationRaf);
        mutationRaf = 0;
    }

    if (pointerRaf) {
        cancelAnimationFrame(pointerRaf);
        pointerRaf = 0;
    }

    pendingX = null;
    pendingY = null;

    for (const entry of registry.values()) {
        entry.resizeObserver.disconnect();
    }
}

/**
 * Handles the pointer move event.
 * @param event - The pointer event.
 */
function onPointerMove(event: PointerEvent): void {
    pendingX = event.clientX;
    pendingY = event.clientY;

    if (pointerRaf) {
        return;
    }

    pointerRaf = requestAnimationFrame(flushPointer);
}

/**
 * Flushes the pointer.
 */
function flushPointer(): void {
    pointerRaf = 0;

    if (pendingX === null || pendingY === null) {
        return;
    }

    if (pendingX === lastX && pendingY === lastY) {
        return;
    }

    lastX = pendingX;
    lastY = pendingY;
    document.documentElement.style.setProperty("--cht-reveal-x", `${lastX}px`);
    document.documentElement.style.setProperty("--cht-reveal-y", `${lastY}px`);
    updateLocalTargets(lastX, lastY);
}

/**
 * Handles the scroll or resize event.
 */
function onScrollOrResize(): void {
    for (const host of localHosts) {
        const entry = registry.get(host);

        if (entry) {
            entry.rect = null;
        }
    }

    if (Number.isNaN(lastX) || Number.isNaN(lastY)) {
        return;
    }

    updateLocalTargets(lastX, lastY);
}

/**
 * Updates the local targets.
 * @param pointerX - The x coordinate of the pointer.
 * @param pointerY - The y coordinate of the pointer.
 */
function updateLocalTargets(pointerX: number, pointerY: number): void {
    if (localHosts.size === 0) {
        return;
    }

    for (const host of localHosts) {
        const entry = registry.get(host);

        if (!entry) {
            continue;
        }

        if (!entry.rect) {
            entry.rect = host.getBoundingClientRect();
        }

        const rect = entry.rect;

        if (isOutsideRevealRadius(pointerX, pointerY, rect, entry.radiusPx)) {
            host.style.setProperty("--cht-reveal-x", "-9999px");
            host.style.setProperty("--cht-reveal-y", "-9999px");
            continue;
        }

        host.style.setProperty("--cht-reveal-x", `${pointerX - rect.left}px`);
        host.style.setProperty("--cht-reveal-y", `${pointerY - rect.top}px`);
    }
}

/**
 * Handles the mutations.
 */
function onMutations(): void {
    if (mutationRaf) {
        return;
    }

    mutationRaf = requestAnimationFrame(() => {
        mutationRaf = 0;
        reconcile();
    });
}

/**
 * Reconciles the reveal highlight engine.
 */
function reconcile(): void {
    if (!attached || typeof document === "undefined") {
        return;
    }

    for (const host of [...registry.keys()]) {
        if (!host.isConnected || !host.classList.contains(REVEAL_CLASS)) {
            unregister(host);
        }
    }

    const nodes = document.querySelectorAll(`.${REVEAL_CLASS}`);

    for (const node of nodes) {
        if (node instanceof HTMLElement) {
            register(node);
        }
    }
}

/**
 * Registers a host.
 * @param host - The host to register.
 */
function register(host: HTMLElement): void {
    if (SKIP_TAGS.has(host.tagName)) {
        return;
    }

    const existing = registry.get(host);

    if (existing) {
        if (!existing.layer.isConnected) {
            host.appendChild(existing.layer);
        }

        return;
    }

    const layer = document.createElement("span");

    layer.className = REVEAL_LAYER_CLASS;
    layer.setAttribute("aria-hidden", "true");

    const local = hostHasTransformedAncestor(host);

    if (local) {
        layer.dataset.revealLocal = "";
        localHosts.add(host);
    }

    const resizeObserver = new ResizeObserver(() => {
        syncHostMetrics(host);
        const entry = registry.get(host);

        if (entry) {
            entry.rect = null;
        }
    });

    const entry: RevealEntry = {
        layer,
        resizeObserver,
        local,
        rect: null,
        radiusPx: readRadiusPx()
    };

    registry.set(host, entry);
    syncHostMetrics(host);
    host.appendChild(layer);
    resizeObserver.observe(host);
}

/**
 * Unregisters a host.
 * @param host - The host to unregister.
 */
function unregister(host: HTMLElement): void {
    const entry = registry.get(host);

    if (!entry) {
        return;
    }

    entry.resizeObserver.disconnect();
    entry.layer.remove();

    host.style.removeProperty("--cht-reveal-x");
    host.style.removeProperty("--cht-reveal-y");
    host.style.removeProperty("--cht-reveal-bt");
    host.style.removeProperty("--cht-reveal-br");
    host.style.removeProperty("--cht-reveal-bb");
    host.style.removeProperty("--cht-reveal-bl");
    localHosts.delete(host);
    registry.delete(host);
}

/**
 * Synchronizes the host metrics.
 * @param host - The host to sync.
 */
function syncHostMetrics(host: HTMLElement): void {
    const entry = registry.get(host);

    if (!entry) {
        return;
    }

    const style = getComputedStyle(host);
    const top = parseBorderPx(style.borderTopWidth);
    const right = parseBorderPx(style.borderRightWidth);
    const bottom = parseBorderPx(style.borderBottomWidth);
    const left = parseBorderPx(style.borderLeftWidth);

    host.style.setProperty("--cht-reveal-bt", `${top}px`);
    host.style.setProperty("--cht-reveal-br", `${right}px`);
    host.style.setProperty("--cht-reveal-bb", `${bottom}px`);
    host.style.setProperty("--cht-reveal-bl", `${left}px`);
    entry.layer.dataset.revealMask = isUniformPositiveBorder(top, right, bottom, left)
        ? "ring"
        : "sides";
    entry.radiusPx = readRadiusPx();
}

/**
 * Reads the radius in pixels.
 * @returns The radius in pixels.
 */
function readRadiusPx(): number {
    const fontPx = parseBorderPx(getComputedStyle(document.documentElement).fontSize) || 16;

    return revealRadiusPx(fontPx);
}

/**
 * Checks if the host has a transformed ancestor.
 * @param host - The host to check.
 * @returns True if the host has a transformed ancestor, false otherwise.
 */
function hostHasTransformedAncestor(host: HTMLElement): boolean {
    let current: HTMLElement | null = host;

    while (current && current !== document.documentElement) {
        const style = getComputedStyle(current);

        if (
            styleCreatesContainingBlock({
                transform: style.transform,
                filter: style.filter,
                perspective: style.perspective,
                willChange: style.willChange
            })
        ) {
            return true;
        }

        current = current.parentElement;
    }

    return false;
}
