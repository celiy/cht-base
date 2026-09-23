<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsCreateClient",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# Criar um frontend

O comando copia o template em \`cht-base/template/client-template\`: uma rota \`/\`, uma página \`index.vue\`, \`bootstrap.ts\` vazio, \`cht.config.json\`, \`theme.config.json\` e paths \`@base\` / \`@design\`.

\`\`\`bash
npx chtmain create meu-app cht-client-meu-app
\`\`\`

| Argumento | Significado |
| --- | --- |
| \`nome\` | Valor de \`cht.config.json\` → \`name\` (kebab-case) |
| \`pasta\` | Pasta de destino (relativa ao cwd ou absoluta) |

Se a pasta **ainda não existir**, é criada. Se **já existir** (por exemplo um clone git vazio), os ficheiros do template são copiados para dentro — \`.git\` não é tocado.

O comando preenche \`name\`, \`siteTitle\`, \`package.json\` e o nome do componente de App.

## Depois de criar

1. Confirma que a pasta está ao lado de \`cht-base\` no monorepo (o nome da pasta é livre).
2. \`npx chtmain sync-tsconfig\` (o \`dev\` também sincroniza).
3. \`npx chtmain dev --client:meu-app\`

## O que o template já traz

- \`src/App.vue\` — só \`RouterView\`
- \`src/routes.ts\` — uma rota para \`src/pages/index.vue\`
- \`src/bootstrap.ts\` — \`setupAuthGuard\` e \`installClientPlugins\` sem lógica (podes acrescentar auth, plugins, etc.)
- \`cht.config.json\` e \`src/theme.config.json\`

Para auth, layout ou mais rotas, copia o que precisares do Mecarvit ou segue [\$http](/docs/http) e as páginas de componentes.
`;
        }
    }
});
</script>
