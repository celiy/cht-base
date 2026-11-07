<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/client-tailwind-plugin.md?raw";

export default defineComponent({
    name: "DocsClientTailwindPlugin",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
