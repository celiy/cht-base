# Modo dev

`npx chtmain dev --client:<name>` sobe o frontend do cliente. Ele também sobe uma segunda instância do Vite, só com a documentação (`devApp`), numa porta livre a partir de 5174. É ela que serve `/docs`.

## Botão de debug

No canto inferior direito aparece um botão com o ícone de bug. Ele vem do `cht-base`, não do cliente, e só aparece em desenvolvimento com a documentação rodando.

| `devTools` no `cht.config`             | Efeito                                         |
| -------------------------------------- | ---------------------------------------------- |
| Omitido                                | O botão aparece.                               |
| `false` ou `{ "enabled": false }`      | O botão some.                                  |
| `{ "repoUpdateNotifications": false }` | O botão fica, mas o sino de repositórios some. |

A primeira entrada do menu é **Documentação**. Os itens do cliente aparecem depois dela.

## Adicionar itens ao menu

Use `registerDevToolsOptions` de `@base/devTools`. Registre os itens uma vez, em `installClientPlugins`, e não em cada página.

### Passo a passo

1. **Abra `src/bootstrap.ts` do cliente.** Esse é o arquivo que o `main.ts` carrega como `@client/bootstrap`. Ele é obrigatório. Se o cliente ainda não tiver lógica de boot, use o stub de `cht-base/src/devApp/bootstrap.ts` como base.
2. **Importe `registerDevToolsOptions`** de `@base/devTools`, no topo do arquivo.
3. **Chame `registerDevToolsOptions` dentro de `installClientPlugins`.** Essa função é chamada uma vez, na inicialização do app. Não coloque a chamada em páginas ou componentes.
4. **Veja o botão.** Rode `npx chtmain dev --client:<name>`. Com a documentação rodando, o botão de bug aparece no canto inferior direito, com os itens do cliente depois de **Documentação**.

O exemplo abaixo é o arquivo completo. Copie a estrutura e troque os itens.

```ts
import type { App } from "vue";
import type { Router } from "vue-router";
import { registerDevToolsOptions } from "@base/devTools";
import { toast } from "@design/toast/toast";

let unregisterDevTools: (() => void) | undefined;

export async function installClientPlugins(app: App, router: Router): Promise<void> {
    unregisterDevTools?.();

    unregisterDevTools = registerDevToolsOptions([
        {
            id: "seed-demo",
            label: "Dados de demo",
            icon: "fa-database",
            run: async () => {
                await app.config.globalProperties.$http.post("/api/dev/seed");
                toast.success("Base preenchida");
            }
        },
        {
            id: "goto-debug",
            label: "Página de debug",
            icon: "fa-bug",
            run: () => {
                void router.push({ name: "debug" });
            }
        }
    ]);
}
```

Cada item tem `label` (obrigatório), `run`, `icon` e `id`. O `icon` leva só o nome da classe, sem `fa-solid`, porque o componente já adiciona o prefixo. Se faltar `id`, o `label` vira a chave.

A função devolve um `unregister`. Chame-a antes de registrar de novo, para não duplicar itens quando o HMR recarrega o módulo.

`run` é código seu. Ele pode abrir modal, mudar rota ou fazer pedido HTTP. Erros dentro de `run` não são capturados pelo botão, então trate-os no próprio `run`.

O menu só existe no `npm run dev` com a documentação rodando. Builds de produção não incluem o botão.
