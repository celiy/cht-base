<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";
import readme from "@repo/README.md?raw";
import { extractMarkdownFromHeading } from "../../ts/markdown";

export default defineComponent({
    name: "DocsUsage",

    components: {
        DocsMarkdown
    },

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
