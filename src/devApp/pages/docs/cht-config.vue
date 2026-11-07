<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/cht-config.md?raw";

export default defineComponent({
    name: "DocsChtConfig",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
