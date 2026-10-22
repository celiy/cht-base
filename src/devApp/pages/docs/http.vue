<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";
import content from "./content/http.md?raw";

export default defineComponent({
    name: "DocsHttp",

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
