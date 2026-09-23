<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsHttp",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# $http

Cliente HTTP instalado pelo \`httpPlugin\` em \`cht-base/src/http\`. No template e no script (Options API) usas \`this.$http\`. Fora de um SFC, importa \`http\`, \`persistAuthToken\` e \`clearAuthToken\` de \`@base/http\`.

O \`baseURL\` vem de \`VITE_API_BASE_URL\` (derivado do \`cht.config.json\`). Com backend, \`discoverApiBaseUrl()\` no boot percorre portas vizinhas até a API responder.

## Métodos

| Método | Uso |
| --- | --- |
| \`get(url, config?)\` | GET com query em \`config.params\` |
| \`post(url, data?, config?)\` | POST JSON (ou \`FormData\`) |
| \`put\` / \`patch\` | Atualização |
| \`delete(url, config?)\` | DELETE |
| \`getAuthToken\` / \`setAuthToken\` | Token em memória |
| \`getBaseURL\` / \`setBaseURL\` | Base da API |

Cada chamada devolve \`{ data, status, statusText, headers, ok }\`. Erros HTTP viram \`HttpError\` (\`status\`, \`data\`, \`fields\` se a API enviar validação).

## Login e token

\`\`\`ts
import { http, persistAuthToken, clearAuthToken, HttpError } from "@base/http";

export default {
    methods: {
        async onLogin() {
            try {
                const { data } = await this.$http.post("/auth/login", {
                    email: this.email,
                    senha: this.senha
                });

                persistAuthToken(data.token);
                await this.$router.push({ name: "home" });
            } catch (error) {
                if (error instanceof HttpError) {
                    this.$toast.error(error.message);
                }
            }
        },

        onLogout() {
            clearAuthToken();
            void this.$router.push({ name: "login" });
        }
    }
};
\`\`\`

\`persistAuthToken\` grava no storage e emite \`onAuthTokenChange\`, usado pelo websocket. Um 401 chama \`onUnauthorized\` e limpa o token.

## Query e ficheiros

\`\`\`ts
const { data } = await this.$http.get("/clientes", {
    params: { q: this.search, page: 1 }
});

const form = new FormData();
form.append("file", this.file);
await this.$http.post("/media", form);
\`\`\`
`;
        }
    }
});
</script>
