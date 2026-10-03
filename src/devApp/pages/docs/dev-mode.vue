<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsDevMode",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# Modo dev

Com \`npx chtmain dev --client:<name>\` o runner sobe o frontend do cliente **e** um Vite extra só com o \`devApp\` (documentação) numa porta livre (a partir de 5174). O cache desse Vite é \`cht-base/node_modules/.vite-devapp\`, separado do app.

## Botão de debug

No canto inferior direito (só em desenvolvimento, se o Vite dos docs estiver a correr) aparece um botão transparente com o ícone de bug. Vem do \`cht-base\` (\`ElectronStartupGate\` + \`DevToolsFab\`), não do cliente.

O botão só monta se \`import.meta.env.DEV\` e \`VITE_DEV_TOOLS === "true"\`. O Vite liga essa flag quando existe \`CHT_DEVAPP_URL\` (o runner passa-a) **e** o \`cht.config.json\` não desliga as ferramentas:

| cht.config.json | Efeito |
| --- | --- |
| (omitido) | Botão visível no watch do cliente |
| \`"devTools": false\` | Esconde o botão |
| \`"devTools": { "enabled": false }\` | Idem |
| \`"devTools": { "repoUpdateNotifications": false }\` | Mantém o bug; esconde o sino de repos atualizados |

A primeira entrada do menu é **Documentação** (abre \`VITE_DEVAPP_URL/docs\`). As tuas entradas aparecem a seguir.

## Notificações de repos

À esquerda do botão aparece um sino quando algum repositório do workspace (\`shared.repos\` + frontend/backend do cliente) tem commits no remoto à frente do HEAD local, **ou** quando uma repo principal (\`cht-shared\`, \`cht-base\`, \`cht-design-system\`) tem no ficheiro \`version\` um número diferente do que o \`cht-main\` pede. O scan é local (ficheiros \`version\` no disco) mais \`GET /__cht/repo-updates\` (plugin Vite) para os remotes.

A lista abre num painel flutuante. O alerta de versão da workspace fica até as versões baterem — **Confirmar** só esconde os commits remotos já vistos (\`localStorage\` \`cht.repoUpdateDismissals\`).

## Adicionar funções ao menu

\`registerDevToolsOptions\` em \`@base/devTools\` empurra itens para um array reativo. Cada item:

| Campo | Tipo | Função |
| --- | --- | --- |
| \`label\` | string | Texto no menu (obrigatório) |
| \`run\` | função | Clique. Pode devolver uma Promise; o FAB não apanha erros |
| \`icon\` | string | Classe Font Awesome **sem** \`fa-solid\` (o \`Option\` já prefixa), ex. \`fa-flask\` |
| \`id\` | string | Chave Vue; se faltar, usa-se o \`label\` |

Regista **uma vez** no boot do cliente (\`src/bootstrap.ts\` → \`installClientPlugins\`), não em cada página. A função devolve um unregister: chama-o se o plugin for desmontado, para não duplicar linhas em HMR.

\`\`\`ts
import type { App } from "vue";
import type { Router } from "vue-router";
import { registerDevToolsOptions } from "@base/devTools";
import { toast } from "@design/toast/toast";

let unregisterDevTools: (() => void) | undefined;

export async function installClientPlugins(_app: App, _router: Router): Promise<void> {
    unregisterDevTools?.();

    unregisterDevTools = registerDevToolsOptions([
        {
            id: "seed-demo",
            label: "Dados de demo",
            icon: "fa-database",
            run: async () => {
                await _app.config.globalProperties.$http.post("/api/dev/seed");
                toast.success("Base preenchida");
            }
        },
        {
            id: "goto-debug",
            label: "Página de debug",
            icon: "fa-bug",
            run: () => {
                void _router.push({ name: "debug" });
            }
        }
    ]);
}
\`\`\`

\`run\` é código teu: toast, modal, rota, pedido HTTP. Não há sandbox. O menu só existe em \`npm run dev\` / \`chtmain dev\` com docs a correr; builds de produção não incluem o FAB ativo.
`;
        }
    }
});
</script>
