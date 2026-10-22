<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";
import content from "./content/client-tailwind-plugin.md?raw";

export default defineComponent({
    name: "DocsClientTailwindPlugin",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
