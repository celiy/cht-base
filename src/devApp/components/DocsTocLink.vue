<template>
    <a
        class="block w-full text-left text-sm text-foreground cursor-pointer transition-opacity duration-150"
        :class="active ? 'opacity-100' : 'opacity-40 hover:opacity-100'"

        :href="href"

        @click.prevent="scrollToSection"
    >
        {{ label }}
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "DocsTocLink",

    props: {
        /**
         * Heading `id` to scroll to (`#section-id`).
         */
        sectionId: {
            type: String,
            required: true
        },

        /**
         * Visible label, usually the heading text.
         */
        label: {
            type: String,
            required: true
        },

        /**
         * When true, the link is fully opaque (heading nearest the viewport center).
         */
        active: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        href(): string {
            return `#${this.sectionId}`;
        }
    },

    methods: {
        /**
         * Smooth-scrolls to the heading and updates the URL hash.
         */
        scrollToSection() {
            const target = document.getElementById(this.sectionId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            this.$router.replace({
                path: this.$route.path,
                query: this.$route.query,
                hash: this.href
            });
        }
    }
});
</script>
