<template>
    <a
        class="block w-full text-left text-sm cursor-pointer transition-all no-underline!"
        :class="[
            active ? 'text-primary hover:brightness-150' : 'hover:text-foreground! text-foreground/50!',
            indentClass
        ]"

        :href="href"

        @click.prevent="onClick"
    >
        {{ label }}
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "DocsTocLink",

    emits: ["select"],

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
         * When true, the link is fully opaque (heading nearest the top of the pane).
         */
        active: {
            type: Boolean,
            default: false
        },

        /**
         * Heading level (`1`–`3`) used for left indent.
         */
        level: {
            type: Number,
            default: 1
        }
    },

    computed: {
        href(): string {
            return `#${this.sectionId}`;
        },

        indentClass(): string {
            if (this.level >= 3) {
                return "pl-6";
            }

            if (this.level === 2) {
                return "pl-3";
            }

            return "pl-0";
        }
    },

    methods: {
        /**
         * Asks the outline to scroll to this heading.
         */
        onClick() {
            this.$emit("select", this.sectionId);
        }
    }
});
</script>
