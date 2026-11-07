<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/dev-mode.md?raw";

export default defineComponent({
    name: "DocsDevMode",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
