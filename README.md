# cht-base

Shell do frontend multi-cliente, feito com Vue e Vite. Ele cuida do boot, das rotas, dos layouts e da ligação com o `cht-design-system` e o `cht-shared`. Cada cliente entra por cima, numa pasta irmã.

## O que ele faz

- Inicia a aplicação e carrega a config do cliente ativo, definido pela variável `CLIENT`.
- Monta as rotas do cliente a partir de `src/routes.ts`.
- Oferece `$project`, `$http` e o realtime, prontos para uso.
- Roda como app desktop com o Electron, subindo o backend do cliente junto.
- Mantém um modo `dev` com a documentação em `/docs`.

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `src/main.ts` | Boot da aplicação. |
| `src/project.ts` | `$project`: tema, rótulos, viewport e estado do Electron. |
| `src/http/` | Cliente HTTP, `$http`. Não grava token no storage. |
| `src/realtime/` | WebSocket em `/ws`. Só liga quando o cliente tem backend. |
| `src/devApp/` | Documentação em `/docs`. |
| `configs/` | Leitura do `cht.config` e dos temas. |
| `vite-plugins/` | Plugins do Vite, como fonte do cliente, tema e favicon. |
| `electron/` | Processo principal do Electron, backend, atualizador e build. |
| `template/client-template/` | Modelo usado por `npx chtmain create`. |

## Cliente ativo

Uma pasta vira cliente quando tem `cht.config.ts` ou `cht.config.json` na raiz e fica ao lado do `cht-base`. O campo `name` é o id usado em `--client:`.

O cliente precisa de `src/routes.ts`, `src/App.vue`, `src/bootstrap.ts` e `src/theme.config.json`. Os demais arquivos são opcionais.

Para ir além disso, o cliente pode ter `vite.config.ts`, `public/`, `.env` com `VITE_*`, `routerOptions` no `bootstrap.ts` e `electron/main.ts` ou `electron/preload.ts`. A página Extensões do cliente, em `/docs/client-extensions`, explica cada um.

## Scripts

```bash
npm run dev            # Vite
npm run build          # type-check e build
npm run electron:compile
npm run electron
```

No dia a dia, prefira o runner da raiz do `cht-main`:

```bash
npx chtmain dev --client:<nome>
npx chtmain build <nome>
npx chtmain electron <nome>
```

## Regras

- O `cht-base` não importa código de cliente. É o cliente que depende da base, nunca o contrário.
- Mudanças em contratos públicos, como `$http`, `$project`, rotas e props documentadas, seguem o [CONTRIBUTING.md](../CONTRIBUTING.md).
