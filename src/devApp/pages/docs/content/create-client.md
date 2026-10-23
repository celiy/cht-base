# Criar um frontend

Um cliente é uma pasta irmã do `cht-base`, com um `cht.config.ts` ou `cht.config.json` na raiz. O comando abaixo cria essa pasta a partir do template.

```bash
# <name> é o id do seu projeto
npx chtmain create <name> <pasta-destino>
```

Sem flag, o comando usa o template padrão. Para partir de outro, passe `--template:<nome>`:

```bash
npx chtmain create <name> <pasta-destino> --template:override-demo
```

## Templates disponíveis

Os templates ficam em `cht-base/template/client-<nome>`. O comando troca o nome, o título e o `package.json` pelos do cliente novo.

### Padrão

O mínimo para subir um cliente: uma rota, uma página e os arquivos de configuração vazios.

- `src/App.vue` e `src/routes.ts`: uma rota para `src/pages/index.vue`.
- `src/bootstrap.ts`: as funções `setupAuthGuard` e `installClientPlugins`, vazias.
- `src/css/style.css` e `src/override.css`: CSS do cliente. Veja [CSS do cliente](/docs/override-css).
- `src/tailwind.plugin.js`: utilities Tailwind usadas só por este cliente. Veja [Plugin Tailwind do cliente](/docs/client-tailwind-plugin).
- `cht.config.ts`, `.env.example` e `src/theme.config.json`.

![Homepage do template padrão](templates/default.png)

### Override Demo

Flag: `--template:override-demo`. Uma página só, com quase todos os componentes do design system restilizados pelo cliente, sem mexer no `cht-base`. O `src/override.css` dá o visual de vidro, glow, pills e gradientes, e um fundo animado fica em `App.vue`. O `src/tailwind.plugin.js` define a utility `demo-stripe`. Use quando o cliente precisa de uma identidade visual própria. Usa `cht.config.json`, sem `.env`.

![Homepage do template override-demo](templates/override-demo.png)

### Freedom Lab

Flag: `--template:freedom-lab`. Um laboratório do que o cliente consegue fazer por conta própria. A homepage roda verificações de cada recurso. O template traz:

- `vite.config.ts` do cliente, com plugin próprio (módulo virtual e transformação do `index.html`), `define`, alias `@lab`, WASM via `vite-plugin-wasm` e Web Worker.
- `.env` com variáveis `VITE_*` e a prova de que as outras não chegam ao navegador.
- `public/` do cliente e `electron/` com `main.ts` e `preload.ts`, que expõem o `labAPI` para ler arquivos pelo Node.
- Página `/graphics` com three.js e WebGPU, e página `/files` com File System Access API e OPFS.

Use como referência para [Extensões do cliente](/docs/client-extensions). Copie `.env.example` para `.env`, senão a verificação do `.env` fica vermelha.

![Homepage do template freedom-lab](templates/freedom-lab.png)

## Depois de criar

1. Deixe a pasta ao lado do `cht-base`. O nome dela é livre.
2. Copie `.env.example` para `.env` se quiser URLs diferentes das padrões.
3. Rode o ambiente de desenvolvimento:

```bash
npx chtmain dev --client:<name>
```
