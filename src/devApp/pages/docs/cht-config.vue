<template>
    <DocsMarkdown :source="source" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DocsMarkdown from "../../components/DocsMarkdown.vue";

export default defineComponent({
    name: "DocsChtConfig",

    components: {
        DocsMarkdown
    },

    computed: {
        source(): string {
            return `# cht.config

Um repositório torna-se cliente CHT quando tem \`cht.config.ts\` **ou** \`cht.config.json\` na raiz e a pasta está **ao lado** de \`cht-base\`. Se os dois existirem, o \`.ts\` ganha. O identificador é o campo \`name\`. O runner, o Vite, o install, o build e o Electron leem este export; não há scan por \`cht-client-*\` / \`cht-backend-*\`.

\`npx chtmain dev --client:<name>\` usa \`name\`, não o nome da pasta.

O \`.ts\` tem de \`export default\` um **objeto simples** (JSON-serializável). Funções no export perdem-se. Podes ler \`.env\` com \`fs\` — o ficheiro corre em Node, não no browser.

## Exemplo

\`cht.config.ts\` + \`.env\`:

\`\`\`bash
CHT_API_DEV=http://127.0.0.1:3001
CHT_API_WEB=http://127.0.0.1:3001
CHT_API_ELECTRON=http://127.0.0.1:3001
CHT_API_MOBILE=http://127.0.0.1:3001
\`\`\`

O parser \`readDotEnv\` está no template (\`.env\` por cima de \`.env.example\`). O export:

\`\`\`ts
export default {
    name: "meu-app",
    siteTitle: "Meu app",
    api: {
        dev: env.CHT_API_DEV ?? "http://127.0.0.1:3001",
        web: env.CHT_API_WEB ?? "http://127.0.0.1:3001",
        electron: env.CHT_API_ELECTRON ?? "http://127.0.0.1:3001",
        mobile: env.CHT_API_MOBILE ?? "http://127.0.0.1:3001"
    }
};
\`\`\`

## Exemplo JSON

O JSON continua válido se não precisares de lógica:

\`\`\`json
{
    "name": "mecarvit",
    "siteTitle": "Mecarvit",
    "apiBaseUrl": "http://127.0.0.1:3001",
    "api": {
        "dev": "http://127.0.0.1:3001",
        "web": "http://127.0.0.1:3001",
        "electron": "http://127.0.0.1:3001",
        "mobile": "http://127.0.0.1:3001"
    },
    "apiPortScanLimit": 20,
    "devTools": true,
    "frontend": {
        "repo": "https://github.com/org/cht-client-mecarvit.git"
    },
    "backend": {
        "dir": "cht-backend-mecarvit",
        "repo": "https://github.com/org/cht-backend-mecarvit.git",
        "cmd": "npm run dev",
        "packageWithElectron": true
    }
}
\`\`\`

## Backend noutro runtime (Java, etc.)

O comando corre **dentro** de \`backend.dir\`. Não precisa de \`package.json\`. Se a API não deve ir no instalador Electron, desliga o bundle:

\`\`\`json
{
    "backend": {
        "dir": "erp-api",
        "cmd": "mvn spring-boot:run",
        "packageWithElectron": false
    }
}
\`\`\`

Com \`packageWithElectron: false\`, \`npx chtmain electron build\` empacota só o frontend; a app fala com a URL em \`api.electron\`.

Para empacotar um backend que não é Node, mantém \`packageWithElectron: true\` e define \`packagedCmd\` (comando relativo à pasta copiada para \`resources/backend\`).

## Campos

| Campo | Função |
| --- | --- |
| \`name\` | Id do cliente (\`--client:<name>\`). Único no workspace. |
| \`siteTitle\` | \`VITE_SITE_TITLE\` e \`$project.labels.siteTitle\` |
| \`api\` / \`apiBaseUrl\` | URL da API por alvo (\`dev\`, \`web\`, \`electron\`, \`mobile\`) |
| \`apiPortScanLimit\` | Quantas portas a seguir à configurada o cliente tenta |
| \`frontend.repo\` | URL git do frontend (install / catálogo) |
| \`frontend.ref\` | Branch, tag ou commit a fazer checkout no install |
| \`backend\` | Se existir, o runner sobe o processo e \`VITE_HAS_BACKEND\` fica \`true\` |
| \`backend.dir\` | Pasta do backend, relativa à raiz do workspace. **Obrigatório** se houver \`backend\`. |
| \`backend.cmd\` | Comando a correr nessa pasta no watch/dev. Padrão: \`npm run dev\` (ou \`backend.script\`). |
| \`backend.startCmd\` | Comando no Electron em modo janela. Padrão: o mesmo que \`cmd\`. |
| \`backend.packagedCmd\` | Comando no app Electron já instalado. Se omitido e o comando for npm/npx, usa-se o \`tsx\` embutido. |
| \`backend.packageWithElectron\` | Copiar o backend para o instalador. **Padrão \`true\`**. |
| \`backend.repo\` | URL git do backend para \`npx chtmain install --client:<name>\` |
| \`backend.ref\` | Branch, tag ou commit do backend no install |
| \`lan\` | \`false\` prende o Vite (front + docs) a \`127.0.0.1\`. **Padrão: exposto na LAN** (\`0.0.0.0\`). O Electron continua em loopback. |
| \`devTools\` | \`false\` ou \`{ "enabled": false }\` esconde o botão de debug; \`{ "repoUpdateNotifications": false }\` esconde só o sino de repos atualizados (ver [Modo dev](/docs/dev-mode)) |
| \`publish\` | Dados do GitHub para updates Electron |
| \`theme\` | Opcional; senão usa-se \`src/theme.config.json\` |

CSS extra do cliente: ficheiro \`src/override.css\` (não é campo do JSON). Ver [override.css](/docs/override-css). Plugin Tailwind opcional: \`src/tailwind.plugin.js\` — [Plugin Tailwind do cliente](/docs/client-tailwind-plugin). Contrato da API: [Criar backend](/docs/backend).

O \`install\` clona as URLs do cht.config e do catálogo em \`clients.json\` (para o primeiro clone, antes da pasta existir). Não inventa repositórios a partir do nome da pasta.

Depois de o ficheiro existir na pasta irmã, corre \`npx chtmain sync-tsconfig\` (o \`dev\` também sincroniza) e \`npx chtmain dev --client:<name>\`.
`;
        }
    }
});
</script>
