<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/versioning.md?raw";

export default defineComponent({
    name: "DocsVersioning",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
