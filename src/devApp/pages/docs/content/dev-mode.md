# Modo dev

`npx chtmain dev --client:<name>` sobe o frontend do cliente. Ele também sobe uma segunda instância do Vite, só com a documentação (`devApp`), numa porta livre a partir de 5174. É ela que serve `/docs`.

## Botão de debug

No canto inferior direito aparece um botão com o ícone de bug. Ele vem do `cht-base`, não do cliente, e só aparece em desenvolvimento com a documentação rodando.

| `devTools` no `cht.config` | Efeito |
| --- | --- |
| Omitido | O botão aparece. |
| `false` ou `{ "enabled": false }` | O botão some. |
| `{ "repoUpdateNotifications": false }` | O botão fica, mas o sino de repositórios some. |

A primeira entrada do menu é **Documentação**. Os itens do cliente aparecem depois dela.

## Sino de repositórios

O sino aparece quando acontece uma destas duas coisas:

- um repositório do workspace tem commits novos no remoto;
- uma repo principal (`cht-shared`, `cht-base` ou `cht-design-system`) tem uma versão diferente da que o `cht-main` pede.

Ao clicar em **Confirmar**, somem só os commits que você já viu. O alerta de versão continua até as versões baterem. A escolha fica no `localStorage`, na chave `cht.repoUpdateDismissals`.

## Adicionar itens ao menu

Use `registerDevToolsOptions` de `@base/devTools`. Registre os itens uma vez, em `installClientPlugins`, e não em cada página.

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
