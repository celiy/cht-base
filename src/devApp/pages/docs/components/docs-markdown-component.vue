<template>
    <DocsMarkdown :source="source" />

    <article class="container-sm mb-16 flex flex-col gap-4">
        <h3>Exemplo</h3>

        <DocsExample label="bare">
            <div class="p-4">
                <DocsMarkdown
                    bare
                    :source="sample"
                />
            </div>
        </DocsExample>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "../content/docs-markdown.md?raw";

export default defineComponent({
    name: "DocsDocsMarkdown",

    computed: {
        source(): string {
            return content;
        },

        sample(): string {
            return [
                "## Primeiros passos",
                "",
                "Rode `npm install` e depois **inicie o servidor**.",
                "",
                "1. Instale",
                "2. Configure",
                "",
                "| Comando | Efeito |",
                "| --- | --- |",
                "| `dev` | Sobe o servidor. |"
            ].join("\n");
        }
    }
});
</script>
