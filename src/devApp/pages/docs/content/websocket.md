# Websocket

O cliente em `cht-base/src/realtime` abre um WebSocket na mesma origem da API, trocando `http` por `ws` e usando o caminho `/ws`. Ele só liga quando `VITE_HAS_BACKEND` é `true`. O `main.ts` chama `startRealtime()` sozinho.

## Protocolo

1. Ao abrir, se houver token em memória (o mesmo do [$http](/docs/http)), o cliente envia `{ op: "auth", token }`.
2. O servidor envia eventos no formato `{ op: "event", topic, payload }`.

O cliente não faz subscribe. Os tópicos vêm da sessão autenticada, decididos no servidor. Definir um token liga o socket, mas limpar o token não o desliga: use `setRealtimeEnabled(false)` para isso.

## Ouvir eventos

```ts
import { onRealtimeEvent } from "@base/realtime";
import { toast } from "@design/toast/toast";

export async function installClientPlugins() {
    onRealtimeEvent((event) => {
        toast.info(String((event.payload as { label?: string }).label ?? event.topic));
    });
}
```

`onRealtimeEvent` devolve uma função para cancelar a escuta. Chame-a quando o componente ou o plugin sair de cena.

No Mecarvit, esse ouvinte avisa o superadmin quando alguém faz um cadastro.

## Sem backend

Sem o bloco `backend` no `cht.config.json`, o realtime não liga. Para um hub próprio, o servidor deve aceitar o `auth` como primeira mensagem e depois enviar eventos.

## Como usar, passo a passo

1. **Backend.** Exponha um WebSocket no caminho `/ws`, na mesma origem da API. O servidor deve aceitar `{ op: "auth", token }` como primeira mensagem, quando houver token, e responder com eventos `{ op: "event", topic, payload }`.
2. **Ligar o socket.** O socket só conecta quando `VITE_HAS_BACKEND` é `true` e alguma destas duas coisas acontece:
   - Um token é definido com `setAuthToken` (o cliente liga sozinho).
   - O cliente chama `setRealtimeEnabled(true)`. Use isso quando a sessão for só cookie, sem token em memória, pois aí nenhum token é definido e o socket não liga sozinho.
3. **Ouvir eventos.** Chame `onRealtimeEvent` no `installClientPlugins` do `src/bootstrap.ts` para escuta global. Em um componente, guarde a função devolvida e chame-a no `beforeUnmount`.
4. **Desligar no logout.** Chame `setRealtimeEnabled(false)` quando a sessão acabar. Ao limpar o token, o socket não desliga sozinho.

```ts
// src/bootstrap.ts do cliente
import type { App } from "vue";
import type { Router } from "vue-router";
import { onHttpUnauthorized } from "@base/http";
import { onRealtimeEvent, setRealtimeEnabled } from "@base/realtime";
import { toast } from "@design/toast/toast";

export async function installClientPlugins(app: App, router: Router): Promise<void> {
    void app;
    void router;

    onRealtimeEvent((event) => {
        toast.info(String((event.payload as { label?: string }).label ?? event.topic));
    });

    onHttpUnauthorized(() => {
        setRealtimeEnabled(false);
    });

    setRealtimeEnabled(true);
}
```

## Ouvir em um componente

```ts
import { onRealtimeEvent } from "@base/realtime";

export default {
    data() {
        return {
            stopListening: null as (() => void) | null
        };
    },

    mounted() {
        this.stopListening = onRealtimeEvent((event) => {
            if (event.topic === "cadastros") {
                this.$toast.info("Novo cadastro");
            }
        });
    },

    beforeUnmount() {
        this.stopListening?.();
    }
};
```

## Formato das mensagens

| Mensagem | Quem envia | Uso |
| --- | --- | --- |
| `{ op: "auth", token }` | cliente | Logo que o socket abre, se houver token. |
| `{ op: "ready", topics }` | servidor | Lista os tópicos liberados para a sessão. |
| `{ op: "event", topic, payload }` | servidor | Evento entregue ao cliente. |
| `{ op: "ping" }` / `{ op: "pong" }` | ambos | Verificação de conexão. |
| `{ op: "error", code, message }` | servidor | Erro de protocolo. |

- O `topic` deve casar com `^[a-zA-Z0-9:_-]{1,128}$`. Tópico fora desse formato é descartado.
- Cada mensagem tem no máximo 64 KB.
- Se o servidor mandar algo que não seja `event`, o cliente ignora.

## Reconexão

Quando o socket cai, o cliente tenta de novo com espera crescente: 1 s, 2 s, 4 s, 8 s e 10 s no máximo. A espera volta para 1 s quando o socket abre de novo. Ao abrir de novo, ele envia o `auth` outra vez, com o token que estiver em memória.
