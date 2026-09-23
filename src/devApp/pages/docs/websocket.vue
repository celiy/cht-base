<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsWebsocket",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# Websocket

O cliente em \`cht-base/src/realtime\` abre um WebSocket na mesma origem da API (\`http\` → \`ws\`, path \`/ws\`). Só arranca se \`VITE_HAS_BACKEND\` for \`true\` — \`startRealtime()\` já é chamado no \`main.ts\`.

## Contrato

1. O cliente envia \`{ op: "auth", token }\` com o JWT.
2. O servidor responde \`{ op: "ready", topics }\` (os tópicos são atribuídos no servidor).
3. Eventos chegam como \`{ op: "event", topic, payload }\`.

Não há subscribe no cliente: os tópicos vêm da sessão autenticada.

## Ouvir eventos

\`\`\`ts
import { onRealtimeEvent } from "@base/realtime";
import { toast } from "@design/toast/toast";

export async function installClientPlugins() {
    onRealtimeEvent((event) => {
        toast.info(String((event.payload as { label?: string }).label ?? event.topic));
    });
}
\`\`\`

No Mecarvit isto avisa o superadmin quando há um cadastro. O token é o mesmo do \`$http\`: \`onAuthTokenChange\` reconecta ou fecha o socket.

## Sem backend

Se o \`cht.config.json\` não tiver \`backend\`, o realtime não liga. Para um hub próprio, o backend deve autenticar a primeira mensagem e devolver \`ready\` com a lista de tópicos.
`;
        }
    }
});
</script>
