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

No canto inferior direito (só em desenvolvimento, se o docs estiver a correr) aparece um botão transparente redondo. A primeira opção abre a documentação em \`/docs\`.

O botão vem do \`cht-base\` (\`ElectronStartupGate\` + \`DevToolsFab\`), não do cliente.

| cht.config.json | Efeito |
| --- | --- |
| (omitido) | Botão visível no watch do cliente |
| \`"devTools": false\` | Esconde o botão |
| \`"devTools": { "enabled": false }\` | Idem |
| \`"devTools": { "repoUpdateNotifications": false }\` | Mantém o bug; esconde o sino de repos atualizados |

## Notificações de repos

À esquerda do botão de debug aparece um sino quando algum repositório do workspace (\`shared.repos\` + frontend/backend do cliente) tem commits no remoto à frente do HEAD local. O scan corre no arranque via \`GET /__cht/repo-updates\` (plugin Vite).

A lista abre num painel flutuante. **Confirmar** grava em \`localStorage\` (\`cht.repoUpdateDismissals\`) o tip remoto visto; se o remoto avançar de novo, o sino volta.

\`\`\`ts
import { registerDevToolsOptions } from "@base/devTools";

export default {
    created() {
        this.unregister = registerDevToolsOptions([
            {
                id: "teste",
                label: "Teste",
                icon: "fa-flask",
                run: () => {
                    this.openModal = true;
                }
            }
        ]);
    },

    unmounted() {
        this.unregister?.();
    }
};
\`\`\`

\`run\` é uma função qualquer (abrir modal, toast, navegar). O Mecarvit inclui um exemplo que abre um modal e dispara o toast \`"Teste"\`.
`;
        }
    }
});
</script>
