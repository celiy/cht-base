<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";
import readme from "@repo/README.md?raw";
import { extractMarkdownFromHeading } from "../../ts/markdown";

export default defineComponent({
    name: "DocsInstallation",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            const section = extractMarkdownFromHeading(
                readme,
                "## Como executar",
                "### 2) Rodar ambiente de desenvolvimento"
            );

            return `# Installation\n\n${section}`;
        }
    }
});
</script>
