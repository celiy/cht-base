# $http

O cliente HTTP é instalado pelo `httpPlugin`, em `cht-base/src/http`. Nos componentes use `this.$http`. Fora de um SFC, importe `http`, `setAuthToken` ou `clearAuthToken` de `@base/http`.

A base da URL vem de `VITE_API_BASE_URL`, que sai do `cht.config.json`. Com backend, o boot chama `discoverApiBaseUrl()` e percorre as portas vizinhas até achar um `GET /health` que responde. Veja [Criar um backend](/docs/backend).

Os pedidos saem com `credentials: include`, então o browser envia o cookie httpOnly da API. O cliente nunca grava token em `localStorage` nem em outro storage.

## Métodos

| Método | Uso |
| --- | --- |
| `get(url, config?)` | GET. A query vai em `config.params`. |
| `post(url, data?, config?)` | POST com JSON ou `FormData`. |
| `put` e `patch` | Atualização. |
| `delete(url, config?)` | DELETE. |
| `getAuthToken` e `setAuthToken` | Bearer opcional, guardado só em memória. |
| `getBaseURL` e `setBaseURL` | Base da API. |

Cada chamada devolve `{ data, status, statusText, headers, ok }`. Erros HTTP viram `HttpError`, com `status`, `data` e `fields`, quando a API manda erros de validação.

## Login e sessão

A sessão é o cookie httpOnly que o backend grava no login. Depois do POST, o cliente pede os dados do usuário, por exemplo em `GET /api/me`, e guarda o resultado na app. O logout chama a API, que apaga o cookie.

```ts
import { HttpError } from "@base/http";

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
                // A sessão sai do front mesmo se a API falhar.
            }

            this.user = null;
            void this.$router.push({ name: "login" });
        }
    }
};
```

Scripts e o Electron podem usar Bearer com `setAuthToken`. O token fica só em memória e segue no cabeçalho `Authorization`. Um 401 chama `onUnauthorized` e limpa esse token.

## Query e arquivos

```ts
const { data } = await this.$http.get("/clientes", {
    params: { q: this.search, page: 1 }
});

const form = new FormData();
form.append("file", this.file);
await this.$http.post("/media", form);
```

## Passo a passo: usar $http em um cliente

1. **Configure a API.** Se o cliente tem backend, preencha o bloco `backend` no `cht.config.json`, como em [cht.config](/docs/cht-config). O `$http` já vem instalado pelo `cht-base`, então não há nada a registrar.
2. **Chame nos componentes.** Use `this.$http.get(...)`, `this.$http.post(...)` e os outros métodos. Não precisa de import.
3. **Use fora de componentes.** Em um store, um helper ou um `.ts` puro, importe o cliente: `import { http } from "@base/http";`.
4. **Carregue a sessão ao abrir o app.** Em `src/bootstrap.ts` do cliente, dentro de `installClientPlugins`, chame `GET` na rota de usuário logado (por exemplo `/api/me`). Se a API responder 401, o usuário não tem sessão. Guarde o resultado no seu estado.
5. **Reaja ao 401.** Registre `onHttpUnauthorized` no mesmo `installClientPlugins` para limpar o estado do cliente quando a sessão expirar. O cookie é do backend, então o front só limpa o próprio estado.
6. **Bearer só se precisar.** Use `setAuthToken` apenas para scripts e Electron. No browser, a sessão é o cookie httpOnly.

```ts
// src/bootstrap.ts do cliente
import type { App } from "vue";
import type { Router } from "vue-router";
import { http, onHttpUnauthorized } from "@base/http";

let currentUser: unknown = null;

export function getCurrentUser(): unknown {
    return currentUser;
}

export async function installClientPlugins(app: App, router: Router): Promise<void> {
    void app;
    void router;

    onHttpUnauthorized(() => {
        currentUser = null;
    });

    try {
        const { data } = await http.get("/api/me");
        currentUser = data.data;
    } catch {
        currentUser = null;
    }
}
```

Se o cliente não tem lógica de boot, o arquivo pode ficar com as funções vazias, como o stub de `cht-base/src/devApp/bootstrap.ts`. O `main.ts` importa `@client/bootstrap`, então o arquivo é obrigatório.
