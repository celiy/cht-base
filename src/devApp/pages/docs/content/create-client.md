# Criar um frontend

Um cliente é uma pasta irmã do `cht-base`, com um `cht.config.ts` ou `cht.config.json` na raiz. O comando abaixo cria essa pasta a partir do template.

```bash
npx chtmain create meu-app cht-client-meu-app
```

O primeiro argumento é o `name` do cliente, em kebab-case. O segundo é a pasta de destino. Se a pasta já existir, os arquivos do template são copiados para dentro dela e o `.git` não é tocado. No fim, o comando roda `npm install` na pasta.

## Depois de criar

1. Deixe a pasta ao lado do `cht-base`. O nome dela é livre.
2. Copie `.env.example` para `.env` se quiser URLs diferentes das padrões.
3. Rode o ambiente de desenvolvimento:

```bash
npx chtmain dev --client:meu-app
```

## O que vem no template

- `src/App.vue` e `src/routes.ts`: uma rota para `src/pages/index.vue`.
- `src/bootstrap.ts`: as funções `setupAuthGuard` e `installClientPlugins`, vazias.
- `src/css/style.css` e `src/override.css`: CSS do cliente. Veja [CSS do cliente](/docs/override-css).
- `src/tailwind.plugin.js`: utilities Tailwind usadas só por este cliente. Veja [Plugin Tailwind do cliente](/docs/client-tailwind-plugin).
- `cht.config.ts`, `.env.example` e `src/theme.config.json`.

O template não traz `vite.config.ts`, `public/` nem `electron/`. Adicione esses itens só quando precisar. Veja [Extensões do cliente](/docs/client-extensions).

Para auth, layout ou mais rotas, use o Mecarvit como referência e a página de [$http](/docs/http).
