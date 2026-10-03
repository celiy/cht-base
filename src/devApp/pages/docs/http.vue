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

Cliente HTTP instalado pelo \`httpPlugin\` em \`cht-base/src/http\`. No template e no script (Options API) usas \`this.$http\`. Fora de um SFC, importa \`http\`, \`setAuthToken\` e \`clearAuthToken\` de \`@base/http\`.

O \`baseURL\` vem de \`VITE_API_BASE_URL\` (derivado do \`cht.config.json\`). Com backend, \`discoverApiBaseUrl()\` no boot percorre portas vizinhas até \`GET /health\` responder. Contrato completo: [Criar backend](/docs/backend).

Pedidos vão com \`credentials: include\`, para o browser enviar cookies httpOnly da API. O cliente HTTP **não** grava token em \`localStorage\` nem em outro storage.

## Métodos

| Método | Uso |
| --- | --- |
| \`get(url, config?)\` | GET com query em \`config.params\` |
| \`post(url, data?, config?)\` | POST JSON (ou \`FormData\`) |
| \`put\` / \`patch\` | Atualização |
| \`delete(url, config?)\` | DELETE |
| \`getAuthToken\` / \`setAuthToken\` | Bearer opcional, só em memória |
| \`getBaseURL\` / \`setBaseURL\` | Base da API |

Cada chamada devolve \`{ data, status, statusText, headers, ok }\`. Erros HTTP viram \`HttpError\` (\`status\`, \`data\`, \`fields\` se a API enviar validação).

## Login e sessão

A sessão do browser é o cookie httpOnly que o backend define no login/cadastro. Depois do POST, o cliente só pergunta quem é o usuário (por exemplo \`GET /api/me\`) e trata o estado na app. Logout chama a API para apagar o cookie.

\`\`\`ts
import { http, HttpError } from "@base/http";

export default {
    methods: {
        async onLogin() {
            try {
                await this.$http.post("/api/login", {
                    email: this.email,
                    senha: this.senha
                });

                const { data } = await this.$http.get("/api/me");
                this.user = data.data;
                await this.$router.push({ name: "home" });
            } catch (error) {
                if (error instanceof HttpError) {
                    this.$toast.error(error.message);
                }
            }
        },

        async onLogout() {
            try {
                await this.$http.post("/api/logout");
            } catch {
                void 0;
            }

            this.user = null;
            void this.$router.push({ name: "login" });
        }
    }
};
\`\`\`

Se um script ou o Electron precisar de Bearer, usa \`setAuthToken\` — fica só em memória e vai em \`Authorization\`. Um 401 chama \`onUnauthorized\` / \`onHttpUnauthorized\` e limpa esse token em memória.

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
