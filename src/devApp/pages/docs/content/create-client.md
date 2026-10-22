# Criar um frontend

Um cliente é uma pasta irmã do `cht-base`, com um `cht.config.ts` ou `cht.config.json` na raiz. O comando abaixo cria essa pasta a partir do template.

```bash
npx chtmain create meu-app cht-client-meu-app
```

O primeiro argumento é o `name` do cliente, em kebab-case. O segundo é a pasta de destino. Se a pasta já existir, os arquivos do template são copiados para dentro dela e o `.git` não é tocado. No fim, o comando roda `npm install` na pasta.

Sem flag, o comando usa o template padrão. Para partir de outro, passe `--template:<nome>`:

```bash
npx chtmain create meu-app cht-client-meu-app --template:override-demo
```

## Templates disponíveis

Os templates ficam em `cht-base/template/client-<nome>`. O comando troca o nome, o título e o `package.json` pelos do cliente novo.

### Padrão (sem flag)

O mínimo para subir um cliente: uma rota, uma página e os arquivos de configuração vazios. Bom ponto de partida para um projeto do zero. O conteúdo está listado no fim desta página.

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
npx chtmain dev --client:meu-app
```

## O que vem no template padrão

- `src/App.vue` e `src/routes.ts`: uma rota para `src/pages/index.vue`.
- `src/bootstrap.ts`: as funções `setupAuthGuard` e `installClientPlugins`, vazias.
- `src/css/style.css` e `src/override.css`: CSS do cliente. Veja [CSS do cliente](/docs/override-css).
- `src/tailwind.plugin.js`: utilities Tailwind usadas só por este cliente. Veja [Plugin Tailwind do cliente](/docs/client-tailwind-plugin).
- `cht.config.ts`, `.env.example` e `src/theme.config.json`.

O template padrão não traz `vite.config.ts`, `public/` nem `electron/`. Adicione esses itens só quando precisar. Veja [Extensões do cliente](/docs/client-extensions).

Para auth, layout ou mais rotas, use o Mecarvit como referência e a página de [$http](/docs/http).
