<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "./content/http.md?raw";

export default defineComponent({
    name: "DocsHttp",

    computed: {
        source(): string {
            return content;
        }
    }
});
</script>
