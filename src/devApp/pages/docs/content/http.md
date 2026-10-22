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
