# Websocket

O cliente em `cht-base/src/realtime` abre um WebSocket na mesma origem da API, trocando `http` por `ws` e usando o caminho `/ws`. Ele só liga quando `VITE_HAS_BACKEND` é `true`. O `main.ts` chama `startRealtime()` sozinho.

## Protocolo

1. Ao abrir, se houver token em memória (o mesmo do [$http](/docs/http)), o cliente envia `{ op: "auth", token }`.
2. O servidor envia eventos no formato `{ op: "event", topic, payload }`.

O cliente não faz subscribe. Os tópicos vêm da sessão autenticada, decididos no servidor. Quando o socket cai, o cliente tenta de novo com espera crescente. Quando o token muda, o socket reconecta.

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
