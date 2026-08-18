<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";
import readme from "@repo/README.md?raw";

export default defineComponent({
    name: "DocsAbout",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return readme;
        }
    }
});
</script>
