<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import readme from "@repo/README.md?raw";
import { extractMarkdownFromHeading } from "@design/components/internal/markdown";

export default defineComponent({
    name: "DocsAbout",

    computed: {
        source(): string {
            const section = extractMarkdownFromHeading(
                readme,
                "## O que o projeto faz",
                "## Como executar"
            );

            return section;
        }
    }
});
</script>
