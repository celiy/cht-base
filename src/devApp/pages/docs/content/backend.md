# Criar um backend

O runner não olha o código da API. Ele lê o bloco `backend` do `cht.config.json` do cliente, roda um comando na pasta indicada e espera que `GET /health` responda com 2xx. Node, Java ou um binário servem, desde que sigam esse contrato.

A pasta do backend fica ao lado do `cht-base`. O caminho vai em `backend.dir`, relativo à raiz do workspace. O `npx chtmain install --client:<name>` clona `backend.repo` quando a pasta ainda não existe.

## Ligar ao cliente

```json
{
    "name": "meu-app",
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
```

| Campo | Uso |
| --- | --- |
| `backend.dir` | Pasta onde o comando roda. Obrigatório quando existe `backend`. |
| `backend.cmd` | Comando do `npx chtmain dev`. Sem ele, usa `npm run dev`. |
| `backend.repo` e `backend.ref` | Clone e checkout no `install`. |
| `api` | URL da API para cada alvo. O front lê `VITE_API_BASE_URL`. |

Com o bloco `backend`, o Vite define `VITE_HAS_BACKEND=true`. Aí o boot procura a API e o [websocket](/docs/websocket) tenta conectar. Sem o bloco, o runner sobe só o front. Para ignorar o backend mesmo com o bloco preenchido, use `--no-backend`.

## Contrato HTTP

1. **Escuta** na host e porta de `api.dev`, em geral `127.0.0.1:3001`. Se a porta estiver ocupada, o cliente tenta as seguintes, até `apiPortScanLimit`, que é 20 por padrão.
2. **`GET /health`** responde 2xx. O browser e o Electron sempre fazem esse ping, e não usam outro path. Sem ele, o Electron fica preso no estado "iniciando".
3. **Electron:** depois de abrir a porta, o backend imprime `CHT_API_URL=http://127.0.0.1:<porta>` no stdout ou no stderr. Só então o processo principal pinga `/health`. Ele também passa `HOST`, `PORT` e `PORT_SCAN_LIMIT` no ambiente.
4. **CORS:** liste as origens exatas, como o Vite em `127.0.0.1:5173`, a documentação e a origem do Electron. Responda com `Access-Control-Allow-Credentials: true`. Com cookies, `Access-Control-Allow-Origin: *` não serve.
5. **Sessão:** o login e o cadastro gravam um cookie httpOnly. O CHT não guarda token em `localStorage`. O logout apaga o cookie.
6. **Erros de validação** seguem este formato:

```json
{
    "status": 400,
    "error": {
        "message": "Validação falhou",
        "fields": { "email": "Email já cadastrado" }
    }
}
```

Um 401 chama `onHttpUnauthorized` no cliente.

## Empacotar no Electron

Por padrão, `backend.packageWithElectron` é `true`. A pasta vai para `resources/backend` no instalador. Em Node com `tsx`, sem `packagedCmd`, o instalador roda `src/server.ts`.

Para API remota ou outro runtime, use `"packageWithElectron": false`. A app passa a falar com a URL de `api.electron`.

## Checklist

- Pasta ao lado do `cht-base`, com `backend.dir` no `cht.config.json` do front.
- `GET /health` responde 2xx na mesma origem da API.
- No Electron, aparece o log `CHT_API_URL=...` depois do listen.
- CORS e cookies httpOnly batendo com a página de [$http](/docs/http).
