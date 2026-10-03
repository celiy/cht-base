<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsBackend",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# Criar um backend

O runner **não** inspeciona o código da API. Lê o bloco \`backend\` do [\`cht.config.json\`](/docs/cht-config) do cliente, corre um comando nessa pasta e, no browser, espera que \`GET /health\` responda 2xx. Qualquer runtime serve (Node, Java, binário) desde que cumpra esse contrato.

A pasta do backend é **irmã** de \`cht-base\` (caminho em \`backend.dir\`, relativo à raiz do workspace). O \`npx chtmain install --client:<name>\` clona \`backend.repo\` se a pasta ainda não existir.

## Ligar ao cliente

\`\`\`json
{
    "name": "meu-app",
    "apiBaseUrl": "http://127.0.0.1:3001",
    "api": {
        "dev": "http://127.0.0.1:3001",
        "web": "https://api.exemplo.com",
        "electron": "http://127.0.0.1:3001",
        "mobile": "http://127.0.0.1:3001"
    },
    "backend": {
        "dir": "cht-backend-meu-app",
        "repo": "https://github.com/org/cht-backend-meu-app.git",
        "cmd": "npm run dev"
    }
}
\`\`\`

| Campo | O que o CHT faz |
| --- | --- |
| \`backend.dir\` | cwd do processo (obrigatório se existir \`backend\`) |
| \`backend.cmd\` | Comando no \`npx chtmain dev\`. Sem \`cmd\`: \`npm run dev\` (ou \`backend.script\`) |
| \`backend.repo\` / \`ref\` | Clone no \`install\` |
| \`api\` / \`apiBaseUrl\` | \`VITE_API_BASE_URL\` do front ([\$http](/docs/http)) |

Com este bloco, o Vite define \`VITE_HAS_BACKEND=true\`: o boot chama \`discoverApiBaseUrl()\` e o [websocket](/docs/websocket) tenta ligar. Sem \`backend\`, o runner só sobe o front (e os docs). \`npx chtmain dev --client:<name> --no-backend\` ignora o processo mesmo com o bloco preenchido.

## Contrato HTTP

1. **Escuta** no host/porta de \`api.dev\` (em geral \`127.0.0.1:3001\`). Se a porta estiver ocupada, podes avançar até \`apiPortScanLimit\` (padrão 20).
2. **\`GET /health\`** devolve 2xx. O browser e o Electron pingam **sempre** este path (não o \`backend.healthPath\` do JSON). Sem isto, o front fica na URL configurada e o Electron nunca passa de “a iniciar”.
3. **Electron:** imprime uma linha \`CHT_API_URL=http://127.0.0.1:<porta>\` no stdout/stderr depois de bind. O main process só então faz o ping em \`/health\`. Lê \`HOST\`, \`PORT\` e \`PORT_SCAN_LIMIT\` do ambiente (o Electron define-os).
4. **CORS** com origens concretas (Vite em \`127.0.0.1:5173\`, docs, origem Electron) e \`Access-Control-Allow-Credentials: true\`. O \`\$http\` envia \`credentials: include\`. \`Access-Control-Allow-Origin: *\` incompatível com cookies.
5. **Sessão do browser:** cookie **httpOnly** no login/cadastro (o CHT não grava token em \`localStorage\`). Logout apaga o cookie. \`Authorization: Bearer\` é opcional para scripts; o front usa \`setAuthToken\` só em memória.
6. **Erros de validação** no formato que o FormHandler lê:

\`\`\`json
{
    "status": 400,
    "error": {
        "message": "Validação falhou",
        "fields": { "email": "Email já cadastrado" }
    }
}
\`\`\`

Um 401 dispara \`onHttpUnauthorized\` no cliente.

## Websocket (opcional)

Se \`VITE_HAS_BACKEND\` for verdadeiro, o front abre \`ws(s)://<api>/ws\`. Contrato em [Websocket](/docs/websocket). Sem hub, o cliente falha a ligação e segue; não é obrigatório para o runner.

## Empacotar no Electron

\`backend.packageWithElectron\` é \`true\` por omissão: a pasta é copiada para \`resources/backend\`. Node com \`tsx\` usa \`src/server.ts\` no instalador se não houver \`packagedCmd\`. API remota ou outro runtime: \`"packageWithElectron": false\` e a app fala com \`api.electron\`.

## Checklist

- Pasta irmã de \`cht-base\`, \`cht.config.json\` do **frontend** com \`backend.dir\`
- \`GET /health\` 2xx na mesma origem da API
- No Electron, log \`CHT_API_URL=...\` após o listen
- CORS + cookies httpOnly alinhados com [\$http](/docs/http)
- \`npx chtmain dev --client:<name>\` mostra o tab **back-end** no runner
`;
        }
    }
});
</script>
