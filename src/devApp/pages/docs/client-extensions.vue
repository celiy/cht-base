<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/client-extensions.md?raw";

export default defineComponent({
    name: "DocsClientExtensions",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
