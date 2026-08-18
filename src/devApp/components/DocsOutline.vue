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
                :active="heading.id === activeId"
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
            scrollRaf: 0
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.collectHeadings();
            this.bindScrollSpy();
            this.updateActiveHeading();
            this.scrollToHash();
        });
    },

    beforeUnmount() {
        this.unbindScrollSpy();
    },

    methods: {
        /**
         * Finds page `h1` and section `h3` headings, assigns hash ids, and fills the outline.
         */
        collectHeadings() {
            const root = this.$refs.contentRef as HTMLElement | undefined;

            if (!root) {
                this.headings = [];

                return;
            }

            const used = new Map<string, number>();
            const next: OutlineHeading[] = [];

            for (const heading of Array.from(root.querySelectorAll("h1, h3"))) {
                const label = heading.textContent?.trim() ?? "";

                if (!label) {
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
                next.push({ id, label });
            }

            this.headings = next;
            this.activeId = next[0]?.id ?? "";
        },

        /**
         * Listens to the docs pane scroll to highlight the heading nearest the viewport center.
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
         * Marks the outline link whose heading is closest to the vertical center of the scroll pane.
         */
        updateActiveHeading() {
            if (this.headings.length === 0) {
                this.activeId = "";

                return;
            }

            const firstHeading = this.headings[0];

            if (!firstHeading) {
                this.activeId = "";

                return;
            }

            const scroller = this.scrollParent ?? document.documentElement;
            const scrollerRect = scroller.getBoundingClientRect();
            const centerY = scrollerRect.top + scrollerRect.height / 2;
            let bestId = firstHeading.id;
            let bestDist = Number.POSITIVE_INFINITY;

            for (const heading of this.headings) {
                const el = document.getElementById(heading.id);

                if (!el) {
                    continue;
                }

                const rect = el.getBoundingClientRect();
                const headingCenter = rect.top + rect.height / 2;
                const dist = Math.abs(headingCenter - centerY);

                if (dist < bestDist) {
                    bestDist = dist;
                    bestId = heading.id;
                }
            }

            this.activeId = bestId;
        },

        /**
         * Scrolls to the heading matching the current URL hash, if any.
         */
        scrollToHash() {
            const hash = this.$route.hash.replace(/^#/, "");

            if (!hash) {
                return;
            }

            const target = document.getElementById(hash);

            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }
});
</script>
