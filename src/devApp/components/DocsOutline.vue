<template>
    <div class="flex items-start w-full min-w-0">
        <div
            ref="contentRef"

            class="min-w-0 flex-1"
        >
            <slot />
        </div>

        <nav
            v-if="headings.length > 0"

            class="hidden lg:flex sticky top-0 shrink-0 w-44 flex-col gap-1 pr-6 pt-8"
            aria-label="On this page"
        >
            <DocsTocLink
                v-for="heading in headings"
                :key="heading.id"

                :section-id="heading.id"
                :label="heading.label"
                :level="heading.level"
                :active="heading.id === activeId"

                @select="onSelectHeading"
            />
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsTocLink from "./DocsTocLink.vue";

type OutlineHeading = {
    id: string;
    label: string;
    level: number;
};

/**
 * Finds the nearest ancestor that scrolls vertically.
 *
 * @param el Element inside the scroll area
 * @returns Scroll container, or the document element
 */
function findScrollParent(el: HTMLElement | null): HTMLElement {
    let node = el?.parentElement ?? null;

    while (node && node !== document.body) {
        const overflowY = getComputedStyle(node).overflowY;

        if (overflowY === "auto" || overflowY === "scroll") {
            return node;
        }

        node = node.parentElement;
    }

    return document.documentElement;
}

/**
 * Builds a URL slug from heading text.
 *
 * @param text Heading text
 * @returns Kebab-case id
 */
function slugifyHeading(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default defineComponent({
    name: "DocsOutline",

    components: {
        DocsTocLink
    },

    data() {
        return {
            headings: [] as OutlineHeading[],
            activeId: "",
            scrollParent: null as HTMLElement | null,
            scrollRaf: 0,
            collectRaf: 0,
            headingObserver: null as MutationObserver | null,
            clickLockId: "",
            clickLockUntil: 0
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.collectHeadings();
            this.bindHeadingObserver();
            this.bindScrollSpy();
            this.updateActiveHeading();
            this.scrollToHash();
        });
    },

    beforeUnmount() {
        this.unbindHeadingObserver();
        this.unbindScrollSpy();
        this.clearCollectRaf();
    },

    methods: {
        /**
         * Finds page `h1`, `h2` and `h3` headings, assigns hash ids, and fills the outline.
         */
        collectHeadings() {
            const root = this.$refs.contentRef as HTMLElement | undefined;

            if (!root) {
                this.headings = [];

                return;
            }

            const used = new Map<string, number>();
            const next: OutlineHeading[] = [];

            for (const heading of Array.from(root.querySelectorAll("h1, h2, h3"))) {
                const label = heading.textContent?.trim() ?? "";

                if (!label) {
                    continue;
                }

                if (typeof heading.checkVisibility === "function" && !heading.checkVisibility()) {
                    continue;
                }

                let id = heading.id || slugifyHeading(label) || "section";
                const count = used.get(id) ?? 0;
                used.set(id, count + 1);

                if (count > 0) {
                    id = `${id}-${count + 1}`;
                }

                heading.id = id;
                heading.classList.add("scroll-mt-8");

                const level = Number(heading.tagName.replace("H", "")) || 1;

                next.push({ id, label, level });
            }

            this.headings = next;

            if (!next.some((heading) => heading.id === this.activeId)) {
                this.activeId = next[0]?.id ?? "";
            }
        },

        /**
         * Re-collects headings when the page DOM changes (v-for, tabs, etc.).
         */
        bindHeadingObserver() {
            const root = this.$refs.contentRef as HTMLElement | undefined;

            if (!root) {
                return;
            }

            this.unbindHeadingObserver();
            this.headingObserver = new MutationObserver(this.onHeadingDomChange);
            this.headingObserver.observe(root, {
                childList: true,
                subtree: true,
                characterData: true
            });
        },

        /**
         * Disconnects the heading MutationObserver.
         */
        unbindHeadingObserver() {
            this.headingObserver?.disconnect();
            this.headingObserver = null;
        },

        /**
         * Schedules a heading re-scan after a DOM mutation.
         */
        onHeadingDomChange() {
            this.scheduleCollect();
        },

        /**
         * Debounces collectHeadings to the next animation frame.
         */
        scheduleCollect() {
            if (this.collectRaf) {
                return;
            }

            this.collectRaf = requestAnimationFrame(() => {
                this.collectRaf = 0;
                this.collectHeadings();
                this.updateActiveHeading();
            });
        },

        /**
         * Cancels a pending heading collect frame.
         */
        clearCollectRaf() {
            if (!this.collectRaf) {
                return;
            }

            cancelAnimationFrame(this.collectRaf);
            this.collectRaf = 0;
        },

        /**
         * Listens to the docs pane scroll to highlight the heading at the top of the viewport.
         */
        bindScrollSpy() {
            const root = this.$refs.contentRef as HTMLElement | undefined;
            this.scrollParent = findScrollParent(root ?? null);
            this.scrollParent.addEventListener("scroll", this.onScrollParentScroll, { passive: true });
            window.addEventListener("resize", this.onScrollParentScroll);
        },

        /**
         * Removes scroll-spy listeners.
         */
        unbindScrollSpy() {
            this.scrollParent?.removeEventListener("scroll", this.onScrollParentScroll);
            window.removeEventListener("resize", this.onScrollParentScroll);
            this.scrollParent = null;

            if (this.scrollRaf) {
                cancelAnimationFrame(this.scrollRaf);
                this.scrollRaf = 0;
            }
        },

        /**
         * Schedules an active-heading update on the next frame.
         */
        onScrollParentScroll() {
            if (this.scrollRaf) {
                return;
            }

            this.scrollRaf = requestAnimationFrame(() => {
                this.scrollRaf = 0;
                this.updateActiveHeading();
            });
        },

        /**
         * Marks the outline link whose heading last crossed the top of the scroll pane.
         */
        updateActiveHeading() {
            if (this.headings.length === 0) {
                this.activeId = "";

                return;
            }

            if (Date.now() < this.clickLockUntil && this.clickLockId) {
                this.activeId = this.clickLockId;

                return;
            }

            const firstHeading = this.headings[0];

            if (!firstHeading) {
                this.activeId = "";

                return;
            }

            const scroller = this.scrollParent ?? document.documentElement;
            const scrollerRect = scroller.getBoundingClientRect();
            const probeY = scrollerRect.top + 40;
            let bestId = firstHeading.id;

            for (const heading of this.headings) {
                const el = document.getElementById(heading.id);

                if (!el) {
                    continue;
                }

                if (el.getBoundingClientRect().top <= probeY) {
                    bestId = heading.id;
                }
            }

            this.activeId = bestId;
        },

        /**
         * Scrolls the heading to the top of the pane and keeps it highlighted.
         *
         * @param id Heading element id
         */
        onSelectHeading(id: string) {
            this.activeId = id;
            this.clickLockId = id;
            this.clickLockUntil = Date.now() + 800;

            const root = this.$refs.contentRef as HTMLElement | undefined;
            let target = document.getElementById(id);

            if (!target && root) {
                this.collectHeadings();
                target = document.getElementById(id);
            }

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            const url = new URL(window.location.href);
            history.replaceState(history.state, "", `${url.pathname}${url.search}#${id}`);
        },

        /**
         * Scrolls to the heading matching the current URL hash, if any.
         */
        scrollToHash() {
            const hash = this.$route.hash.replace(/^#/, "");

            if (!hash) {
                return;
            }

            this.onSelectHeading(hash);
        }
    }
});
</script>
