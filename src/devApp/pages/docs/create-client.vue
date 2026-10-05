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

O comando copia o template em \`cht-base/template/client-template\`: uma rota \`/\`, uma página \`index.vue\`, \`bootstrap.ts\` vazio, \`cht.config.ts\`, \`.env.example\`, \`theme.config.json\`, \`src/override.css\` (opcional, vazio) e paths \`@base\` / \`@design\`.

\`\`\`bash
npx chtmain create meu-app cht-client-meu-app
\`\`\`

| Argumento | Significado |
| --- | --- |
| \`nome\` | Valor de \`cht.config.ts\` → \`name\` (kebab-case) |
| \`pasta\` | Pasta de destino (relativa ao cwd ou absoluta) |

Se a pasta **ainda não existir**, é criada. Se **já existir** (por exemplo um clone git vazio), os ficheiros do template são copiados para dentro \`.git\` não é tocado. No fim corre \`npm install\` nessa pasta.

O comando preenche \`name\`, \`siteTitle\`, \`package.json\` e o nome do componente de App.

## Depois de criar

1. Confirma que a pasta está ao lado de \`cht-base\` no monorepo (o nome da pasta é livre).
2. Copia \`.env.example\` para \`.env\` se quiseres URLs locais (o \`.ts\` também cai nos defaults).
3. \`npx chtmain sync-tsconfig\` (o \`dev\` também sincroniza).
4. \`npx chtmain dev --client:meu-app\`

## O que o template já traz

- \`src/App.vue\`: só \`RouterView\`
- \`src/routes.ts\`: uma rota para \`src/pages/index.vue\`
- \`src/bootstrap.ts\`: \`setupAuthGuard\` e \`installClientPlugins\` sem lógica (podes acrescentar auth, plugins, etc.)
- \`src/override.css\`: CSS do cliente por cima do estilo base; ver [override.css](/docs/override-css)
- \`cht.config.ts\`, \`.env.example\` e \`src/theme.config.json\`

Podes usar só \`cht.config.json\` em vez do \`.ts\`. Contrato dos campos: [cht.config](/docs/cht-config).

Para auth, layout ou mais rotas, copia o que precisares do Mecarvit ou segue [\$http](/docs/http) e as páginas de componentes.
`;
        }
    }
});
</script>
