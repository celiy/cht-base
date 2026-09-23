<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsThemes",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# Temas

O tema ativo fica em \`$project.style.activeTheme\` (\`light\` ou \`dark\`) e no \`document.documentElement.dataset.theme\`. A persistência usa \`localStorage\` com a chave \`VITE_THEME_STORAGE_KEY\`.

## Alternar no cliente

\`\`\`ts
import { project } from "@base/project";

function toggleTheme() {
    const next = project.style.activeTheme === "dark" ? "light" : "dark";

    project.style.theme(next);
}
\`\`\`

## \`theme.config.json\`

Fica em \`cht-client-<nome>/src/theme.config.json\` (ou \`theme\` no \`cht.config.json\`). O plugin de Vite gera o CSS (\`virtual:client-theme\`).

\`\`\`json
{
    "default": "dark",
    "radius": "xl",
    "themes": {
        "dark": {
            "colors": {
                "primary": "oklch(0.7 0.15 250)"
            }
        }
    }
}
\`\`\`

| Campo | Efeito |
| --- | --- |
| \`default\` | Tema inicial se não houver valor no \`localStorage\` |
| \`radius\` | Raio global (ex. \`xl\`) |
| \`themes.light/dark.colors\` | Sobrescreve tokens (primary, background, …) |

Cores em Tailwind usam classes **completas** (\`bg-primary\`, não \`bg-\${cor}\`) para o JIT as gerar.
`;
        }
    }
});
</script>
