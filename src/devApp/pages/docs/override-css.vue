<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsOverrideCss",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# override.css

CSS **só deste cliente**, carregado por cima do \`cht-base/src/css/style.css\` e das utilities Tailwind. Serve para retocar classes globais (\`.hover-ring\`, \`.btn-group\`, containers) sem abrir o design system.

O plugin \`cht-base/vite-plugins/clientOverride.ts\` procura \`<pasta-do-cliente>/src/override.css\`. O nome do ficheiro é fixo. Sem \`CLIENT\` (docs / lab do \`cht-base\`) ou sem o ficheiro, nada é injetado. O template de \`npx chtmain create\` já traz o ficheiro vazio.

## Como entra no HTML

- **Dev:** \`<link rel="stylesheet" href="/__client-override.css">\` no \`body\`, depois do CSS compilado.
- **Build:** o mesmo conteúdo vai para \`client-override.css\` ao lado do \`index.html\`.

Regras **sem** \`@layer\` ganham das utilities em \`@layer utilities\`. Se meteres o override dentro de \`@layer\`, voltas a perder essa vantagem.

Um save no ficheiro faz **full reload** da página (não é HMR de um módulo CSS).

## Exemplo

\`\`\`css
.hover-ring {
    outline-color: var(--color-primary);
}

.container-sm {
    max-width: 42rem;
}

[data-theme="dark"] .btn-group {
    border-color: color-mix(in oklab, var(--color-border) 70%, transparent);
}
\`\`\`

Usa tokens do tema (\`var(--color-primary)\`, etc.), não hex avulso, para light/dark continuarem coerentes. Ver [Temas](/docs/themes) e [Estilização](/docs/styling).

CSS extra **em runtime** (ligar/desligar ficheiros a pedido) não é o override: usa \`$project.style.loadCss\` — documentado em [Temas](/docs/themes).

Utilities Tailwind **novas** (não retocar classes existentes) usam [Plugin Tailwind do cliente](/docs/client-tailwind-plugin).

## O que não fazer

- Não copies componentes do \`cht-design-system\` para mudar 2px de hover — isso é o override.
- Não importes \`override.css\` no Vue; o plugin já o liga.
- Não dependas deste ficheiro no \`cht-base\`: é do cliente, e o núcleo não pode assumir que existe.
`;
        }
    }
});
</script>
