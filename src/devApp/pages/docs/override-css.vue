<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/override-css.md?raw";

export default defineComponent({
    name: "DocsOverrideCss",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
