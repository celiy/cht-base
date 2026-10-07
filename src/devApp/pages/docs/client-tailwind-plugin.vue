<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsClientTailwindPlugin",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# Plugin Tailwind do cliente

O \`cht-base\` já gera utilities globais (por exemplo bordas coloridas em \`borderUtilitiesPlugin.js\`). O cliente **não** tem um Tailwind próprio, mas pode acrescentar utilities **só deste cliente** com um plugin opcional.

Ficheiro fixo: \`<pasta-do-cliente>/src/tailwind.plugin.js\`. Sem \`CLIENT\` (docs / lab) ou sem o ficheiro, o marcador em \`style.css\` é removido e nada é injetado. O template de \`npx chtmain create\` já traz um plugin vazio.

O Vite plugin \`cht-base/vite-plugins/clientTailwindPlugin.ts\` troca \`@plugin "virtual:client-tailwind-plugin"\` no \`cht-base/src/css/style.css\` pelo caminho do ficheiro do cliente ativo.

## Formato

O export default é um plugin Tailwind v4, igual ao da base:

\`\`\`js
import plugin from "tailwindcss/plugin";

export default plugin(({ addUtilities }) => {
    addUtilities({
        ".demo-stripe": {
            "border-top-width": "3px",
            "border-top-style": "solid",
            "border-top-color": "var(--color-primary)"
        }
    });
});
\`\`\`

O cliente precisa da dependência \`tailwindcss\` (já está no template). Usa tokens (\`var(--color-primary)\`, etc.) para light/dark continuarem coerentes.

As classes novas **têm** de aparecer como texto no \`src/\` do cliente (template, \`:class\`, mapa de strings). O scan do Tailwind não vê nomes montados em runtime (\`demo-\${name}\`).

## override.css vs plugin

| | \`override.css\` | \`tailwind.plugin.js\` |
| --- | --- | --- |
| O quê | CSS à mão por cima do bundle | Novas **utilities** no pipeline Tailwind |
| Quando | Retocar \`.hover-ring\`, containers, vidro | Padrões tipo \`border-*\` só deste cliente |
| Scan | Irrelevante | A classe precisa existir no código |

Ver [override.css](/docs/override-css) e [Estilização](/docs/styling).

O cliente de teste \`override-demo\` usa \`demo-stripe\` na home.

## O que não fazer

- Não copies o \`borderUtilitiesPlugin.js\` da base para o cliente só para repetir o mesmo padrão — isso continua no núcleo.
- Não importes \`tailwind.plugin.js\` no Vue; o Vite já o liga via \`style.css\`.
- Não assumas o ficheiro no \`cht-base\` em runtime: o núcleo só injeta o caminho se o ficheiro existir.
`;
        }
    }
});
</script>
