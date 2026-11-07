<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/backend.md?raw";

export default defineComponent({
    name: "DocsBackend",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
