# Extensões do cliente

Estas extensões deixam o cliente usar bibliotecas e APIs que a base não traz, como three.js, WebGPU, WASM, workers, arquivos locais e Node no Electron. Nenhuma exige mudança no `cht-base`. Todas são opcionais: sem o arquivo, nada muda.

| Arquivo no cliente | Para quê |
| --- | --- |
| `vite.config.ts` | Plugins, aliases, `define`, `build` e `worker` do Vite. |
| `public/` | Arquivos estáticos na raiz do site, como modelos, texturas e JSON. |
| `.env` | Variáveis `VITE_*` em `import.meta.env`. |
| `src/bootstrap.ts`, `routerOptions` | Opções do `vue-router`, como `scrollBehavior` e o nome da classe de link ativo. |
| `electron/main.ts` | Código do processo principal do Electron: IPC, switches do Chromium e janela. |
| `electron/preload.ts` | Ponte própria entre o Electron e a página. |

## Dependências

Instale as bibliotecas no próprio cliente, por exemplo com `npm i three`. O Vite acha o pacote a partir do arquivo que o importa, então o `cht-base` não precisa dele.

## vite.config.ts

O `cht-base` lê `vite.config.ts`, `.mts`, `.js` ou `.mjs` da pasta do cliente. Depois junta o resultado com a config da base usando `mergeConfig`. Arrays, como `plugins`, são concatenados. Objetos são fundidos.

```ts
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        {
            name: "meu-cliente",
            transformIndexHtml: (html) => html.replace("<html lang=\"en\">", "<html lang=\"pt-BR\">")
        }
    ],
    worker: { format: "es" },
    build: { target: "esnext" }
});
```

Plugins de terceiros entram no mesmo array. Por exemplo, `vite-plugin-wasm` pede `build.target: "esnext"`, por causa do top-level await.

Algumas observações:

- Aliases novos valem em runtime. O type-check do build, porém, só conhece `@client`, `@base`, `@design` e `@shared`. Prefira imports relativos, ou declare o módulo num `.d.ts`.
- A config do cliente sobrepõe as chaves da base, inclusive `resolve.alias` e `base`. Mude só o que precisa.

## public/ e .env

- `public/` do cliente vira a raiz do site. No Electron empacotado a base é relativa, então use `import.meta.env.BASE_URL` no caminho, e não `/`.
- Só as chaves com prefixo `VITE_` chegam ao browser. Nunca coloque segredo nelas.

## routerOptions

```ts
import type { RouterOptions } from "vue-router";

export const routerOptions: Partial<RouterOptions> = {
    linkActiveClass: "is-active",
    scrollBehavior(to) {
        return to.hash ? { el: to.hash } : { top: 0 };
    }
};
```

As opções são espalhadas por cima das da base. Se você trocar o `history`, lembre que o Electron empacotado usa hash, porque abre a página por `file:`.

Para erros globais, defina `app.config.errorHandler` dentro de `installClientPlugins`.

## Electron: main.ts

O `electron/build.mjs` junta o `electron/main.ts` do cliente ao processo principal. O código no topo do arquivo roda assim que ele é carregado, antes de o `app` ficar pronto. É o único lugar onde `app.commandLine.appendSwitch` funciona.

```ts
import { app, ipcMain } from "electron";
import type { BrowserWindow } from "electron";

app.commandLine.appendSwitch("enable-unsafe-webgpu");

export function onReady(context) {
    ipcMain.handle("meu-cliente:info", () => ({ versao: process.versions.electron }));
}

export function onWindow(window: BrowserWindow) {
    window.setMinimumSize(900, 650);
}
```

- `onReady` roda uma vez, depois que o `app` fica pronto e antes da janela.
- `onWindow` roda para cada janela criada pela base, antes de o frontend carregar.
- O `context` traz `isDev`, `client` e `getMainWindow`.

Os tipos `ClientElectronMain` e `ClientElectronContext` estão em `cht-base/electron/types.ts`.

### Erros nos hooks

Um erro dentro de `onReady` ou `onWindow` não derruba o app. A base registra o erro no log, com o nome do hook, e continua abrindo a janela. Você vê algo assim no terminal:

```text
[electron] Client hook "onReady" failed: Error: ...
```

Um erro no topo do arquivo, fora dos hooks, ainda impede o app de abrir. Ele roda quando o módulo carrega, antes de qualquer proteção da base.

## Electron: preload.ts

O preload da base é sandboxed e expõe só `window.electronAPI`. O preload do cliente entra no mesmo bundle e expõe a sua própria ponte.

```ts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("meuClienteAPI", {
    info: () => ipcRenderer.invoke("meu-cliente:info")
});
```

Exponha funções estreitas, e nunca o `ipcRenderer` inteiro. Valide os argumentos no `main.ts`. Quando o caminho vier do usuário, deixe-o escolher no diálogo nativo, e não digitar.

O renderer continua sem acesso ao Node.

## Arquivos e WebGPU

Sem nada da base, o navegador (e o Electron) já oferece:

- `<input type="file">` e arrastar e soltar;
- File System Access API, com `showOpenFilePicker` e `showDirectoryPicker`, que só existe em Chromium;
- OPFS, com `navigator.storage.getDirectory()`.

Para WebGPU, `navigator.gpu` vem do browser. No Linux, o Chromium pode não achar adapter sem o switch `enable-unsafe-webgpu`. No Electron, o cliente liga o switch no `main.ts`.

Com `three/webgpu`, o `WebGPURenderer` cai para WebGL 2 quando não há WebGPU. Use `renderer.backend` para saber qual foi usado.
