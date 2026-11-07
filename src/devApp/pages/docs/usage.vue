<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import readme from "@repo/README.md?raw";
import { extractMarkdownFromHeading } from "@design/components/internal/markdown";

export default defineComponent({
    name: "DocsUsage",

    computed: {
        source(): string {
            const section = extractMarkdownFromHeading(
                readme,
                "### 2) Rodar ambiente de desenvolvimento"
            );

            return `# Usage\n\n${section}`;
        }
    }
});
</script>
