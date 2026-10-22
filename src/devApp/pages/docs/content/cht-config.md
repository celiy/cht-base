# cht.config

O `cht.config.ts` ou `cht.config.json` fica na raiz da pasta do cliente. A pasta precisa estar ao lado do `cht-base`. Se os dois arquivos existirem, o `.ts` vence.

O campo `name` é o id do cliente. É esse valor que você passa em `--client:<name>`, e não o nome da pasta.

O export precisa ser um objeto simples. Funções são descartadas, porque o arquivo roda em Node antes do Vite começar. Ler o `.env` com `fs` funciona.

## Cliente fora do cht-main

A pasta do cliente pode ficar em qualquer lugar. Passe o caminho no comando, relativo ao `cht-main` ou absoluto. Não há lista para manter, porque o comando lê o `name` do `cht.config` da pasta.

```bash
npx chtmain dev ../meu-projeto/meu-cliente
npx chtmain dev ..                 # o cht-main está dentro da pasta do cliente
npx chtmain build ../meu-projeto/meu-cliente
npx chtmain create meu-cliente ../meu-projeto/meu-cliente
```

Num cliente externo, `backend.dir` é relativo à pasta do cliente. O `install` não clona o `frontend.repo` de um cliente externo, porque a pasta é sua.

## Exemplo em TypeScript

```ts
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
```

O `env` vem do `readDotEnv` que já está no template. Ele lê o `.env` por cima do `.env.example`.

## Exemplo em JSON

Se você não precisa de lógica, o JSON basta:

```json
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
```

## Backend em outro runtime

O comando do backend roda dentro de `backend.dir`. Ele não precisa de `package.json`.

```json
{
    "backend": {
        "dir": "erp-api",
        "cmd": "mvn spring-boot:run",
        "packageWithElectron": false
    }
}
```

Com `packageWithElectron: false`, o instalador leva só o frontend. A app fala com a URL de `api.electron`.

Para empacotar um backend que não é Node, mantenha `packageWithElectron: true` e defina `packagedCmd`. Esse comando roda na pasta copiada para `resources/backend`.

## Campos

| Campo | O que faz |
| --- | --- |
| `name` | Id do cliente, usado em `--client:<name>`. Precisa ser único no workspace. |
| `siteTitle` | Título da página e `$project.labels.siteTitle`. |
| `api` / `apiBaseUrl` | URL da API para cada alvo: `dev`, `web`, `electron` e `mobile`. |
| `apiPortScanLimit` | Quantas portas, a partir da configurada, o cliente tenta. |
| `frontend.repo` / `frontend.ref` | Repositório e branch, tag ou commit do frontend no `install`. |
| `backend` | Se existir, o runner sobe o processo e `VITE_HAS_BACKEND` fica `true`. |
| `backend.dir` | Pasta do backend, relativa à raiz do workspace. Em cliente externo (caminho passado no comando), relativa à pasta do cliente. Obrigatório quando há `backend`. |
| `backend.cmd` | Comando de dev, rodado em `backend.dir`. Padrão: `npm run dev`. |
| `backend.startCmd` | Comando usado pelo Electron em modo janela. Padrão: o mesmo de `cmd`. |
| `backend.packagedCmd` | Comando dentro do app instalado. |
| `backend.packageWithElectron` | Copia o backend para o instalador. Padrão: `true`. |
| `backend.repo` / `backend.ref` | Repositório e ref do backend no `install`. |
| `lan` | `false` prende o Vite a `127.0.0.1`. Por padrão ele fica acessível na rede local. |
| `devTools` | Liga ou desliga o botão de debug. Veja [Modo dev](/docs/dev-mode). |
| `publish` | Dados do GitHub usados nas atualizações do Electron. |
| `theme` | Tema do cliente. Se faltar, vale `src/theme.config.json`. |

O `install` clona os repositórios que aparecem no `cht.config` e no catálogo do `clients.json`. Ele não inventa URLs a partir do nome da pasta.

Para plugins Vite, `public/`, `.env`, opções do router ou código no Electron, veja [Extensões do cliente](/docs/client-extensions).
